// Abstracts read/write locgic to localStorage for theme preference persistence.

const getSavedTheme = () => localStorage.getItem("theme");
const saveTheme = (theme) => localStorage.setItem("theme", theme);

export { getSavedTheme, saveTheme };