// Handles theme switching between light and dark modes

// Select the theme toggle button
const themeToggleButton = document.querySelector(".theme-toggle");

// Get the moon icon within the button to visually reflect the theme
const moonIcon = themeToggleButton.querySelector("i");

// Get the <body> element so we can apply the theme class
const body = document.body;

// Try to load the saved theme from local storage
let theme = localStorage.getItem("theme");

/**
 * Sets the current theme by:
 * - removing existing theme classes
 * - adding the selected theme class
 * - updating the moon icon style
 * - saving it in local storage
 */
const setTheme = (themeValue) => {
    body.classList.remove("light-theme", "dark-theme");
    body.classList.add(themeValue);

    moonIcon.className = 
        themeValue === "dark-theme"
        ? "fa-solid fa-moon"
        : "fa-regular fa-moon";
    
        localStorage.setItem("theme", themeValue);
};

/**
 * Switches between dark and light theme
 */
const toggleTheme= () => {
    theme = theme === "dark-theme" ? "light-theme" : "dark-theme";
    setTheme(theme);
};

// When the button is clicked, toggle the theme
themeToggleButton.addEventListener("click", toggleTheme);

// Set the initial theme (fallback to dark if not set)
setTheme(theme || "dark-theme");

export { toggleTheme, setTheme };