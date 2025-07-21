// Applies the saved theme at startup and wires up toggle button events
// to ensure consistent UI from page load.

import { toggleTheme, themeToggleButton } from './themeToggle.js';
import { getSavedTheme } from './themeStorage.js';
import { body, moonIcon } from './themeDom.js';

const applySavedTheme = () => {
    const saved = getSavedTheme();
    if (saved === "dark-theme") {
        body.classList.add("dark-theme");
        moonIcon.classList.replace("fa-regular", "fa-solid");
    } else if (saved === "light-theme") {
        body.classList.add("light-theme");
        moonIcon.classList.replace("fa-solid", "fa-regular");
    }
};

const initializeTheme = () => {
    applySavedTheme();
    themeToggleButton.addEventListener("click", toggleTheme);
};

export { initializeTheme };
