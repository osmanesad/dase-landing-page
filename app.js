// app.js — single file: content + render + whatsapp request + gallery
// Clean version: no inline onclick, single lightbox source of truth.
// Drop 001: tote + mug + notebook + sticker cover & galleries wired.

let currentLang = "tr"; // default TR on load

/**
 * WhatsApp number (E.164 without +)
 * Replace if needed.
 */
const WHATSAPP_PHONE = "905445072918";

const CONTENT = {
  en: {
    brandSub: "coffee · printed matter · objects",
    heroLead:
      "A small selection built around coffee and printed matter. Limited quantities. Slow pace.",
    ctaPrimary: "current selection",
    ctaSecondary: "about",
    heroAccent: "limited drop · manual requests · weekly shipping",
    scrollHint: "scroll",

    shopTitle: "Current selection",
    shopLead:
      "Each item is produced in limited quantity. When it’s gone, it may not return.",

    aboutTitle: "About",
    aboutLead:
      "Not a café. Not a rush. A small practice around coffee, printed matter and objects.",
    aboutPanelLeftTitle: "A small practice",
    aboutPanelLeftBody:
      "dase coffee is a selection space. sometimes a table, sometimes a parcel, sometimes a place. fewer things, better choices.",
    aboutPanelRightTitle: "For now",
    aboutList: [
      "limited product drops",
      "printed matter (posters, notebooks)",
      "objects that fit the mood",
    ],

    orderTitle: "Ordering",
    orderLead:
      "Requests are handled manually. This keeps the process slow and personal.",
    orderList: [
      "limited stock",
      "orders ship once a week",
      "shipping within Türkiye",
      "every order is invoiced",
    ],

    contactBtn: "Contact",
    formTitle: "Get in touch",
    sendBtn: "Send Email →",
    placeholders: {
      from: "Your email address",
      subject: "Subject",
      body: "Your message",
    },

    footerBrand: "dase coffee — istanbul",
    footerIG: "instagram",
    footerContact: "contact",
    footerNote: "this is a small and slow project.",

    buttons: {
      request: "request",
      how: "how it works",
    },
  },

  tr: {
    brandSub: "kahve · basılı işler · objeler",
    heroLead:
      "Kahve ve basılı işler etrafında kurulan küçük bir seçki. Sınırlı adetler. Yavaş tempo.",
    ctaPrimary: "güncel seçki",
    ctaSecondary: "hakkında",
    heroAccent: "sınırlı drop · manuel talepler · haftalık gönderim",
    scrollHint: "kaydır",

    shopTitle: "Güncel seçki",
    shopLead:
      "Her ürün sınırlı sayıda üretilir. Tükendiğinde yeniden basılmayabilir.",

    aboutTitle: "Hakkında",
    aboutLead:
      "Bir kafe değil. Bir acele mekânı da değil. Kahve, basılı işler ve objeler etrafında küçük bir pratik.",
    aboutPanelLeftTitle: "Küçük bir pratik",
    aboutPanelLeftBody:
      "dase coffee bir seçki alanıdır. bazen masa, bazen kargo, bazen mekân. az şey, iyi seçim.",
    aboutPanelRightTitle: "Şimdilik",
    aboutList: [
      "sınırlı ürün drop’ları",
      "basılı işler (poster, defter)",
      "ruha uyan küçük objeler",
    ],

    orderTitle: "Sipariş",
    orderLead:
      "Talepler manuel olarak yanıtlanır. Bu, süreci yavaş ve kişisel tutar.",
    orderList: [
      "stoklar sınırlıdır",
      "siparişler haftada 1 gün kargoya verilir",
      "Türkiye içi gönderim",
      "her sipariş faturalıdır",
    ],

    contactBtn: "İletişim",
    formTitle: "İletişime geç",
    sendBtn: "Mail Gönder →",
    placeholders: {
      from: "E-posta adresiniz",
      subject: "Konu",
      body: "Mesajınız",
    },

    footerBrand: "dase coffee — istanbul",
    footerIG: "instagram",
    footerContact: "iletişim",
    footerNote: "küçük ve yavaş bir proje.",

    buttons: {
      request: "talep et",
      how: "nasıl işliyor",
    },
  },
};

const PRODUCTS = [
  {
    id: "tote",
    tag: { en: "limited", tr: "sınırlı" },
    name: { en: "tote bag", tr: "bez çanta" },
    desc: {
      en: "Heavy cotton tote bag. Printed in limited quantity.",
      tr: "Kalın pamuk bez çanta. Sınırlı adette basılır.",
    },
    cover: "assets/drop-001/tote/canta1.png",
    galleryKey: "tote",
    coverAlt: { en: "dase coffee tote bag", tr: "dase coffee bez çanta" },
  },
  {
    id: "mug",
    tag: { en: "limited", tr: "sınırlı" },
    name: { en: "cup", tr: "bardak" },
    desc: {
      en: "Ceramic cup. Limited quantity.",
      tr: "Seramik bardak. Sınırlı adet.",
    },
    cover: "assets/drop-001/mug/bardak1.png",
    galleryKey: "mug",
    coverAlt: { en: "dase coffee cup", tr: "dase coffee bardak" },
  },
  {
    id: "notebook",
    tag: { en: "plain", tr: "sade" },
    name: { en: "notebook", tr: "defter" },
    desc: {
      en: "Plain cover, soft paper. For notes and sketches.",
      tr: "Sade kapak, yumuşak kâğıt. Notlar ve eskizler için.",
    },
    cover: "assets/drop-001/notebook/defter1.png",
    galleryKey: "notebook",
    coverAlt: { en: "dase coffee notebook", tr: "dase coffee defter" },
  },
  {
    id: "sticker",
    tag: { en: "printed", tr: "basılı" },
    name: { en: "stickers", tr: "sticker" },
    desc: {
      en: "A small sticker set made for this drop.",
      tr: "Bu drop için hazırlanan küçük sticker seti.",
    },
    cover: "assets/drop-001/sticker/sticker1.png",
    galleryKey: "sticker",
    coverAlt: { en: "dase coffee stickers", tr: "dase coffee sticker" },
  },
];

/** Galleries (drop-based). Add new ones here, then set product.galleryKey */
const GALLERIES = {
  tote: [
    "assets/drop-001/tote/canta1.png",
    "assets/drop-001/tote/canta2.png",
    "assets/drop-001/tote/canta3.png",
    "assets/drop-001/tote/canta4.png",
  ],

  mug: [
    "assets/drop-001/mug/bardak1.png",
    "assets/drop-001/mug/bardak2.png",
    "assets/drop-001/mug/bardak3.png",
  ],

  notebook: [
    "assets/drop-001/notebook/defter1.png",
    "assets/drop-001/notebook/defter2.png",
    "assets/drop-001/notebook/defter3.png",
  ],

  sticker: [
    "assets/drop-001/sticker/sticker1.png",
    "assets/drop-001/sticker/sticker2.png",
    "assets/drop-001/sticker/sticker3.png",
  ],
};

function $(id) {
  return document.getElementById(id);
}

function whatsappUrlForProduct(productKey) {
  const p = PRODUCTS.find((x) => x.id === productKey);
  const name = p ? p.name[currentLang] : currentLang === "en" ? "item" : "ürün";

  const text =
    currentLang === "en"
      ? `Hi, I’m interested in the dase coffee ${name}.`
      : `Merhaba, dase coffee ${name} ile ilgileniyorum.`;

  const encoded = encodeURIComponent(text);
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`;
}

/* ---------- Rendering ---------- */

function renderProducts() {
  const grid = $("productGrid");
  if (!grid) return;

  grid.innerHTML = "";
  const t = CONTENT[currentLang];

  PRODUCTS.forEach((p) => {
    const card = document.createElement("div");
    card.className = "card";

    // Media (image if cover exists, otherwise thumb)
    if (p.cover) {
      const img = document.createElement("img");
      img.src = p.cover;
      img.className = "product-img";
      img.loading = "lazy";
      img.alt =
        (p.coverAlt && p.coverAlt[currentLang]) || "dase coffee product";
      if (p.galleryKey && Array.isArray(GALLERIES[p.galleryKey])) {
        img.addEventListener("click", () => openGallery(p.galleryKey, 0));
      }
      card.appendChild(img);
    } else {
      const thumb = document.createElement("div");
      thumb.className = "thumb";
      thumb.setAttribute("aria-hidden", "true");
      card.appendChild(thumb);
    }

    const top = document.createElement("div");
    top.className = "card-top";

    const left = document.createElement("div");
    const nameP = document.createElement("p");
    nameP.className = "name";
    nameP.textContent = p.name[currentLang];
    left.appendChild(nameP);

    const tag = document.createElement("div");
    tag.className = "tag";
    tag.textContent = p.tag[currentLang];

    top.appendChild(left);
    top.appendChild(tag);

    const desc = document.createElement("p");
    desc.className = "desc";
    desc.textContent = p.desc[currentLang];

    const actions = document.createElement("div");
    actions.className = "card-actions";

    const requestA = document.createElement("a");
    requestA.className = "btn small primary";
    requestA.href = whatsappUrlForProduct(p.id);
    requestA.target = "_blank";
    requestA.rel = "noopener noreferrer";
    requestA.textContent = t.buttons.request;

    const howA = document.createElement("a");
    howA.className = "btn small";
    howA.href = "#ordering";
    howA.textContent = t.buttons.how;

    actions.appendChild(requestA);
    actions.appendChild(howA);

    card.appendChild(top);
    card.appendChild(desc);
    card.appendChild(actions);

    grid.appendChild(card);
  });
}

function setActiveLangButton() {
  const enBtn = $("btnEN");
  const trBtn = $("btnTR");
  if (!enBtn || !trBtn) return;
  enBtn.classList.toggle("active", currentLang === "en");
  trBtn.classList.toggle("active", currentLang === "tr");
}

function updateText() {
  const t = CONTENT[currentLang];

  $("brandSub").textContent = t.brandSub;
  $("heroLead").textContent = t.heroLead;

  $("ctaPrimary").textContent = t.ctaPrimary;
  $("ctaSecondary").textContent = t.ctaSecondary;

  $("heroAccent").textContent = t.heroAccent;
  $("scrollHint").textContent = t.scrollHint;

  $("shopTitle").textContent = t.shopTitle;
  $("shopLead").textContent = t.shopLead;

  $("aboutTitle").textContent = t.aboutTitle;
  $("aboutLead").textContent = t.aboutLead;
  $("aboutPanelLeftTitle").textContent = t.aboutPanelLeftTitle;
  $("aboutPanelLeftBody").textContent = t.aboutPanelLeftBody;
  $("aboutPanelRightTitle").textContent = t.aboutPanelRightTitle;

  const aboutList = $("aboutList");
  aboutList.innerHTML = "";
  t.aboutList.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    aboutList.appendChild(li);
  });

  $("orderTitle").textContent = t.orderTitle;
  $("orderLead").textContent = t.orderLead;

  const orderList = $("orderList");
  orderList.innerHTML = "";
  t.orderList.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    orderList.appendChild(li);
  });

  $("contactBtn").textContent = t.contactBtn;
  $("footerBrand").textContent = t.footerBrand;
  $("footerIG").textContent = t.footerIG;
  $("footerContact").textContent = t.footerContact;
  $("footerNote").textContent = t.footerNote;

  $("formTitle").textContent = t.formTitle;
  $("sendBtn").textContent = t.sendBtn;

  $("fromInput").placeholder = t.placeholders.from;
  $("subjectInput").placeholder = t.placeholders.subject;
  $("bodyInput").placeholder = t.placeholders.body;

  renderProducts();
  setActiveLangButton();
}

function setLanguage(lang) {
  currentLang = lang;
  updateText();
}

/* ---------- Contact form ---------- */

function showForm() {
  $("emailForm").style.display = "block";
}
function closeForm() {
  $("emailForm").style.display = "none";
}

function formatMailto(event) {
  event.preventDefault();

  const from = ($("fromInput").value || "").trim();
  const subject = encodeURIComponent(($("subjectInput").value || "").trim());
  const bodyRaw = ($("bodyInput").value || "").trim();

  const body = encodeURIComponent(
    from ? `From: ${from}\n\n${bodyRaw}` : bodyRaw
  );

  window.location.href = `mailto:info@dasecoffee.co?subject=${subject}&body=${body}`;
}

/* ---------- Lightbox Gallery (single source of truth) ---------- */

let activeGallery = [];
let galleryIndex = 0;

function ensureLightbox() {
  let lb = document.getElementById("lightbox");
  if (lb) return lb;

  lb = document.createElement("div");
  lb.id = "lightbox";
  lb.className = "lightbox hidden";
  lb.innerHTML = `
    <button class="lightbox-close" type="button" aria-label="close">×</button>
    <button class="lightbox-nav prev" type="button" aria-label="previous">‹</button>
    <img id="lightboxImage" src="" alt="dase coffee gallery image" />
    <button class="lightbox-nav next" type="button" aria-label="next">›</button>
  `;
  document.body.appendChild(lb);

  // Close when clicking backdrop
  lb.addEventListener("click", (e) => {
    if (e.target === lb) closeLightbox();
  });

  lb.querySelector(".lightbox-close")?.addEventListener("click", closeLightbox);
  lb.querySelector(".lightbox-nav.next")?.addEventListener("click", nextImage);
  lb.querySelector(".lightbox-nav.prev")?.addEventListener("click", prevImage);

  return lb;
}

function openGallery(key, index = 0) {
  const list = GALLERIES[key];
  if (!Array.isArray(list) || list.length === 0) return;

  activeGallery = list;
  galleryIndex = Math.max(0, Math.min(index, activeGallery.length - 1));

  const lb = ensureLightbox();
  const img = document.getElementById("lightboxImage");
  img.src = activeGallery[galleryIndex];
  lb.classList.remove("hidden");
}

function closeLightbox() {
  document.getElementById("lightbox")?.classList.add("hidden");
}

function nextImage() {
  if (!activeGallery.length) return;
  galleryIndex = (galleryIndex + 1) % activeGallery.length;
  const img = document.getElementById("lightboxImage");
  if (img) img.src = activeGallery[galleryIndex];
}

function prevImage() {
  if (!activeGallery.length) return;
  galleryIndex =
    (galleryIndex - 1 + activeGallery.length) % activeGallery.length;
  const img = document.getElementById("lightboxImage");
  if (img) img.src = activeGallery[galleryIndex];
}

document.addEventListener("keydown", (e) => {
  const lb = document.getElementById("lightbox");
  if (!lb || lb.classList.contains("hidden")) return;

  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") nextImage();
  if (e.key === "ArrowLeft") prevImage();
});

/* ---------- Init + event wiring ---------- */

window.addEventListener("load", () => {
  // Language buttons (no inline onclick)
  $("btnEN")?.addEventListener("click", () => setLanguage("en"));
  $("btnTR")?.addEventListener("click", () => setLanguage("tr"));

  // Contact buttons
  $("contactBtn")?.addEventListener("click", showForm);
  $("footerContact")?.addEventListener("click", showForm);
  $("closeFormBtn")?.addEventListener("click", closeForm);

  // Form submit
  $("contactForm")?.addEventListener("submit", formatMailto);

  // Start
  setLanguage(currentLang);
});
