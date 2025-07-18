// Module handling theme toggle (light/dark mode) and persistence in localStorage

const THEME_KEY = "rest-countries-theme";

/**
 * Loads the saved theme from localStorage or defaults to 'light'.
 * @returns {string} Current theme ('light' or 'dark')
 */
export function loadTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme === "light" || savedTheme === "dark") {
        return savedTheme;
    } else {
        return "light";
    }
}

/**
 * Applies a theme by updating the document's data-theme attribute.
 * @param {string} theme - Theme to apply ('light' or 'dark').
 */
export function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
}

/**
 * Toggles theme between 'light' and 'dark'.
 * @returns {string} New theme after toggle.
 */
export function toggleTheme() {
    const currentTheme = loadTheme();
    const newTheme = currentTheme === "light" ? "dark" : "light";
    applyTheme(newTheme);
    return newTheme;
}