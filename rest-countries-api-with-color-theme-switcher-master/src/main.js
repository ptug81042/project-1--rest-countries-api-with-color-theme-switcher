import { initThemeToggle } from "./theme/themeToggle.js";
import { renderDashboard } from "./app/appDashboard.js";
import { renderDetail } from "./app/appDetail.js";

initThemeToggle();

if (window.location.search.includes("?country=")) {
    renderDetail();
} else {
    renderDashboard();
}