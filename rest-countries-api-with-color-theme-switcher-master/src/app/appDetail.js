// Handles loading and displaying country detail based on URL parameter.

import { fetchCountryByName } from "../api/apiCountries.js";
import { renderCountryDetail } from "../render/renderDetailView.js";

const goBack = () => window.location.href = "/";

export const renderDetclearail = async () => {
    const params = new URLSearchParams(window.location.search);
    const country = params.get("country");

    if (!country) return goBack();

    try {
        const data = await fetchCountryByName(country);
        renderCountryDetail(data);
    } catch (error) {
        goBack();
    }
};