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

Every product opens a detail dialog, including drafts. Missing product photographs are replaced by clearly labelled illustrative drawings. Add `image` for the main photograph and `images` for additional gallery photographs. Fill the Turkish and English `name` and `description` fields and `size` with verified details.

For payment links, set the product's `paymentUrl` to the real HTTPS checkout address supplied by your payment provider. The payment button appears only when orders are enabled and the product has available status, a photograph, a name, a positive integer price in kurus and positive integer stock. A payment link is for one product; basket requests go through WhatsApp for a confirmed total. No card details are collected by this site.

The WhatsApp number is configured once in `whatsapp`. Product inquiries include the product code and name. The artist section currently uses only the confirmed name and collection information; replace its bilingual copy in `art/shop.js` when a full biography is supplied.

Verify that the desktop Art menu, mobile Art link and home page art card open the same page. The Art page logo and Coffee/Books/Visit links should return to the home page.
