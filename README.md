# DASE Coffee

Static website; no build step required.

## Upload

Upload these files and folders together, preserving their structure:

- `index.html`
- `styles.css`
- `assets/` (images and fonts)
- `art/` (`index.html`, `art.css`, `catalog.js`, `shop.js`)

Art page: `art/index.html`. Relative links support subdirectory hosting and opening the HTML files directly.

`.github-publish/` is the publishing checkout. Its home page and `art/` folder must be published together.

## Art collection

Edit products in `art/catalog.js`. Current products are drafts; add photos, prices and stock before enabling sales. Orders are disabled with `ordersEnabled: false`.

Verify that the desktop Art menu, mobile Art link and home page art card open the same page. The Art page logo and Coffee/Books/Visit links should return to the home page.
