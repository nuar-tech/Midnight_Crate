# Midnight Crate — Endterm

Six-page campus-delivery front-end project, continuing the Midterm topic and team.

## Open

Open `index.html` directly, or serve this directory with `python3 -m http.server 8000` and visit http://localhost:8000. For reliable cart persistence across pages, use HTTP or GitHub Pages. All runtime dependencies and imagery are local; no build step, account, API key or backend is required.

## Pages

- index.html — night-campus hero, catalogue, ordering steps.
- menu.html — eleven food and essentials choices; search, category/occasion/budget filters, saved picks and a student-night planner.
- services.html — Illustrated interactive campus map, dorm selection and delivery estimate.
- pricing.html — three bundle combinations and per-person calculator.
- about.html — project story and four-member team.
- order.html — validated checkout, live summary and confirmation.

The catalogue is only on Menu, checkout only on Order. Home has two curated previews. Other pages retain a contextual Campus Desk dialog with six required fields and inline validation. The cart and FAQ remain shared. Shared behaviour lives in js/app.js and js/student.js; the eleven-object catalogue and delivery prices live in js/data.js.

## Behaviour

- Cart persists only product IDs and quantities, capped at 20 of each item. Corrupt storage is ignored. Contact data is not saved or transmitted.
- Required form fields: name, email, phone, room, time, dorm. Additional checks validate name length, email syntax, phone digit count, room format and night-only time (20:00–04:00 inclusive).
- Each field has its own error. Errors are absent initially and update on correction after the field is touched. A successful demo order resets the form and empties the cart.
- jQuery: slideDown/slideUp FAQ, fadeIn/fadeOut toast and confirmation, animate smooth navigation. Queues are stopped before effects restart.
- CSS/WAAPI: card/button hover, section entrances, animated dotted map route and selected-dorm pulse. Reduced-motion preference disables motion.
- Browser-native modal provides keyboard focus containment and Escape-to-close. All actions are keyboard accessible.

## Delivery map

An original isometric illustration inspired by the user's campus-map reference, in the selected indigo/lavender night-campus art direction. Four interactive dormitories D1-D4 update the route, delivery estimate and form selection. The map is conceptual, not a real university navigation map. D1/D2: 300 KZT; D3/D4: 500 KZT. No affiliation or actual delivery is claimed.

## Credits

- OpenAI Codex: implementation, design iteration, writing and testing assistance.
- OpenAI Imagegen: original illustrated campus, isometric map and bundle images; prompts retained in images/NIGHT-ASSET-PROMPTS.txt and images/HERO-PROMPT.txt and images/BRAND-ASSET-PROMPT.txt and images/FRESH-FOOD-PROMPT.txt. Product photos are illustrative.
- Bootstrap 5.3.3 CSS (MIT), bundled in vendor/bootstrap.min.css: https://getbootstrap.com/
- jQuery 3.7.1 (MIT), bundled in vendor/jquery.min.js: https://jquery.com/
- Custom CSS and SVG route overlay; system Arial/Helvetica fonts. No downloaded site template.

## Publish to the existing repository

Existing repository: https://github.com/nuar-tech/midterm_WEB
GitHub Pages URL: https://nuar-tech.github.io/midterm_WEB/

Copy the CONTENTS of this site directory into the root of that existing repository, preserving the six filenames. Do not create a different project/repository. Retain the original repository history. Commit only your real work using your own Git identity, before the instructor's deadline. Do not fabricate contributions or backdate commits.

GitHub Pages should serve the root of the existing default branch. Verify the live site after publication. This local package has NOT been uploaded: no authenticated write access was available during preparation. The report explicitly notes this limitation.

## Student details

Product dialogs show contents, brands, preparation notes and suggested sharing. Saved picks persist locally. The planner matches occasion, people and bundle budget, showing per-person cost or an honest no-match result. Prices and branded packaging artwork are illustrative, not a brand partnership. Order progress responds to bag, dorm and time selections.

## November 7 refinement
Distinct page structure; smaller imagery; fresh bowl, salad and toasted sandwich; Deadline Desk changed to sandwich/apple/water. Dorm selection persists for checkout in the same tab. Campus Desk validates six fields and clears them after a local demo confirmation. No request is transmitted.

## Unified design revision
All pages now load css/site-v5.css, a consolidated stylesheet. The 11-product photo collection is images/campus-shelf-v5.webp; its built-in Imagegen prompt is UNIFIED-SHELF-PROMPT.txt. The old product sheets and layered stylesheet were moved outside site/ to source-assets/before-v5. Internal links and asset fingerprints avoid mixing cached versions. Search/categories remain visible; optional filters use an accessible details disclosure.

## Living Home scene
Home-only home-scene.css and home-scene.js add gentle foliage movement, independently pulsing lamp glows and five small fireflies. All layers align to the existing 1536x1024 illustration and its responsive cover crop. A pause control is provided. Reduced-motion preferences disable decoration; animation pauses when the hero is off-screen or the tab is hidden. No video, external library or additional image download is required.
