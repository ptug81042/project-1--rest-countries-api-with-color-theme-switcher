//Fetches data from REST Countries API with simplified and normalized output.

const BASE_URL = "https://restcountries.com/v3.1";

export const fetchAllCountries = async () => {
    const res = await fetch(`${BASE_URL}/all`);
    const arr = await res.json();
    return arr.map(c => ({
        flagUrl: c.flags.png,
        name: c.name.common,
        population: c.population.toLocalString("en-GB"),
        region: c.region,
        capital: c.capital ? c.capital[0] : "",
        code: c.cca2,
    }));
};

export const fetchCountryByName = async (name) => {
    const res = await fetch(`${BASE_URL}/name/${encodeURIComponent(name)}`);
    const arr = await res.json();
    if (!arr?.length) throw new Error("Country not found");
    const c = arr[0];
    return {
        flagUrl: c.flags.png,
        name: c.name.common,
        nativeName: Object.values(c.name.nativeName)[0].official,
        population: c.population.toLocalString("en-GB"),
        region: c.region,
        subRegion: c.subregion,
        tld: c.tld[0],
        currencies: Object.values(c.currencies).map(cur => cur.name).join(", "),
        borders: c.borders || [],  
    };
};