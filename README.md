# 🌍 REST Countries API with Color Theme Switcher

## 🧠 Overview

This project is a solution to the [Frontend Mentor challenge](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-8FVBTvZy). It integrates with the [REST Countries API](https://restcountries.com) and allows users to:

- 🌐 View all countries
- 🔎 Search by country name
- 🗺 Filter by region
- 📄 View detailed information per country
- 🔁 Navigate through border countries
- 🌗 Toggle between light and dark themes (persisted via `localStorage`)

Built using semantic HTML, modular CSS, and fully componentized Vanilla JavaScript.

---

## 📝 Reflection

Building this REST Countries API project was a rewarding learning experience that challenged my skills in vanilla JavaScript and modular architecture. Throughout the development process, I had to start over from the beginning several times as I realized early architectural choices made the code hard to maintain and scale. This iterative restart helped me adopt a more modular approach and better separate concerns.

Initially, the biggest hurdle was dealing with the API's inconsistent data structure — some countries lacked expected fields like capitals or borders, which required extensive defensive programming and fallback values to avoid runtime errors. 

I also struggled with state management since I wasn’t using a frontend framework. Managing theme state, search input, region filters, and dynamic routing solely with native JavaScript forced me to think carefully about modularization and event handling. Extracting the large monolithic script into small focused modules improved code readability and maintainability, although it took several iterations to get the import/export boundaries right and avoid circular dependencies.

Implementing client-side routing using URL query parameters felt rewarding but also challenging, especially handling direct links to detail pages and invalid URLs gracefully. I added fallback redirects to keep the user experience smooth.

For UI, building responsive layouts and ensuring accessibility on dynamic elements like border country buttons demanded extra attention. The theme toggle, with persistent localStorage storage, was a nice touch but required careful initial loading logic to prevent flickering.

In the future, I plan to add loading states and error boundary components for better user feedback during fetch operations. Incorporating ARIA attributes for better accessibility and expanding test coverage would also be beneficial. Finally, transitioning this project to a frontend framework like React or Vue could simplify state and routing management significantly.

Overall, this project deepened my understanding of API integration, vanilla JavaScript modularity, and responsive UI design.

---

---

## ✨ Features

- Fully responsive across breakpoints
- Light/dark mode toggle
- Country detail views with dynamic border links
- Filtering and search with dynamic rendering
- Graceful error handling
- Modular and scalable file structure

---

---

##  🛠 Challenges & Problems Faced

- API Inconsistencies and Data Shape Variations
  - The REST Countries API occasionally provides inconsistent data structures (e.g., missing capital or borders, different nested objects). Handling these edge cases gracefully required extra null checks and fallback values in the code to prevent runtime errors.
- Asynchronous Data Fetching and UI Updates
  - Managing asynchronous fetch calls and updating the UI accordingly was challenging, especially to avoid rendering before data was ready. Implementing loading states or error messages was necessary for good user experience.
- State Management Without Frameworks
  - Without React or Vue, managing state such as the current theme, filter inputs, and selected country required carefully structuring modules and functions to avoid duplication or bugs.
- Modularization & File Splitting
  - Breaking the monolithic script into smaller, reusable modules demanded thoughtful planning. Ensuring proper import/export patterns and avoiding circular dependencies took time and iteration.
- URL-based Navigation & SPA Feel
  - Creating navigation between dashboard and country details using URL query parameters was tricky. Handling direct URL access, browser back button, and invalid URLs required fallback and routing logic.
- Responsive Design Complexity
  - Ensuring that the UI adapts seamlessly across multiple breakpoints required multiple media queries and testing. Some elements like border country buttons or filter inputs needed special attention to remain usable on small devices.
- Theme Toggle Persistence
  - Persisting the user’s theme choice in localStorage and applying it on page load without flickering required initial checks before rendering.
- Dynamic Content Accessibility
  - Making sure dynamically created elements such as links and buttons are accessible (with appropriate ARIA attributes and keyboard navigation) was an ongoing focus.
- Handling Broken Links and Errors
  - The API can sometimes fail or return empty data. Implementing error handlers and fallback UI prevents the app from crashing and informs the user properly.

---

## 🗂 File Structure

```plaintext
📦 project-root
├── index.html
├── script.js                # App entry point: handles view routing
├── js/
│   ├── themeToggle.js       # Dark/light theme toggle with localStorage
│   ├── dom-utils.js         # Reusable DOM component generators
│   ├── countryList.js       # Country card generation for the dashboard
│   ├── dashboard.js         # Search/filter logic and API integration
│   ├── detailView.js        # Detailed country info rendering
│   └── navigation.js        # Routing and fallback redirect
├── styles/
│   ├── style.css            # Combines all modular styles via @import
│   ├── variables.css        # CSS custom properties for theming
│   ├── reset.css            # Base normalization
│   ├── typography.css       # Font sizing, weights, line height
│   ├── layout.css           # Global layout structure
│   ├── components-filters.css
│   ├── components-lists.css
│   ├── components-detail.css
│   ├── responsive.css       # All breakpoints & responsive logic
│   └── themes.css           # Light/dark theme overrides
├── design/                  # JPG design references
├── style-guide.md           # Provided by Frontend Mentor
└── README.md                # This file

