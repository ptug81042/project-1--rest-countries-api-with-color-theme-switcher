// === THEME TOGGLE ===
const themeToggleButton = document.querySelector(".theme-toggle");
const moonIcon = themeToggleButton.querySelector("i");
const body = document.body;

let theme = localStorage.getItem("theme");

const setTheme = (themeValue) => {
    body.classList.remove("light-theme", "dark-theme");
    body.classList.add(themeValue);
    moonIcon.className = themeValue === "dark-theme" ? "fa-solid fa-moon" : "fa-regular fa-moon";
    localStorage.setItem("theme", themeValue);
};

const toggleTheme = () => {
    theme = theme === "dark-theme" ? "light-theme" : "dark-theme";
    setTheme(theme);
};

themeToggleButton.addEventListener("click", toggleTheme);
setTheme(theme || "dark-theme");

// === INFO ELEMENT (LABEL + VALUE) ===
const createInfoElement = (label, value) => {
    const p = document.createElement("p");
    p.innerHTML = `<strong>${label}: </strong>${value}`;
    return p;
};

// === FLAG IMAGE ===
const createFlagImg = (country) => {
    const div = document.createElement("div");
    const img = document.createElement("img");
    img.src = country.flagUrl;
    img.alt = `${country.name} flag`;
    div.appendChild(img);
    return div;
};

// === COUNTRY LIST ITEM ===
const createCountryElement = (country) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `?country=${encodeURIComponent(country.name)}`;

    const info = document.createElement("div");
    info.classList.add("info-container");

    const h2 = document.createElement("h2");
    h2.textContent = country.name;

    info.append(
        h2,
        createInfoElement("Population", country.population),
        createInfoElement("Region", country.region),
        createInfoElement("Capital", country.capital || "N/A")
    );

    a.append(createFlagImg(country), info);
    li.appendChild(a);
    return li;
};

// === RENDER COUNTRY LIST ===
const renderCountryList = (countries) => {
    const list = document.querySelector(".countries");
    list.innerHTML = "";
    countries.forEach((country) => list.appendChild(createCountryElement(country)));
};

// === RENDER DASHBOARD ===
const renderDashboard = () => {
    const searchInput = document.querySelector("#search");
    const regionSelect = document.querySelector("#region");

    const apiUrl = "https://restcountries.com/v3.1/all?fields=name,flags,region,capital,population,cca2";

    let countries = [];
    let search = "";
    let region = "";

    fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
            countries = data.map((c) => ({
                flagUrl: c.flags?.png || "",
                name: c.name?.common || "Unknown",
                population: c.population?.toLocaleString("en-GB") || "0",
                region: c.region || "Unknown",
                capital: c.capital?.[0] || "N/A",
                code: c.cca2,
            }));
            renderCountryList(countries);
        })
        .catch(() => {
            document.querySelector(".countries").innerHTML = "<p>Failed to load countries. Please try again later.</p>";
        });

    searchInput.addEventListener("input", (e) => {
        search = e.target.value.toLowerCase();
        filterAndRender();
    });

    regionSelect.addEventListener("change", (e) => {
        region = e.target.value;
        filterAndRender();
    });

    const filterAndRender = () => {
        const filtered = countries.filter((c) =>
            c.name.toLowerCase().includes(search) &&
            (!region || c.region === region)
        );
        renderCountryList(filtered);
    };
};

// === DETAIL NAVIGATION BUTTON ===
const createDetailButton = (text, link) => {
    const a = document.createElement("a");
    a.innerHTML = text;
    a.classList.add("detail-link");
    a.href = link;
    return a;
};

// === BORDER COUNTRIES ===
const createBorderCountriesContainer = (country) => {
    const div = document.createElement("div");
    div.classList.add("border-countries");

    const strong = document.createElement("strong");
    strong.textContent = "Border Countries: ";
    div.appendChild(strong);

    if (!country.borders || country.borders.length === 0) {
        div.append("None");
        return div;
    }

    country.borders.forEach((code) => {
        div.appendChild(createDetailButton(code, `?country=${code}`));
    });

    return div;
};

// === CREATE COUNTRY DETAIL ===
const createDetailElement = (country) => {
    const section = document.createElement("section");
    section.classList.add("detail-container");

    const flag = createFlagImg(country);
    const infoContainer = document.createElement("div");
    infoContainer.classList.add("detail-info-container");

    const h2 = document.createElement("h2");
    h2.textContent = country.name;

    const left = document.createElement("div");
    left.classList.add("left-column");
    left.append(
        createInfoElement("Native Name", country.nativeName),
        createInfoElement("Population", country.population),
        createInfoElement("Region", country.region),
        createInfoElement("Sub Region", country.subRegion),
        createInfoElement("Capital", country.capital || "N/A")
    );

    const right = document.createElement("div");
    right.classList.add("right-column");
    right.append(
        createInfoElement("Top Level Domain", country.tld),
        createInfoElement("Currencies", country.currencies),
        createInfoElement("Languages", country.languages)
    );

    infoContainer.append(h2, left, right);

    if (country.borders?.length) {
        infoContainer.appendChild(createBorderCountriesContainer(country));
    }

    section.append(flag, infoContainer);
    return section;
};

// === RENDER COUNTRY DETAIL ===
const renderCountryDetail = (country) => {
    const main = document.querySelector("main");
    main.innerHTML = "";
    main.appendChild(createDetailButton("← Back", "/"));
    main.appendChild(createDetailElement(country));
};

// === GO BACK TO LIST ===
const goBackToCountryList = () => {
    window.location.href = "/";
};

// === FETCH & RENDER COUNTRY DETAIL ===
const renderDetail = () => {
    const params = new URLSearchParams(window.location.search);
    const countryName = params.get("country");

    if (!countryName) return goBackToCountryList();

    fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fullText=true`)
        .then((res) => res.json())
        .then(([c]) => {
            const country = {
                flagUrl: c.flags?.png || "",
                name: c.name?.common || "Unknown",
                nativeName: Object.values(c.name.nativeName || { eng: { official: "N/A" } })[0].official,
                population: c.population?.toLocaleString("en-GB") || "0",
                region: c.region || "Unknown",
                subRegion: c.subregion || "Unknown",
                capital: c.capital?.[0] || "N/A",
                tld: c.tld?.[0] || "",
                currencies: Object.values(c.currencies || {}).map(cur => cur.name).join(", "),
                languages: Object.values(c.languages || {}).join(", "),
                borders: c.borders || [],
            };
            renderCountryDetail(country);
        })
        .catch(() => goBackToCountryList());
};

// === INIT ===
if (window.location.search.includes("?country=")) {
    renderDetail();
} else {
    renderDashboard();
}
