// Builds a container listing border country buttons for easy navigation.

import { createDetailButton } from './renderDetailButtons';

export const createBorderCountriesContainer = (country) => {
    const div = document.createElement("div");
    div.classList.add("border-countries");
    const strong = document.createElement("strong");
    strong.innerText = "Border Countries: ";
    div.appendChild(strong);
    country.borders.forEach(code => {
        div.appendChild(createDetailButton(code, `/?country=${code}`));
    });
    return div;
};