// Entry point - loads either the dashboard or the detail view

import "./themeToggle.js" // Initializes theme toggle
import { renderDashboard } from './dashboard.js';
import { renderDetail } from './navigation.js';

// Decide whether to show dashboard or country detail
if (window.location.search.includes("?country=")) {
    renderDetail();
} else {
    renderDashboard();
}