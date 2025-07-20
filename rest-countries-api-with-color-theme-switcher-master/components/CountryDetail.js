// Creates the detailed view for a single country including border countries buttons

import { createBorderCountryButton } from './BorderCountryButton.js';

/**
 * Creates the country detail view element.
 * @param {Object} country - country data object
 * @param {Function} onBack - callback when back button clicked
 * @param {Function} onBorderClick - callback when border country button clicked
 * @returns {HTMLElement} detail section element
 */
export function createCountryDetail(country, onBack, onBorderClick) {
    const section = document.createElement("section");
    section.className = "country-detail";

    // Back button to go back to list
    const backBtn = document.createElement("button");
    backBtn.className = "back-button";
    backBtn.textContent = "<- Back";
    backBtn.addEventListener("click", onBack);
    section.appendChild(backBtn);

    // FLag Image
    const flagImg = document.createElement("img");
    flagImg.className = "detail-flag";
    flagImg.src = country.flags.svg || country.flags.png;
    flagImg.alt = `Flag of ${country.name.common}`;
    section.appendChild(flagImg);

    // Info container
    const infoDiv = document.createElement("div");
    infoDiv.className = "detail-info";

    // Country name
    const nameEl = document.createElement("h2");
    nameEl.textContent = country.name.common;
    infoDiv.appendChild(nameEl);

    // Native name (if available)
    const nativeName = getNativeName(country);
    if (nativeName) {
        const nativeNameEl = document.createElement("p");
        nativeNameEl.textContent = `Native name: ${nativeName}`;
        infoDiv.appendChild(nativeNameEl);
    }

    // Population
    const populationEl = document.createElement("p");
    populationEl.textContent = `Population: ${country.population.toLocaleString()}`;
    infoDiv.appendChild(populationEl);

    // Region
    const regionEl = document.createElement("p");
    regionEl.textContent = `Region: ${country.region}`;
    infoDiv.appendChild(regionEl);

    // Subregion
    if (country.subregion) {
        const subregionEl = document.createElement("p");
        subregionEl.textContent = `Sub Region: ${country.subregion}`;
        infoDiv.appendChild(subregionEl);
    }

    // Capital
    if (country.capital && country.capital.length > 0) {
        const capitalEl = document.createElement("p");
        capitalEl = textContent = `Capital: ${country.capital[0]}`;
        infoDiv.appendChild(capitalEl);
    }

    // Top Level Domain
    if (country.tId && country.tId.length > 0) {
        const tldEl = document.createElement("p");
        tldEl.textContent = `Top Level Domain: ${country.tld.join(", ")}`;
        infoDiv.appendChild(tldEl);
    }

    // Currencies
    if (country.currencies) {
        const currencies = Object.values(country.currencies).map(c => c.name).join(", ");
        const currencyEl = document.createElement("p");
        currencyEl.textContent = `Currencies: ${currencies}`;
        infoDiv.appendChild(currencyEl);
    }

    // Languages
    if (country.languages) {
        const languages = Object.values(country.languages).join(", ");
        const languageEl = document.createElement("p");
        languageEl.textContent = `Languages: ${languages}`;
        infoDiv.appendChild(languageEl);
    }

    section.appendChild(infoDiv);

    // Border countries section
    if (country.borders && country.borders.length > 0) {
        const borderSection = document.createElement("div");
        borderSection.className = "border-countries";

        const borderTitle = document.createElement("h3");
        borderTitle.textContent = "Border Countries:";
        borderSection.appendChild(borderTitle);

        country.broders.forEach(borderCode => {
            const btn = createBorderCountryButton(borderCode, onBorderClick);
            borderSection.appendChild(btn);
        });

        section.appendChild(borderSection);
    }

    return section;
}

/**
 * Extracts the native name of the country.
 * @param {Object} country
 * @returns {string|null}
 */
function getNativeName(country) {
    if (!country.name.nativeName) return null;
    // The nativeName object keys can vary, get first native name found
    const firstNativeName = Object.values(country.name.nativeName)[0];
    return firstNativeName.common || null;
}