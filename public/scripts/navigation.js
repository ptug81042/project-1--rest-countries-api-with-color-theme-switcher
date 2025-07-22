// URL param parsing and back navigation

import { renderCountryDetail } from './detailView.js';

/**
 * Simple redirect to homepage
 */
export const goBackToCountryList = () => {
    window.location.href = "/rest-countries-api-with-color-theme-switcher-master/public/"
}

/**
 * Parses the country param and fetches full details
 */
export const renderDetail = () => {
    const params = new URLSearchParams(window.location.search);
    const countryName = params.get("country");

    if (!countryName) return goBackToCountryList();

    fetch(
        `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fullText=true`
    )
        .then((res) => res.json())
        .then(([c]) => {
            const country = {
                flagUrl: c.flags?.png || "",
                name: c.name?.common || "Unknown",
                nativeName: Object.values(c.name.nativeName || { eng: { official: "Unknown" } })[0].official,
                population: c.population.toLocaleString("en-GB") || "0",
                region: c.region || "Unknown",
                subRegion: c.subregion || "Unknown",
                capital: c.capital?.[0] || "Unknown",
                tld: c.tld?.[0] || "",
                currencies: Object.values(c.currencies || {})
                .map((cur) => cur.name)
                .join(", "),
                languages: Object.values(c.languages || {}).join(", "),
                borders: c.borders || [],
            };
            renderCountryDetail(country);
        })
        .catch(() => goBackToCountryList());
};