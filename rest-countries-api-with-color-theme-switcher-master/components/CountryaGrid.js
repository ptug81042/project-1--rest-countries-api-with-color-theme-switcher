// Creates a grid of clickable country cards

/**
 * Creates a grid container holding country cards.
 * @param {Array} countries - list of country objects.
 * @param {Function} onCountrySelect = callback on card click with cca3 code.
 */
export function createCountryGrid(countries, onCountrySelect) {
    const grid = document.createElement("section");
    grid.className = "country-grid";

    if (countries.length === 0) {
        const noResults = document.createElement("p");
        noResults.className = "no-results";
        noResults.textContent = "No countries found.";
        grid.appendChild(noResults);
        return grid;
    }

    countries.forEach(country => {
        const card = document.createElement("article");
        card.className = "country-card";
        card.tabIndex = 0;
        card.setAttribute("role", "button");
        card.setAttribute("aria-label", `View details for ${country.name.common}`);

        // On click or Enter key press, select this country
        card.addEventListener("click", () => {
            if (e.key === "Enter") onCountrySelect(country.cca3);
        });

        // Flag Image
        const flagImg = document.createElement("img");
        flagImg.className = "country-flag";
        flagImg.src = country.flags.svg || country.flags.png;
        flagImg.alt = `Flag of ${country.name.common}`;
        card.appendChild(flagImg);

        // COuntry info container
        const info = document.createElement("div");
        info.className = "country-info";

        // Name
        const nameEl = document.createElement("h2");
        nameEl.textContent = country.name.common;
        info.appendChild(nameEl);

        // Population
        const populationEl = document.createElement("p");
        populationEl.textContent = `Population: ${country.population.toLocaleString()}`;
        info.appendChild(populationEl);

        // Region
        const regionEl = document.createElement("p");
        regionEl.textContent = `Region: ${country.region}`;
        info.appendChild(regionEl);

        // Capital
        const capitalEl = document.createElement("p");
        capitalEl.textContent = `Capital: ${country.capital ? country.capital[0]: "N/A"}`;
        info.appendChild(capitalEl);

        card.appendChild(info);
        grid.appendChild(card);
    });

    return grid;
}