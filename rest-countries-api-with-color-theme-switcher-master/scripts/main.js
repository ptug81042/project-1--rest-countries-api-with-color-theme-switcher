// Import the theme module: responsible for applying and toggling dark/light themes
import { applyTheme, toggleTheme } from './theme.js';

// Import data service functions: fetches data from the REST Countries API
import { fetchAllCountries, fetchCountryByCode } from './api.js';

// Import render functions: responsible for injecting HTML into the DOM
import { renderCountryList, renderCountryDetails } from './render.js';

// Import routing utility: parses location.hash and returns view context
import { parseRoute } from './router.js';

// DOM element references for the two main views: grid and detail
const countryGrid = document.getElementById('country-grid'); // Container for the country list
const detailView = document.getElementById('country-detail'); // Container for a single country's details
const backButton = document.getElementById('back-button'); // UI button to return from detail view
const backContainer = document.querySelector('back-button'); // Wrapper around the back button

// DOM element references for interactive controls
const searchInput = document.getElementById('search-input'); // Search box input
const regionFilter = document.getElementById('region-filter'); // Dropdown to filter by region
const themeToggle = document.getElementById('theme-toggle'); // Theme toggle button (light/dark)

// In-memory cache of countries (avoids re-fetching after initial load)
let allCountries = [];

/**
 * Initializes the application.
 * - Applies the stored theme (dark/light).
 * - Fetches country data from the API.
 * - Renders the full list of countries.
 */
async function initApp() {
    applyTheme(); // Apply saved theme preference from localStorage or default

    allCountries = await fetchAllCountries(); // Fetch the full dataset once

    // Display initial list of countries in the grid view
    renderCountryList(countryGrid, allCountries, handleCountryClick);
}

/**
 * Called when a user clicks a country card in the grid
 * - Updates the hash to trigger routing and show the detail view.
 */
function handleCountryClick(code) {
    location.hash = `#country/${code}`; // Set hash to trigger routing
}

/**
 * Called when the user clicks the "Back" button from the detail view.
 * - Clears the hash, returning the app to the main country list.
 */
function handleBackClick() {
    location.hash = '#'; // Triggers hashchange to re-render grid view
}

/**
 * Handles hash change events in the URL.
 * - Used to control navigation without reloading the page.
 */
function handleHashChange() {
    const { view, code } = parseRoute(); // Destructure route object

    if (view === 'home') {
        // User is on the main grid view

        detailView.classList.add('hidden'); // Hide detail panel
        backContainer.classList.add('hidden'); // Hide back button
        countryGrid.classList.remove('hidden'); // Show the country grid

        // Re-render in case search/filter changed while in detail view
        renderCountryList(countryGrid, filteredCountries(), handleCountryClick);
    } else if (view === 'country' && code) {
        // User navigated to a specific country detail view
        showCountryDetail(code);
    }
}

/**
 * Fetches and displays full details for a selected country.
 * - Updates view state to hide grid and show detail panel.
 */
async function showCountryDetail(code) {
    const country = await fetchCountryByCode(code); // Fetch full country object
    if (!country) return; // Fail silently if no country found

    // Switch to detail view
    countryGrid.classList.add('hidden'); // Hide grid
    detailView.classList.remove('hidden'); // Show detail view
    backContainer.classList.remove('hidden'); // Show back button

    // Inject the country details into the DOM
    renderCountryDetails(detailView, country, handleBackClick, handleCountryClick);
}

/**
 * Filters the cached country list based on user input.
 * - Matches both the name query and the selected region.
 */
function filteredCountries() {
    const query = searchInput.value.toLowerCase(); // Get text input and normalize
    const region = regionFilter.value; // Get selected region

    // Return countries that match the search and region filter
    return allCountries.filter(country => {
        const matchName = country.name.common.toLowerCase().includes(query);
        const matchRegion = !region || country.region === region;
        return matchName & matchRegion
    });
}

/**
 * Called when either the search input or region filter changes.
 * - Re-renders the grid view with updated filtered results.
 */
function handleInputChange() {
    renderCountryList(countryGrid, filteredCountries(), handleCountryClick);
}

// =============================
//      Bind User Events
// =============================

// Toggle theme when theme button is clicked
themeToggle.addEventListener('click', () => {
    toggleTheme(); // Switch dark/light in localStorage
    applyTheme(); // Apply new theme to DOM
});

// Update results when user types in search field
searchInput.addEventListener('input', handleInputChange);

// Update results when user changes region filter
regionFilter.addEventListener('change', handleInputChange);

// Return to list view when back button is clicked
backButton.addEventListener('click', handleBackClick);

// Respond to hash change in URL
window.addEventListener('hashchange', handleHashChange);

// =============================
//          Start App
// =============================

initApp(); // Kick off app lifecycle