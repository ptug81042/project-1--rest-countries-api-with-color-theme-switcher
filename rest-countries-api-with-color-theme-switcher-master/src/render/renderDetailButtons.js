// Factory for creating navigation buttons on detail page.

export const createDetailButton = (text, link) => {
    const a = document.createElement("a");
    a.innerHTML = text;
    a.classList.add("detail-link");
    a.href = link;
    return a;
};