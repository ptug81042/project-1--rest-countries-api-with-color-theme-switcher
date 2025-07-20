// Entry point: manages app state, user interaction, and rendering

import * as API from "./api.js";
import * as THEME from "./theme.js";
import * as ROUTER from "./router.js";
import * as RENDER from "./render.js";

let countriesCache = []; // Cache all countries to avoid refetching
let filteredCountries = []; // Result of current search/filter
let currentTheme = THEME.loadTheme();

/**
 * Initialize app: apply theme, setup listeners, initial render
 */
async function init() {
    // Apply saved or default theme on load
    THEME.applyTheme(currentTheme);

    // Fetch all countries once and cache
    countriesCache = await API.fetchAllCountries();
    filteredCountries = countriesCache;

    // Listen to hash changes to update views
    window.addEventListener("hashchange", onRouteChange);

    // Initial render based on current URL hash
    onRouteChange();
}

/**
 * Called when URL hash changes, triggers routing
 */
function onRouteChange() {
    const { route, param } = ROUTER.parseHash();

    if (route === "country" && param) {
        renderCountryDetailPage(param);
    } else {
        renderCountryListPage();
    }
}

/**
 * Renders the country list page with search and filter controls
 */
function renderCountryListPage() {
    RENDER.renderCountryList({
        countries: filteredCountries,
        onThemeToggle: toggleTheme,
        onCountrySelect: countryCode => {
            ROUTER.navigateTo("country", countryCode);
        },
        onSearch: searchTerm => {
            handleSearch(searchTerm);
        },
        onRegionChange: region => {
            handleRegionFilter(region);
        }
    });
}

/**
 * Renders detail page for a selected country code
 * @param {string} countryCode - cca3 code
 */
async function renderCountryDetailPage(countryCode) {
    const country = await API.fetchCountryByCode(countryCode);

    if (!country) {
        alert("Country not found.");
        ROUTER.navigateTo("home");
        return;
    }

    RENDER.renderCountryDetail({
        country,
        onBack: () => ROUTER.navigateTo("home"),
        onBorderClick: (borderCode) => ROUTER.navigateTo("country", borderCode),
        onThemeToggle: toggleTheme
    });
}

/**
 * Handles theme toggle button press
 */
function toggleTheme() {
    currentTheme = THEME.toggleTheme();
}

/**
 * Handles search input changes and updates country list
 * @param {string} searchTerm
 */
function handleSearch(searchTerm) {
    // Filter countriesCache by name
    filteredCountries = countriesCache.filter(country => country.name.common.toLowerCase().includes(searchTerm.toLowerCase()));

    // Render the list with filtered countries
    renderCountryListPage();
}

/**
 * Handles region filter changes and updates country list
 * @param {string} region
 */
function handleRegionFilter(region) {
    if (!region) {
        filteredCountries = countriesCache;
    } else {
        filteredCountries = countriesCache.filter(country => country.region.toLowerCase() === region.toLocaleLowerCase());
    }

    renderCountryListPage();
}

// Initialize the app on DOMContentLoaded
window.addEventListener("DOMContentLoaded", init);