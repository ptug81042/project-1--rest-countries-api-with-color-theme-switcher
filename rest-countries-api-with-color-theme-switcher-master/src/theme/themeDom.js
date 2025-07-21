// Centralizes the DOM element selections used for theme toggling,
// improving maintainability by avoiding repeated queries.

const themeToggleButton = document.querySelector(".theme-toggle");
const moonIcon = document.querySelector(".theme-toggle i");
const body = document.querySelector("body");

export { themeToggleButton, moonIcon, body };