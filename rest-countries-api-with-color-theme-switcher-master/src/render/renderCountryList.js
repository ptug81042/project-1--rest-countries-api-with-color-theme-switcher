// Renders a list of country cards into the DOM container.

import { createCountryElement } from './renderCountryCard.js';

export const renderCountryList = (country) => {
    const list = document.querySelector(".countries");
    list.innerHTML= ""; // Clear old content
    countries.forEach(c => list.appendChild(createCountryElement(c)));
};