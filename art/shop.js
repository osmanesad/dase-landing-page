const { ordersEnabled, whatsapp, products, artists } = window.DASE_ART;
const canContact = /^[1-9][0-9]{9,14}$/.test(whatsapp);
const canOrder = ordersEnabled && /^[1-9][0-9]{9,14}$/.test(whatsapp);
const copy = {
  tr: {
    coffee: "KAHVE", books: "KİTAPLAR", art: "SANAT", visit: "ZİYARET",
    nav: "Ana menü", language: "Dil seçimi", basket: "Sepet", close: "Kapat",
    headline: "bir kahve.<br>biraz sanat.", intro: "Kâğıtta, parçalarda, tuvalde. Beyza, İrem ve Ayşegül’ün dünyalarına DASE’de yer açıyoruz.",
    description: "DASE’de sanat: Beyza, İrem ve Ayşegül’den suluboya kartpostallar, mozaikler, tuval resimleri ve kişiye özel resim siparişleri.",
    collectionLink: "Koleksiyona bak", illustration: "Mozaik illüstrasyonu",
    collection: "eserleri keşfet.", coming: "Eserlerin fotoğrafları ve satış bilgileri hazırlanıyor.", piece: "Eser",
    photoSoon: "Fotoğraf yakında", sold: "Tükendi", add: "Sepete ekle",
    added: "Sepete eklendi", empty: "Sepetin boş.", subtotal: "Ürün toplamı",
    orderNote: "Stok, teslimat ve toplam tutarı WhatsApp’ta teyit ediyoruz. Ardından Tosla İşim ödeme linkini gönderiyoruz.",
    order: "WhatsApp’ta sipariş iste", decrease: "Adedi azalt", increase: "Adedi artır",
    size: "Ölçü", message: "Merhaba DASE, şu eserler için sipariş vermek istiyorum:",
    confirm: "Stok ve teslimat seçeneklerini teyit edebilir misiniz?"
  },
  en: {
    coffee: "COFFEE", books: "BOOKS", art: "ART", visit: "VISIT",
    nav: "Main navigation", language: "Language selection", basket: "Basket", close: "Close",
    headline: "a coffee.<br>a little art.", intro: "On paper, in pieces, on canvas. Making room at DASE for the worlds of Beyza, İrem and Ayşegül.",
    description: "Art at DASE: watercolour postcards, mosaics, canvas paintings and commissioned paintings by Beyza, İrem and Ayşegül.",
    collectionLink: "View the collection", illustration: "Mosaic illustration",
    collection: "explore the works.", coming: "Photographs and sales details are being prepared.", piece: "Artwork",
    photoSoon: "Photo coming soon", sold: "Sold out", add: "Add to basket",
    added: "Added to basket", empty: "Your basket is empty.", subtotal: "Item subtotal",
    orderNote: "We confirm availability, delivery and the total on WhatsApp, then send you a Tosla İşim payment link.",
    order: "Request order on WhatsApp", decrease: "Decrease quantity", increase: "Increase quantity",
    size: "Size", message: "Hello DASE, I’d like to order these artworks:",
    confirm: "Could you confirm availability and delivery options?"
  }
};

const byId = (id) => document.getElementById(id);
Object.assign(copy.tr, {
  preparationLabel: "YAKINDA", preparationTitle: "Sanat alanımız hazırlanıyor.",
  preparationCopy: "Sanatçılarımızı şimdiden tanıyabilirsin. Eser fotoğrafları ve satış bilgileri yakında eklenecek; şu an gördüğün ürünler temsili görseller içeren taslaklardır ve henüz satışa açık değildir.",
  artistLabel: "ÜÇ SANATÇI, FARKLI DÜNYALAR",
  pay: "Ödeme linkiyle satın al", askProduct: "WhatsApp’tan bilgi al", photoUnavailable: "Görsel yüklenemedi. Fotoğraf için bize yazabilirsin.",
  related: "Diğer eserlere göz at", allProducts: "Tüm eserleri gör", preview: "Temsili çizim · Eser fotoğrafları yakında.",
  detailsSoon: "Bu eserin fotoğrafları, ölçüleri ve malzeme bilgileri hazırlanıyor. Ayrıntılar için bize yazabilirsin.",
  paymentSoon: "Online ödeme henüz açık değil. WhatsApp üzerinden ürün ve satışa çıkış bilgisi alabilirsin.",
  paymentReady: "Ödeme, bağlantıda açılan sağlayıcının sayfasında tamamlanır. Stok ve teslimat bilgilerini satın almadan önce teyit et.",
  askMessage: "Merhaba DASE, bu eser hakkında bilgi alabilir miyim?", image: "Görsel",
  illustration: "Renk ve doku çalışması · Temsili görsel", meetArtists: "Sanatçıları keşfet", artistsTitle: "üretenlerle tanış.", artistsIntro: "Önce sanatçıyı tanı, sonra eserlerine göz at.",
  viewWorks: "Eserlerini keşfet", commissionLink: "Sana özel bir resim", allArtists: "Tüm sanatçılar", artistPrefix: "Sanatçı: ", worksSuffix: " · eserleri",
  emptyWorks: "Bu sanatçının eserleri yakında burada. Bu sırada özel bir resim için fikrini paylaşabilirsin.",
  commissionLabel: "BİRLİKTE BİR FİKİRDEN BAŞLAYALIM", commissionTitle: "senin için, sana özel.",
  commissionIntro: "Beyza, İrem ve Ayşegül sipariş üzerine resim yapabilir. Aklındaki konuyu, renkleri ve düşündüğün ölçüyü paylaş; sanatçı, süre ve fiyatı birlikte netleştirelim.",
  commissionNote: "Talebin DASE’nin WhatsApp hattına iletilir. Uygunluk, teslim süresi ve ödeme ayrıntıları görüşme sonrasında belirlenir.",
  commissionMessage: "Merhaba DASE, sipariş üzerine bir resim yaptırmak istiyorum. Sanatçı: ", commissionPrompt: "Konu / renkler: \nDüşündüğüm ölçü: \nTercih ettiğim tarih: ", anyArtist: "Birlikte seçelim", filterLabel: "Sanatçıya göre eserler",
  mosaic: "Mozaik", watercolor: "Suluboya kartpostal", canvas: "Tuval resmi"
});
Object.assign(copy.en, {
  preparationLabel: "COMING SOON", preparationTitle: "Our art space is taking shape.",
  preparationCopy: "Meet our artists while we prepare the collection. Artwork photographs and sales details will be added soon. The products currently shown are drafts with illustrative visuals and are not yet available to buy.",
  artistLabel: "THREE ARTISTS, DIFFERENT WORLDS",
  pay: "Buy with payment link", askProduct: "Ask on WhatsApp", photoUnavailable: "The image could not be loaded. Contact us for a photograph.",
  related: "Explore other works", allProducts: "View all works", preview: "Illustrative drawing · Artwork photographs coming soon.",
  detailsSoon: "Photographs, dimensions and material details for this work are being prepared. Contact us for more information.",
  paymentSoon: "Online payment is not available yet. Ask us on WhatsApp about this piece and its release.",
  paymentReady: "Payment is completed on the provider’s linked page. Confirm availability and delivery before purchasing.",
  askMessage: "Hello DASE, could you tell me more about this artwork?", image: "Image",
  illustration: "Colour and texture study · Illustrative visual", meetArtists: "Meet the artists", artistsTitle: "meet the makers.", artistsIntro: "Get to know each artist, then explore their work.",
  viewWorks: "Explore their works", commissionLink: "A painting for you", allArtists: "All artists", artistPrefix: "Artist: ", worksSuffix: " · works",
  emptyWorks: "This artist’s works are coming soon. In the meantime, share your idea for a commissioned painting.",
  commissionLabel: "LET’S START WITH AN IDEA", commissionTitle: "made for you.",
  commissionIntro: "Beyza, İrem and Ayşegül welcome painting commissions. Share your subject, colours and preferred size; we’ll discuss the artist, timing and price together.",
  commissionNote: "Your request goes to DASE’s WhatsApp. Availability, delivery time and payment details are agreed after discussing your request.",
  commissionMessage: "Hello DASE, I would like to commission a painting. Artist: ", commissionPrompt: "Subject / colours: \nPreferred size: \nPreferred date: ", anyArtist: "Help me choose", filterLabel: "Works by artist",
  mosaic: "Mosaic", watercolor: "Watercolour postcard", canvas: "Canvas painting"
});

function whatsappLink(message) {
  return "https://wa.me/" + whatsapp + "?text=" + encodeURIComponent(message);
}

function paymentLink(product) {
  if (!purchasable(product) || !product.paymentUrl) return null;
  try {
    const url = new URL(product.paymentUrl);
    return url.protocol === "https:" && !url.username && !url.password ? url.href : null;
  } catch { return null; }
}

function openProduct(product) {
  activeProduct = product;
  renderProduct();
  if (!productDialog.open) productDialog.showModal();
  productDialog.scrollTop = 0;
  byId("product-title").setAttribute("tabindex", "-1");
  byId("product-title").focus({ preventScroll: true });
}

function illustration(product) {
  if (product.category && product.category !== "mosaic") {
    const study = element("div", "artist-visual " + (product.category === "watercolor" ? "watercolor" : "canvas"));
    study.setAttribute("aria-hidden", "true");
    return study;
  }
  const board = element("div", "mini-mosaic");
  board.setAttribute("aria-hidden", "true");
  const palettes = [ ["#294236", "#68816b", "#e2cc9d"], ["#d37648", "#754533", "#f2e2bc"], ["#222e25", "#e2cc9d", "#d37648"] ];
  const seed = Math.max(0, products.findIndex(item => item.id === product.id));
  const palette = palettes[seed % palettes.length];
  for (let i = 0; i < 64; i++) {
    const tile = element("span", "tile");
    tile.style.setProperty("--tile", palette[(Math.floor(i / 8) + i % 8 + seed) % 3]);
    tile.style.setProperty("--turn", ((i * 17 + seed) % 7 - 3) + "deg");
    board.append(tile);
  }
  return board;
}
const catalog = new Map(products.map((product) => [product.id, product]));
const basket = new Map();
const productDialog = byId("product-dialog");
const basketDialog = byId("basket-dialog");
const basketKey = "dase-art-basket-v1";
let activeProduct;
let selectedArtist = "all";
let language = "tr";
let labels = copy.tr;

function element(tag, className, value) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (value !== undefined) node.textContent = value;
  return node;
}

function formatMoney(kurus) {
  return new Intl.NumberFormat(language === "tr" ? "tr-TR" : "en-GB", {
    style: "currency", currency: "TRY"
  }).format(kurus / 100);
}

function productName(product) {
  return product.name[language] || product.name.tr || product.name.en || (labels[product.category] || labels.piece) + " " + product.id.slice(1);
}

function artistFor(product) { return artists.find(artist => artist.id === product.artistId); }
function localized(value) { return value[language] || value.tr || value.en; }
function commissionLink(artist) {
  return whatsappLink(labels.commissionMessage + (artist?.name || labels.anyArtist) + "\n" + labels.commissionPrompt);
}
function scrollToSection(node) {
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  node.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
}
function selectArtist(id, navigate = true) {
  const restoreFilterFocus = document.activeElement?.dataset.artistFilter;
  selectedArtist = artists.some(artist => artist.id === id) ? id : "all";
  renderCatalog();
  if (navigate) {
    scrollToSection(byId("koleksiyon"));
    byId("collection-title").focus({ preventScroll: true });
  } else if (restoreFilterFocus) {
    byId("artist-filters").querySelector(`[data-artist-filter="${selectedArtist}"]`)?.focus({ preventScroll: true });
  }
}
function renderArtists() {
  const profiles = byId("artist-profiles");
  const commissions = byId("commission-links");
  profiles.replaceChildren();
  commissions.replaceChildren();
  artists.forEach(artist => {
    const profile = element("article", "artist-profile");
    profile.id = "sanatci-" + artist.id;
    const visual = element("div", "artist-visual " + artist.visual);
    visual.setAttribute("aria-hidden", "true");
    if (artist.visual === "mosaic") visual.append(illustration({ id: "artist-irem" }));
    const content = element("div", "artist-profile-copy");
    const name = element("h3", "", artist.name);
    name.id = "artist-name-" + artist.id;
    const identity = element("div", "artist-identity");
    if (artist.profileImage) {
      const portrait = element("img", "artist-avatar");
      portrait.src = artist.profileImage;
      portrait.alt = "";
      portrait.width = 72;
      portrait.height = 72;
      portrait.loading = "lazy";
      portrait.addEventListener("error", () => portrait.remove(), { once: true });
      identity.append(portrait);
    }
    identity.append(name);
    profile.setAttribute("aria-labelledby", name.id);
    const works = element("button", "action primary", labels.viewWorks);
    works.type = "button";
    works.setAttribute("aria-label", artist.name + " · " + labels.viewWorks);
    works.addEventListener("click", () => selectArtist(artist.id));
    content.append(element("p", "eyebrow", localized(artist.medium)), identity, element("p", "artist-bio", localized(artist.bio)), works);
    if (artist.instagram) {
      const instagram = element("a", "artist-instagram", "Instagram · @" + new URL(artist.instagram).pathname.split("/").filter(Boolean)[0]);
      instagram.href = artist.instagram;
      instagram.target = "_blank";
      instagram.rel = "noopener noreferrer";
      instagram.setAttribute("aria-label", artist.name + " · Instagram");
      content.append(instagram);
    }
    if (canContact) {
      const commission = element("a", "artist-commission", labels.commissionLink);
      commission.href = commissionLink(artist);
      commission.target = "_blank";
      commission.rel = "noopener noreferrer";
      commission.setAttribute("aria-label", artist.name + " · " + labels.commissionLink);
      content.append(commission);
      const link = element("a", "action", artist.name);
      link.href = commissionLink(artist);
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.setAttribute("aria-label", artist.name + " · " + labels.commissionLink);
      commissions.append(link);
    }
    profile.append(visual, content);
    profiles.append(profile);
  });
}

function purchasable(product) {
  return canOrder && product?.status === "available" && Number.isSafeInteger(product.stock) &&
    product.stock > 0 && Number.isSafeInteger(product.priceKurus) && product.priceKurus > 0 &&
    Boolean(product.image && (product.name.tr || product.name.en));
}

function productStatus(product) {
  if (product.status === "sold" || (product.status === "available" && product.stock === 0)) return labels.sold;
  if (purchasable(product)) return formatMoney(product.priceKurus);
  return product.image ? labels.coming : labels.photoSoon;
}

function media(product, lazy = false) {
  const wrapper = element("div", "product-media");
  const placeholder = element("span", "image-error", labels.photoUnavailable);
  if (!product.image) {
    wrapper.append(illustration(product));
    return wrapper;
  }
  const photo = element("img");
  photo.alt = productName(product);
  if (lazy) photo.loading = "lazy";
  photo.addEventListener("error", () => {
    photo.replaceWith(placeholder);
    if (wrapper.closest("#product-image")) byId("product-visual-note").textContent = labels.photoUnavailable;
  }, { once: true });
  photo.src = product.image;
  wrapper.append(photo);
  return wrapper;
}

function renderCatalog() {
  const grid = byId("products");
  const artist = artists.find(item => item.id === selectedArtist);
  const visible = artist ? products.filter(product => product.artistId === artist.id) : products;
  byId("collection-title").textContent = artist ? artist.name + labels.worksSuffix : labels.collection;
  byId("collection-context").textContent = artist ? localized(artist.medium) : "";
  byId("collection-note").textContent = visible.length && !visible.some(purchasable) ? labels.coming : "";
  byId("collection-empty").hidden = visible.length > 0;
  grid.hidden = visible.length === 0;
  const inquiry = byId("collection-commission");
  inquiry.hidden = !canContact;
  if (canContact) inquiry.href = commissionLink(artist);
  const filters = byId("artist-filters");
  filters.setAttribute("aria-label", labels.filterLabel);
  filters.replaceChildren();
  [{ id: "all", name: labels.allArtists }, ...artists].forEach(item => {
    const button = element("button", "", item.name);
    button.type = "button";
    button.dataset.artistFilter = item.id;
    button.setAttribute("aria-pressed", String(item.id === selectedArtist));
    button.addEventListener("click", () => selectArtist(item.id, false));
    filters.append(button);
  });
  grid.replaceChildren();
  for (const product of visible) {
    const card = element("article", "product-card");
    const body = element("div", "product-body");
    const heading = element("h3");
    {
      const details = element("button", "", productName(product));
      details.type = "button";
      details.setAttribute("aria-haspopup", "dialog");
      details.addEventListener("click", () => {
        openProduct(product);
      });
      heading.append(details);
    }
    body.append(heading, element("p", "artist-credit", artistFor(product)?.name || "DASE"), element("p", "", productStatus(product)));
    card.append(media(product, true), body);
    grid.append(card);
  }
}

function renderProduct() {
  const product = activeProduct;
  const artist = artistFor(product);
  byId("product-artist").textContent = labels.artistPrefix + (artist?.name || "DASE");
  byId("product-artist").href = artist ? "#sanatci-" + artist.id : "#sanatci";
  byId("product-code").textContent = product.id;
  const photos = [...new Set([product.image, ...(product.images || [])].filter(Boolean))];
  const gallery = byId("product-gallery");
  gallery.replaceChildren();
  const showImage = (index) => {
    byId("product-image").replaceChildren(media({ ...product, image: photos[index] || "" }));
    [...gallery.children].forEach((button, i) => button.setAttribute("aria-pressed", String(i === index)));
  };
  photos.forEach((src, index) => {
    const button = element("button", "", labels.image + " " + (index + 1));
    button.type = "button";
    button.addEventListener("click", () => showImage(index));
    gallery.append(button);
  });
  gallery.hidden = photos.length < 2;
  showImage(0);
  byId("product-visual-note").textContent = photos.length ? "" : labels.preview;
  byId("product-title").textContent = productName(product);
  const description = byId("product-description");
  description.textContent = product.description[language] || product.description.tr || product.description.en || labels.detailsSoon;
  description.hidden = !description.textContent;
  const size = byId("product-size");
  size.textContent = product.size ? labels.size + " " + product.size : "";
  size.hidden = !product.size;
  byId("product-price").textContent = productStatus(product);
  const add = byId("product-add");
  add.hidden = !purchasable(product);
  add.disabled = (basket.get(product.id) || 0) >= product.stock;
  const payment = byId("product-payment");
  const paymentUrl = paymentLink(product);
  payment.hidden = !paymentUrl;
  payment.removeAttribute("href");
  if (paymentUrl) payment.href = paymentUrl;
  byId("product-payment-note").textContent = paymentUrl ? labels.paymentReady : purchasable(product) ? labels.orderNote : labels.paymentSoon;
  const contact = byId("product-whatsapp");
  contact.hidden = !canContact;
  contact.removeAttribute("href");
  if (canContact) contact.href = whatsappLink(labels.askMessage + "\n" + product.id + " · " + productName(product) + "\n" + labels.artistPrefix + (artist?.name || "DASE"));
  const related = byId("related-products");
  related.replaceChildren();
  const sameArtist = products.filter(item => item.artistId === product.artistId);
  const position = sameArtist.findIndex(item => item.id === product.id);
  const others = [...sameArtist.slice(position + 1), ...sameArtist.slice(0, Math.max(0, position))];
  const suggestions = [...others, ...products.filter(item => item.artistId !== product.artistId)].slice(0, 3);
  suggestions.forEach(item => {
    const button = element("button", "related-card");
    button.type = "button";
    button.append(media(item, true), element("span", "", productName(item)));
    button.addEventListener("click", () => openProduct(item));
    related.append(button);
  });
}

function restoreBasket() {
  try {
    const saved = JSON.parse(localStorage.getItem(basketKey) || "{}");
    for (const [id, quantity] of Object.entries(saved || {})) {
      const product = catalog.get(id);
      if (purchasable(product) && Number.isSafeInteger(quantity) && quantity > 0) {
        basket.set(id, Math.min(quantity, product.stock));
      }
    }
  } catch {
    // Sepet depolama olmadan da açık sayfada çalışır.
  }
}

function setQuantity(id, quantity) {
  const product = catalog.get(id);
  if (!Number.isSafeInteger(quantity) || quantity < 0 || !purchasable(product) || quantity > product.stock) return false;
  if (quantity <= 0) basket.delete(id);
  else basket.set(id, quantity);
  try {
    localStorage.setItem(basketKey, JSON.stringify(Object.fromEntries(basket)));
  } catch {
    // Sepet açık sayfada tutulur.
  }
  renderBasket();
  return true;
}

function quantityButton(symbol, name, product, quantity, change) {
  const button = element("button", "", symbol);
  button.type = "button";
  button.setAttribute("aria-label", name + " — " + productName(product));
  button.dataset.control = product.id + (change < 0 ? "-minus" : "-plus");
  button.disabled = change > 0 && quantity >= product.stock;
  button.addEventListener("click", () => setQuantity(product.id, quantity + change));
  return button;
}

function renderBasket() {
  const items = byId("basket-items");
  const previousFocus = document.activeElement?.dataset.control;
  const messages = [];
  let count = 0;
  let total = 0;
  items.replaceChildren();
  for (const [id, quantity] of basket) {
    const product = catalog.get(id);
    const name = productName(product);
    const subtotal = quantity * product.priceKurus;
    count += quantity;
    total += subtotal;
    messages.push(id + " · " + name + " · " + (artistFor(product)?.name || "DASE") + " × " + quantity + " · " + formatMoney(subtotal));

    const row = element("li", "basket-row");
    const item = element("div");
    item.append(element("strong", "", name), element("small", "", id + " · " + formatMoney(subtotal)));
    const controls = element("div", "quantity");
    controls.append(
      quantityButton("−", labels.decrease, product, quantity, -1),
      element("span", "", quantity),
      quantityButton("+", labels.increase, product, quantity, 1)
    );
    row.append(item, controls);
    items.append(row);
  }
  byId("basket-count").textContent = count;
  byId("basket-empty").hidden = count > 0;
  byId("basket-summary").hidden = count === 0;
  byId("basket-total").textContent = formatMoney(total);
  const order = byId("order-link");
  order.removeAttribute("href");
  if (count > 0) {
    const message = [labels.message, "", ...messages, "", labels.subtotal + " · " + formatMoney(total), labels.confirm].join("\n");
    order.href = "https://wa.me/" + whatsapp + "?text=" + encodeURIComponent(message);
  }
  if (previousFocus && basketDialog.open) {
    const controls = [...items.querySelectorAll("button:not(:disabled)")];
    const sameRow = controls.find((button) => button.dataset.control.split("-")[0] === previousFocus.split("-")[0]);
    const target = controls.find((button) => button.dataset.control === previousFocus) || sameRow ||
      controls[0] || basketDialog.querySelector(".close");
    target.focus();
  }
}

function setLanguage(next) {
  language = next === "en" ? "en" : "tr";
  labels = copy[language];
  document.documentElement.lang = language;
  document.querySelector('meta[name="description"]').content = labels.description;
  for (const node of document.querySelectorAll("[data-copy]")) {
    const key = node.dataset.copy;
    if (key === "headline") node.innerHTML = labels.headline;
    else node.textContent = labels[key];
  }
  for (const node of document.querySelectorAll("[data-aria]")) {
    node.setAttribute("aria-label", labels[node.dataset.aria]);
  }
  for (const button of document.querySelectorAll("[data-lang]")) {
    button.setAttribute("aria-pressed", String(button.dataset.lang === language));
  }
  try {
    localStorage.setItem("dase-language", language);
  } catch {
    // Dil seçimi açık sayfada çalışır.
  }
  renderCatalog();
  renderBasket();
  renderArtists();
  document.title = (language === "tr" ? "Sanat" : "Art") + " — DASE Coffee";
  byId("product-gallery").setAttribute("aria-label", language === "tr" ? "Görsel galerisi" : "Image gallery");
  if (activeProduct) renderProduct();
}

function renderIllustration() {
  const colors = { C: "#e2cc9d", E: "#f2e2bc", G: "#294236", T: "#68816b", O: "#d37648", B: "#754533", D: "#222e25" };
  const rows = [
    "CECGTTEC", "ECGTTOCE", "CGTTOOEC", "GTTCOOEG",
    "TTCEOGTD", "TCEBGTDG", "CEBGTDGE", "EBGTDGEC"
  ];
  const tileBoard = byId("hero-tiles");
  rows.join("").split("").forEach((color, index) => {
    const tile = element("span", "tile");
    tile.style.setProperty("--tile", colors[color]);
    tile.style.setProperty("--turn", ((index * 17) % 7 - 3) + "deg");
    tileBoard.append(tile);
  });
}

byId("product-add").addEventListener("click", () => {
  const id = activeProduct.id;
  if (!setQuantity(id, (basket.get(id) || 0) + 1)) return;
  byId("announcement").textContent = productName(activeProduct) + " · " + labels.added;
  productDialog.close();
});
byId("basket-open").addEventListener("click", () => basketDialog.showModal());
byId("product-artist").addEventListener("click", (event) => {
  event.preventDefault();
  productDialog.close();
  const artist = artistFor(activeProduct);
  const profile = artist ? byId("sanatci-" + artist.id) : byId("sanatci");
  profile.setAttribute("tabindex", "-1");
  profile.focus({ preventScroll: true });
  scrollToSection(profile);
});
byId("browse-collection").addEventListener("click", () => {
  productDialog.close();
  selectArtist("all");
});
for (const button of document.querySelectorAll("[data-lang]")) {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
}
let savedLanguage;
try {
  savedLanguage = localStorage.getItem("dase-language");
} catch {
  savedLanguage = "tr";
}
restoreBasket();
renderIllustration();
setLanguage(savedLanguage);
