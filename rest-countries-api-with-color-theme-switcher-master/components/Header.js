// Creates the header element with title and theme toggle button

/**
 * Creates the header DOM element.
 * @param {Function} onThemeToggle - callback triggered on theme toggle button click
 * @returns {HTMLElement} header element
 */
export function createHeader(onThemeToggle) {
    const header = document.createElement("header");
    header.className = "header";

    const title = document.createElement("h1");
    title.textContent = "REST Countries";

    const themeToggleBtn = document.createElement("button");
    themeToggleBtn.className = "theme-toggle-btn";
    themeToggleBtn.textContent = "Toggle Theme";

    // Add accessibility attributes
    themeToggleBtn.setAttribute("aria-label", "Toggle light/dark theme");

    // Bind toggle function
    themeToggleBtn.addEventListener("click", () => {
        onThemeToggle();
    });

    header.appendChild(title);
    header.appendChild(themeToggleBtn);

    return header;
}