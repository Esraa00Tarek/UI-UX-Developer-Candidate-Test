# Project Design & Implementation Decisions

## 1. Layout and Structure Choices
- **HTML Structure:** The HTML is divided into clear, labeled sections using `<!-- HTML Section: [section name] -->` comments. Major sections include Head, Header (with promo bar, main header, and navigation), Main (hero, product sections, wellness hub, brands, etc.), and Footer. This structure makes it easy to locate and update specific parts of the page.
- **Semantic Markup:** Semantic HTML elements (like `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`) are used for clarity and accessibility.

## 2. CSS Styling Approach
- **Sectioned CSS:** The CSS is organized into labeled blocks using `/* CSS Section: [section name] */`. Each block contains styles relevant to a specific UI area (promo bar, header, navigation, carousel, product cards, wellness hub, etc.).
- **Responsive Design:** Media queries are grouped and labeled, ensuring the site adapts well to different screen sizes and devices.
- **Consistency:** Consistent use of color, spacing, and font styles is maintained throughout the project for a cohesive look and feel.

## 3. JavaScript Logic Organization
- **Sectioned JavaScript:** The JavaScript file is organized into labeled sections using `// JavaScript Section: [section name]`. Each section groups related logic (e.g., carousel functionality, event listeners) for easier navigation and maintenance.
- **Separation of Concerns:** JavaScript is kept separate from HTML and CSS, following best practices for maintainability.

## 4. Assumptions & Key Practices
- **No Functional Changes:** Only the structure, order, and comments were changed for clarity—no code logic or functionality was altered.
- **Section Labels:** Section labels in all files make it easy for future developers to find, edit, or expand relevant code.
- **Maintainability:** The project is now easier to read, maintain, and scale, thanks to clear organization and labeling.
- **Accessibility & Best Practices:** The structure supports accessibility and modern web standards.

---
