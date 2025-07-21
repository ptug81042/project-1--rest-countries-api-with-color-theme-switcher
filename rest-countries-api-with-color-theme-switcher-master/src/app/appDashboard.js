// Orchestrates the main dashboard feature: fetching countries, handling input, and rendering list.

import { fetchAllCountries } from '../api/apiCountries.js';
import { filterCountries } from '../filter/filter.js';
import { renderCountryList } from '../render/renderCountryList.js';

let countries = [];
let search = "";
let region = "";

const applyFiltersAndRender = () => {
    const filtered = filterCountries(countries, search, region);
    renderCountryList(filtered);
};

export const renderDashboard = async () => {
    try {
        countries = await fetchAllCountries();
        renderCountryList(countries);

        document.querySelector("search").addEventListener("input", (e) => {
            search = e.target.value;
            applyFiltersAndRender();
        });

        document.querySelector("#region").addEventListener("change", (e) => {
            region = e.target.value;
            applyFiltersAndRender();
        });
    } catch (error) {
        console.error("Error loading countries:", error);
    }
};