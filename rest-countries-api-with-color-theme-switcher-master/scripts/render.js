// Responsible for rendering components inside the #root element

import { createHeader } from "../components/Header.js";
import { createSearchBar } from "../components/SearchBar.js";
import { createRegionFilter } from "../components/RegionFilter.js";
import { createCountryGrid } from "../components/CountryaGrid.js";
import { createCountryDetail } from "../components/CountryDetail.js";

/**
 * Clears all children of a DOM node.
 * @param {HTMLElement} container
 */
function clearContainer(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

/**
 * Renders the main list page with header, search bar, region filter, country grid.
 * @param {Object} params
 * @param {Array} params.countries - Array of country data objects.
 * @param {Function} params.onThemeToggle - Callback when theme toggled.
 * @param {Function} params.onCountrySelect - Callback when a country is clicked.
 * @param {Function} params.onSearch - Callback when search input changes
 * @param {Function} params.onRegionChange - Callback when region filter changes.
 */
export function renderCountryList({ countries, onThemeToggle, onCountrySelect, onSearch, onRegionChange }) {
    const root = document.getElementById("root");
    clearContainer(root);

    // Header with theme toggle button
    const header = createHeader(onThemeToggle);
    root.appendChild(header);

    // Search bar and region filter container
    const controls = document.createElement("div");
    controls.className = "controls";

    const searchBar = createSearchBar(onSearch);
    const RegionFilter = createRegionFilter(onRegionChange);

    controls.appendChild(searchBar);
    controls.appendChild(RegionFilter);
    root.appendChild(controls);

    // Country grid (cards)
    const grid = createCountryGrid(countries, onCountrySelect);
    root.appendChild(grid);
}

/**
 * Renders the detail view of a single country.
 * @param {Object} params
 * @param {Object} params.country - Country data object.
 * @param {Function} params.onBack - Callback for back button.
 * @param {Function} params.onBorderClick - Callback when a border country is clicked.
 * @param {Function} params.onThemeToggle - Callback when theme toggled.
 */
export function renderCountryDetail({ country, onBack, onBorderClick, onThemeToggle }) {
    const root = document.getElementById("root");
    clearContainer(root);

    // Header with theme toggle button
    const header = createHeader(onThemeToggle);
    root.appendChild(header);

    // Country detail section
    const detailSection = createCountryDetail(country, onBack, onBorderClick);
    root.appendChild(detailSection);
}