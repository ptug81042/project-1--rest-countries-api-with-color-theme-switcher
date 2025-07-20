// Creates a button for a bordering country to navigate to its details

/**
 * Creates a button for a border country.
 * @param {string} countryCode - cca3 code of border country.
 * @param {Function} onClick - callback invoked with entryCode on click.
 * @returns {HTMLElement} button element
 */
export function createBorderCountryButton(countryCode, onClick) {
    const button = document.createElement("button");
    button.className = "border-country-btn";
    button.textContent = countryCode;

    // Accessibility
    button.setAttribute("aria-label", `View details for border country ${countryCode}`);

    button.addEventListener("click", () => onClick(countryCode));
    return button;
}