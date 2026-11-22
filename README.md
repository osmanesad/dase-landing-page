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

The catalog contains six mosaic drafts for Irem (M01-M06), six watercolour postcard drafts for Beyza (B01-B06), and six canvas painting drafts for Aysegul (A01-A06). These are placeholders with illustrative visuals, not confirmed artworks or stock. Replace each draft's photographs, descriptions, dimensions, prices and stock with real information before enabling sales. Irem's profile also covers canvas paintings; add those as new products with `artistId: "irem"` and `category: "canvas"`. Decorative profile visuals are abstract technique studies, not artist portraits or actual artworks.

Verify that the desktop Art menu, mobile Art link and home page art card open the same page. The Art page logo and Coffee/Books/Visit links should return to the home page.

## Verification

Development checks require a Node.js version supported by JSDOM: 22.22.2+, 24.15.0+ in their respective release lines, or 26+. Run `npm ci`, then `npm test`. The site itself remains buildless: do not upload `node_modules`, tests or npm files to static hosting unless your host serves directly from the repository.

The seven test groups execute the actual HTML and scripts in JSDOM and check local links/assets, translations, profiles, all 18 product dialogs, artist filtering, related works, gallery errors, commissions, basket persistence, stock limits and payment gating. JSDOM does not render layouts; dialog and scroll platform methods are shimmed. The tests do not contact WhatsApp or payment services, validate a merchant account, or charge a payment. See `CHANGELOG.md` for the latest audit findings and remaining content requirements.

The all-artists view shows six works total (two per artist), interleaved by artist. Select an artist from their profile or the filters to see all six of their works.
