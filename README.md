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

The WhatsApp number is configured once in `whatsapp`. Product inquiries include the product code, name and artist. Artist profiles and bilingual biographies are in `artists` in `art/catalog.js`. Each product has an `artistId` (`beyza`, `irem`, or `aysegul`) and a `category` (`watercolor`, `mosaic`, or `canvas`). Profile buttons filter the collection by artist. Commission requests include the artist name and prompts for subject, colours, dimensions and timing; they go to the DASE WhatsApp number.

The existing ten mosaic drafts belong to Irem. No works have been invented for Beyza or Aysegul: their filtered collections show an empty state and a commission link until actual product records are added. Irem's profile also covers canvas paintings; add those as new products with `artistId: "irem"` and `category: "canvas"`. Decorative profile visuals are abstract technique studies, not artist portraits or actual artworks.

Verify that the desktop Art menu, mobile Art link and home page art card open the same page. The Art page logo and Coffee/Books/Visit links should return to the home page.
