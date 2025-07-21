//Filters country list by search term and region selection in a pure functional style.

export const filterCountries = (countries, searchTerm, regionFilter) => {
    const norm = searchTerm.toLowerCase().trim();
    return countries.filter(c => {
        const matchesName = c.name.toLowerCase().includes(norm);
        const matchesRegion = !regionFilter || c.region === regionFilter;
        return matchesName && matchesRegion;
    });
};