// Responsible for building and mounting the detailed country view screen.

import { createFlagImg, createInfoElement } from './renderCountryCard.js';
import { createBorderCountriesContainer } from './renderBorders.js';
import { createDetailButton } from './renderDetailButtons.js';

export const createDetailElement = (country) => {
    const section = document.createElement("section");
    section.classList.add("detail-container");

    const flag = createFlagImg(country);

    const info = document.createElement("div");
    info.classList.add("detail-info-container");

    const h2 = document.createElement("h2");
    h2.innerText = country.name;

    const left = document.createElement("div");
    left.classList.add("left-column");
    left.append(
        createInfoElement("Native Name", country.nativeName),
        createInfoElement("Population", country.population),
        createInfoElement("Region", country.region),
        createInfoElement("Sub Region", country.subRegion),
        createInfoElement("Capital", country.capital)
    );

    const right = document.createElement("div");
    right.classList.add("right-column");
    right.append(
        createInfoElement("Top Level Domain", country.tld),
        createInfoElement("Currencies", country.currencies),
        createInfoElement("Languages", country.languages)
    );

    info.appendChild(h2);
    info.append(left, right);

    if (country.borders?.length) {
        info.appendChild(createBorderCountriesContainer(country));
    }

    section.append(flag, info);
    return section;
};

export const renderCountryDetail = (country) => {
    const main = document.querySelector("main");
    main.innerHTML = "";
    main.appendChild(createDetailButton("← Back", "/"));
    main.appendChild(createDetailElement(country));
};