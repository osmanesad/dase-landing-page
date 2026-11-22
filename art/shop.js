const { ordersEnabled, whatsapp, products } = window.DASE_ART;
const canContact = /^[1-9][0-9]{9,14}$/.test(whatsapp);
const canOrder = ordersEnabled && /^[1-9][0-9]{9,14}$/.test(whatsapp);
const copy = {
  tr: {
    coffee: "KAHVE", books: "KİTAPLAR", art: "SANAT", visit: "ZİYARET",
    nav: "Ana menü", language: "Dil seçimi", basket: "Sepet", close: "Kapat",
    headline: "küçük<br>mozaikler.", intro: "İrem’in tasarladığı, fincan altına sığan mozaikler.",
    description: "İrem’in tasarladığı bardak altlığı boyutunda mozaikler. DASE Coffee, Çukurcuma.",
    collectionLink: "Koleksiyona bak", illustration: "Mozaik illüstrasyonu",
    collection: "mozaik koleksiyonu", coming: "Mozaikler yakında burada.", piece: "Mozaik",
    photoSoon: "Fotoğraf yakında", sold: "Tükendi", add: "Sepete ekle",
    added: "Sepete eklendi", empty: "Sepetin boş.", subtotal: "Ürün toplamı",
    orderNote: "Stok, teslimat ve toplam tutarı WhatsApp’ta teyit ediyoruz. Ardından Tosla İşim ödeme linkini gönderiyoruz.",
    order: "WhatsApp’ta sipariş iste", decrease: "Adedi azalt", increase: "Adedi artır",
    size: "Ölçü", message: "Merhaba DASE, şu mozaikler için sipariş vermek istiyorum:",
    confirm: "Stok ve teslimat seçeneklerini teyit edebilir misiniz?"
  },
  en: {
    coffee: "COFFEE", books: "BOOKS", art: "ART", visit: "VISIT",
    nav: "Main navigation", language: "Language selection", basket: "Basket", close: "Close",
    headline: "little<br>mosaics.", intro: "Coaster-sized mosaics designed by İrem.",
    description: "Coaster-sized mosaics designed by İrem. DASE Coffee, Çukurcuma.",
    collectionLink: "View the collection", illustration: "Mosaic illustration",
    collection: "mosaic collection", coming: "The mosaics are coming soon.", piece: "Mosaic",
    photoSoon: "Photo coming soon", sold: "Sold out", add: "Add to basket",
    added: "Added to basket", empty: "Your basket is empty.", subtotal: "Item subtotal",
    orderNote: "We confirm availability, delivery and the total on WhatsApp, then send you a Tosla İşim payment link.",
    order: "Request order on WhatsApp", decrease: "Decrease quantity", increase: "Increase quantity",
    size: "Size", message: "Hello DASE, I’d like to order these mosaics:",
    confirm: "Could you confirm availability and delivery options?"
  }
};

const byId = (id) => document.getElementById(id);
Object.assign(copy.tr, {
  artistLabel: "SANATÇIYLA TANIŞ", artistBio: "İrem’in DASE için tasarladığı bardak altlığı boyutundaki mozaikleri keşfet. Sanatçı ve üretim süreci hakkında daha fazla bilgi için bize yaz.",
  artistContact: "Sanatçı hakkında bilgi al", byArtist: "Sanatçı: İrem", pay: "Ödeme linkiyle satın al", askProduct: "WhatsApp’tan bilgi al",
  related: "Diğer mozaiklere göz at", allProducts: "Tüm koleksiyonu gör", preview: "Temsili mozaik çizimi · Ürün fotoğrafları yakında.",
  detailsSoon: "İrem’in bardak altlığı boyutundaki mozaik koleksiyonundan. Bu ürünün fotoğrafları, ölçüleri ve malzeme bilgileri hazırlanıyor. Ayrıntılar için bize yazabilirsin.",
  paymentSoon: "Online ödeme henüz açık değil. WhatsApp üzerinden ürün ve satışa çıkış bilgisi alabilirsin.",
  paymentReady: "Ödeme, bağlantıda açılan sağlayıcının sayfasında tamamlanır. Stok ve teslimat bilgilerini satın almadan önce teyit et.",
  askMessage: "Merhaba DASE, bu mozaik hakkında bilgi alabilir miyim?", artistMessage: "Merhaba DASE, İrem ve mozaik üretim süreci hakkında bilgi almak istiyorum.", image: "Görsel"
});
Object.assign(copy.en, {
  artistLabel: "MEET THE ARTIST", artistBio: "Explore the coaster-sized mosaics designed by İrem for DASE. Contact us to learn more about the artist and the making process.",
  artistContact: "Ask about the artist", byArtist: "Artist: İrem", pay: "Buy with payment link", askProduct: "Ask on WhatsApp",
  related: "Explore other mosaics", allProducts: "View the full collection", preview: "Illustrative mosaic drawing · Product photos coming soon.",
  detailsSoon: "Part of İrem’s coaster-sized mosaic collection. Product photographs, dimensions and material details are being prepared. Contact us for more information.",
  paymentSoon: "Online payment is not available yet. Ask us on WhatsApp about this piece and its release.",
  paymentReady: "Payment is completed on the provider’s linked page. Confirm availability and delivery before purchasing.",
  askMessage: "Hello DASE, could you tell me more about this mosaic?", artistMessage: "Hello DASE, I would like to learn more about İrem and the mosaic making process.", image: "Image"
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
  return product.name[language] || product.name.tr || product.name.en || labels.piece + " " + product.id.slice(1);
}

function purchasable(product) {
  return canOrder && product?.status === "available" && Number.isSafeInteger(product.stock) &&
    product.stock > 0 && Number.isSafeInteger(product.priceKurus) && product.priceKurus > 0 &&
    Boolean(product.image && (product.name.tr || product.name.en));
}

function productStatus(product) {
  if (product.status === "sold") return labels.sold;
  if (purchasable(product)) return formatMoney(product.priceKurus);
  return product.image ? labels.coming : labels.photoSoon;
}

function media(product, lazy = false) {
  const wrapper = element("div", "product-media");
  const placeholder = element("span", "placeholder", product.id);
  placeholder.setAttribute("aria-hidden", "true");
  if (!product.image) {
    wrapper.append(illustration(product));
    return wrapper;
  }
  const photo = element("img");
  photo.alt = productName(product);
  if (lazy) photo.loading = "lazy";
  photo.addEventListener("error", () => photo.replaceWith(placeholder), { once: true });
  photo.src = product.image;
  wrapper.append(photo);
  return wrapper;
}

function renderCatalog() {
  const grid = byId("products");
  byId("collection-note").textContent = products.some(purchasable) ? "" : labels.coming;
  grid.replaceChildren();
  for (const product of products) {
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
    body.append(heading, element("p", "", productStatus(product)));
    card.append(media(product, true), body);
    grid.append(card);
  }
}

function renderProduct() {
  const product = activeProduct;
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
  byId("product-payment-note").textContent = paymentUrl ? labels.paymentReady : labels.paymentSoon;
  const contact = byId("product-whatsapp");
  contact.hidden = !canContact;
  contact.removeAttribute("href");
  if (canContact) contact.href = whatsappLink(labels.askMessage + "\n" + product.id + " · " + productName(product));
  const related = byId("related-products");
  related.replaceChildren();
  const others = products.filter(item => item.id !== product.id);
  const start = products.indexOf(product) % Math.max(1, others.length);
  const suggestions = [...others.slice(start), ...others.slice(0, start)].slice(0, 3);
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
  if (!purchasable(product) || quantity > product.stock) return;
  if (quantity <= 0) basket.delete(id);
  else basket.set(id, quantity);
  try {
    localStorage.setItem(basketKey, JSON.stringify(Object.fromEntries(basket)));
  } catch {
    // Sepet açık sayfada tutulur.
  }
  renderBasket();
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
    messages.push(id + " · " + name + " × " + quantity + " · " + formatMoney(subtotal));

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
  byId("artist-contact").hidden = !canContact;
  if (canContact) byId("artist-contact").href = whatsappLink(labels.artistMessage);
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
  setQuantity(id, (basket.get(id) || 0) + 1);
  byId("announcement").textContent = productName(activeProduct) + " · " + labels.added;
  productDialog.close();
});
byId("basket-open").addEventListener("click", () => basketDialog.showModal());
byId("product-artist").addEventListener("click", () => productDialog.close());
byId("browse-collection").addEventListener("click", () => {
  productDialog.close();
  byId("koleksiyon").scrollIntoView({ behavior: "smooth" });
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
