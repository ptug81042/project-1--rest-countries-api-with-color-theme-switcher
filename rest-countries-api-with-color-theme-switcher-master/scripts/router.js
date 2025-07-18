// Simple hash-based routing module to switch between country list and detail views

/**
 * Parses the current URL hash.
 * Expected formats:
 * - "" or "#" => Home / country list
 * - "#country/CCA3" => Country details for cca3 code
 * @returns {{ route: string, param: string|null }}
 */
export function parseHash() {
    const hash = window.location.hash.slice(1); // remove #
    if (!hash) {
        return { route: "home", param: null };
    }

    const [route, param] = hash.split("/");
    return { route, param: param || null };
}

/**
 * Navigates to a specific route by updating window.location.hash
 * @param {string} route - route string e.g. "home" or "country"
 * @param {string|null} param - optional parameter e.g. cca3 country code
 */
export function navigateTo(route, param = null) {
    if (param) {
        window.location.hash = `#${route}/${param}`;
    } else {
        window.location.hash = `#${route}`;
    }
}