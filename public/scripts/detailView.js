// Renders the detailed country page including borders

import {
    createInfoElement,
    createFlagImg,
    createDetailButton,
} from './dom-utils.js';

/**
 * Creates a container for listing border countries
 */
const createBorderCountriesContainer = (country) => {
    const div = document.createElement("div");
    div.classList.add("border-countries");

    const strong = document.createElement("strong");
    strong.textContent = "Border Countries: ";
    div.append(strong);

    if (!country.borders || country.borders.length === 0) {
        div.append("None");
        return div;
    }

    country.borders.forEach((code) => {
        div.appendChild(createDetailButton(code, `?country=${code}`));
    });

    return div;
};

/**
 * Builds the full DOM for a single country's details
 */
const createDetailElement = (country) => {
    const section = document.createElement("section");
    section.classList.add("detail-container");

    const flag = createFlagImg(country);

    const infoContainer = document.createElement("div");
    infoContainer.classList.add("detail-info-container");

    const h2 = document.createElement("h2");
    h2.textContent = country.name;

    const left = document.createElement("div");
    left.classList.add("left-column");
    left.append(
        createInfoElement("Native Name", country.nativeName),
        createInfoElement("Population", country.population),
        createInfoElement("Region", country.region),
        createInfoElement("Sub Region", country.subRegion),
        createInfoElement("Capital", country.capital || "Unknown")
    );

    const right = document.createElement("div");
    right.classList.add("right-column");
    right.append(
        createInfoElement("Top Level Domain", country.tld),
        createInfoElement("Currencies", country.currencies),
        createInfoElement("Languages", country.languages)
    );

    infoContainer.append(h2, left, right);

    // Add border countries if any
    if (country.borders?.length) {
        infoContainer.appendChild(createBorderCountriesContainer(country));
    }

    section.append(flag, infoContainer);
    return section;
};

/**
 * Mounts the full detail view in <main>
 */
export const renderCountryDetail = (country) => {
    const main = document.querySelector("main");
    main.innerHTML = "";

    const backButton = createDetailButton("← Back", "/public/");
    const detailElement = createDetailElement(country);

    main.append(backButton, detailElement);
};
