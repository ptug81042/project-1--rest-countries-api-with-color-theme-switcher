// Contains utility functions to generate DOM elements consistently

/**
 * Creates a <p> element for displaying country info.
 * Format: <strong>Label:</strong> Value
 */
export const createInfoElement = (label, value) => {
    const p = document.createElement("p");
    p.innerHTML = `<strong>${label}:</strong> ${value}`;
    return p;
};

/**
 * Creates a container with a country's flag image.
 */
export const createFlagImg = (country) => {
    const div = document.createElement("div");
    const img = document.createElement("img");
    img.src = country,flagUrl;
    img.alt = `${country.name} flag`; // Accessible alt text
    div.appendChild(img);
    return div;
};

/**
 * Creates a link-style button for navigation, e.g., borders or back
 */
export const createDetailButton = (text, link) => {
    const a = document.createElement("a");
    a.innerHTML = text;
    a.classList.add("detail-link");
    a.href = link;
    return a;
};