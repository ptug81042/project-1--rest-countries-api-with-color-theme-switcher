// Create a region select dropdown component

const REGIONS = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

/**
 * Creates the region filter select dropdown.
 * @param {Function} onRegionChange - callback triggered when selection changes
 * @returns {HTMLElement} container with select element
 */
export function createRegionFilter(onRegionChange) {
    const container = document.createElement("div");
    container.className = "region-filter";

    const select = document.createElement("select");
    select.setAttribute("aria-label", "Filter countries by region");

    // Default empty option
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Filter by Region";
    select.appendChild(defaultOption);

    // Add region options
    REGIONS.forEach(region => {
        const option = document.createElement("option");
        option.value = region.toLowerCase();
        option.textContent = region;
        select.appendChild(option);
    });

    // Listen for changes
    select.addEventListener("change", () => {
        onRegionChange(select.value);
    });

    container.appendChild(select);
    return container;
}