// Module responsible for fetching country data from the Rest Countries API

const BASE_URL = "https://restcountries.com/v3.1";

/**
 * Fetches all countries from the API
 * @returns {Promise<Array>} Array of country data objects
 */
export async function fetchAllCountries() {
    try {
        const response = await fetch(`${BASE_URL}/all?fields=name,flags,population,region,capital,cca3`);
        if (!response.ok) {
            throw new Error("Failed to fetch countries");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching all countries", error);
        return [];
    }
}

/**
 * Fetches data for a single country by its three-letter country code (cca3).
 * @param {string} code - The cca3 country code.
 * @returns {Promise<Object|null>} COuntry data object or null if not found.
 */
export async function fetchCountryByCode(code) {
    try {
        const response = await fetch(`${BASE_URL}/alpha/${code}`);
        if (!response.ok) {
            throw new Error("Failed to fetch country by code");
        }
        const data = await response.json();
        return data[0] || null;
    } catch (error) {
        console.error(`Error fetching country with code ${code}:`, error);
        return null;
    }
}

/**
 * Fetches countries filtered by name search.
 * @param {string} name = Search term for country name.
 * @returns {Promise<Array>} Array of matching countries.
 */
export async function fetchCountriesByName(name) {
    if (!name) {
        return fetchAllCountries();
    }

    try {
        const response = await fetch(`${BASE_URL}/name/${name}?fields=name,flags,population,region,capital,cca3`);
        if (!response.ok) {
            return [];
        }
        return await response.json();
    } catch (error) {
        console.error(`Error searching for countries by name "${name}":`, error);
        return [];
    }
}

/**
 * Fetches countries filtered by region.
 * @param {string} region - Region name to filter by.
 * @returns {Promise<Array>} Array of countries in the region.
 */
export async function fetchCountriesByRegion(region) {
    if (!region) {
        return fetchAllCountries();
    }

    try {
        const response = await fetch(`${BASE_URL}/region/${region}?fields=name,flags,population,region,capital,cca3`);
        if (!response.ok) {
            return [];
        }
        return await response.json();    
    } catch (error) {
        console.error(`Error fetching countries in region "${region}":`, error);
        return [];
    }
}