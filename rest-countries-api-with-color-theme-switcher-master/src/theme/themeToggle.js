// Handles the logic of toggling the theme, updating classes and icon,
// and synchronizing state with localStorage.

import { themeToggleButton, moonIcon, body } from './themeDom.js';
import { getSavedTheme, saveTheme } from './themeStorage.js';

const toggleTheme = () => {
    let currentTheme = getSavedTheme();

    if (currentTheme === "dark-theme") {
        body.classList.replace("dark-theme", "light-theme");
        moonIcon.classList.replace("fa-solid", "fa-regular");
        currentTheme = "light-theme";
    } else {
        body.classList.replace("light-theme", "dark-theme");
        moonIcon.classList.replace("fa-regular", "fa-solid");
        currentTheme = "dark-theme";
    }

    saveTheme(currentTheme);
};

export { toggleTheme, themeToggleButton };