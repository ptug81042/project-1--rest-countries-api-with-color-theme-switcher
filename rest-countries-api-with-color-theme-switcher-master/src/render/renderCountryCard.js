// Builds the DOM structure for a single country card in the list.

export const createFlagImg = (country) => {
    const div = document.createElement("div");
    const img = document.createElement("img");
    img.src = country.flagUrl;
    img.alt = `${country.name} flag`;
    div.appendChild(img);
    return div;
};

export const createInfoElement = (label, value) => {
    const p = document.createElement("p");
    const strong = document.createElement("strong");
    strong.innerText = `${label}: `;
    p.innerText = value;
    p.prepend(strong);
    return p;
};

export const createCountryElement = (country) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `?country=${encodeURIComponent(country.name)}`;
    const info = document.createElement("div");
    info.classList.add("info-container");
    const h2 = document.createElement("h2");
    h2.innerText = country.name;
    info.append(h2, 
        createInfoElement("Population", country.population),
        createInfoElement("Region", country.region),
        createInfoElement("Capital", country.capital)
    );
    li.appendChild(a);
    a.append(createFlagImg(country), info);
    return li;
};