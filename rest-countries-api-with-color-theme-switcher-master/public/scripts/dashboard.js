// Handles lading all countries, and rendering search/filter list

import { renderCountryList } from './countryList.js';

/**
 * Fetches all countries and handles search + region filter logic
 */
export const renderDashboard = () => {
    const searchInput = document.querySelector("#search");
    const regionSelect = document.querySelector("#region");

    const apiUrl = "https://restcountries.com/v3.1/all?fields=name,flags,region,capital,population,cca2";

    let countries = [];
    let search = "";
    let region = "";

    // Fetch and normalize country data
    fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
            countries = data.map((c) => ({
                flagUrl: c.flags?.png || "",
                name: c.name?.common || "Unknown",
                population: c.population?.toLocaleString("en-GB") || "0",
                region: c.region || "Unknown",
                capital: c.capital?.[0] || "",
                code: c.cca2,
            }));
            renderCountryList(countries);
        })
        .catch(() => {
            document.querySelector(".countries").innerHTML = "<p>Failed to load countries. Please try again later.</p>";
        });

    // Update search string and re-render
    searchInput.addEventListener("input", (e) => {
        search = e.target.value.toLowerCase();
        filterAndRender();
    });
    
    // Update selected region and re-render
    regionSelect.addEventListener("change", (e) => {
        region = e.target.value;
        filterAndRender();
    });

    // Applies current filters and renders
    const filterAndRender = () => {
        const filtered = countries.filter(
            (c) => 
                c.name.toLowerCase().includes(search) && 
                (!region || c.region === region)
        );
        renderCountryList(filtered);
    };
};