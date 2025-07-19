// Creates the search input component

/**
 * Creates a search bar element.
 * @param {Function} onSearch - callback invoked with the search query on input
 * @returns {HTMLElement} container with search input
 */
export function createSearchBar(onSearch) {
    const container = document.createElement("div");
    container.className = "search-bar";

    const input = document.createElement("input");
    input.type = "search";
    input.placeholder = "Search for a country...";
    input.setAttribute("aria-label", "Search countries by name");

    // Debounce user input to avoid excessive calls
    let DebounceTimeout;
    input.addEventListener("input", () => {
        clearTimeout(DebounceTimeout);
        DebounceTimeout = setTimeout(() => {
            onSearch(input.value.trim());
        }, 300);
    });

    container.appendChild(input);
    return container;
}