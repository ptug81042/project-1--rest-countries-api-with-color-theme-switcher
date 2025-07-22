// Renders list of country cards using utility functions

import { createInfoElement, ceeateFlagImg } from './dom-utils.js';

/**
 * Creates a single <li> list item representing one country card.
 */
export const createCountryElement = (country) => {
    const li = document.createElement("li");

    const a = document.createElement("a");
    a.href = `?country=${encodeURIComponent(country.name)}`;

    const info = document.createElement("div");
    info.classList.add("info-container");

    const h2 = document.createElement("h2");
    h2.textContent = country.name;

    // Append structured country data
    info.append(
        h2,
        createInfoElement("Population", country.population),
        createInfoElement("Region", country.region),
        createInfoElement("Capital", country.capital || ""),
    );

    a.append(createFlagImg(country), info);
    li.append(a);

    return li;
};

/**
 * Renders an array of country objects into the .countries list
 */
export const renderCountryList = (country) => {
    const li = document.querySelector(".countries");
    list.innerHTML = ""; // Clear existing
    countries.forEach((country) => {
        list.appendChild(createCountryElement(country));
    });
};