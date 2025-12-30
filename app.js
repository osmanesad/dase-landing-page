// app.js — single file: content + render + whatsapp request + inline carousel
// Drop 001: tote + mug + notebook + sticker. No fullscreen lightbox (no screen takeover).
// Image navigation happens on the product card itself.

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

/* ---------- Inline Carousel State ---------- */

const carouselIndexByProductId = Object.create(null);

function galleryListForProduct(p) {
  if (!p.galleryKey) return null;
  const list = GALLERIES[p.galleryKey];
  return Array.isArray(list) && list.length ? list : null;
}

function currentCarouselIndex(p) {
  const list = galleryListForProduct(p);
  if (!list) return 0;
  const idx = carouselIndexByProductId[p.id];
  if (typeof idx !== "number") return 0;
  return Math.max(0, Math.min(idx, list.length - 1));
}

function setCarouselIndex(p, nextIndex) {
  const list = galleryListForProduct(p);
  if (!list) return 0;
  const clamped = ((nextIndex % list.length) + list.length) % list.length;
  carouselIndexByProductId[p.id] = clamped;
  return clamped;
}

/* ---------- Rendering ---------- */

function renderProducts() {
  const grid = $("productGrid");
  if (!grid) return;

  grid.innerHTML = "";
  const t = CONTENT[currentLang];

  PRODUCTS.forEach((p) => {
    const card = document.createElement("div");
    card.className = "card card-tall";

    // Media wrapper
    const media = document.createElement("div");
    media.className = "media";

    const list = galleryListForProduct(p);

    // Image
    const img = document.createElement("img");
    img.className = "product-img";
    img.loading = "lazy";
    img.alt = (p.coverAlt && p.coverAlt[currentLang]) || "dase coffee product";

    if (list) {
      const idx = currentCarouselIndex(p);
      img.src = list[idx];
      img.addEventListener("click", () => {
        const next = setCarouselIndex(p, currentCarouselIndex(p) + 1);
        img.src = list[next];
        updateDots(dots, list.length, next);
      });
    } else if (p.cover) {
      img.src = p.cover;
      img.style.cursor = "default";
    } else {
      // fallback: no image -> show thumb
      const thumb = document.createElement("div");
      thumb.className = "thumb";
      thumb.setAttribute("aria-hidden", "true");
      media.appendChild(thumb);
      card.appendChild(media);
      // continue card body
    }

    if (!media.firstChild) {
      media.appendChild(img);

      // Nav + dots (only if gallery exists)
      let dots = null;

      if (list && list.length > 1) {
        const prevBtn = document.createElement("button");
        prevBtn.className = "media-nav prev";
        prevBtn.type = "button";
        prevBtn.setAttribute("aria-label", "previous image");
        prevBtn.textContent = "‹";

        const nextBtn = document.createElement("button");
        nextBtn.className = "media-nav next";
        nextBtn.type = "button";
        nextBtn.setAttribute("aria-label", "next image");
        nextBtn.textContent = "›";

        prevBtn.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          const next = setCarouselIndex(p, currentCarouselIndex(p) - 1);
          img.src = list[next];
          updateDots(dots, list.length, next);
        });

        nextBtn.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          const next = setCarouselIndex(p, currentCarouselIndex(p) + 1);
          img.src = list[next];
          updateDots(dots, list.length, next);
        });

        media.appendChild(prevBtn);
        media.appendChild(nextBtn);

        dots = document.createElement("div");
        dots.className = "media-dots";
        media.appendChild(dots);
        updateDots(dots, list.length, currentCarouselIndex(p));
      }

      card.appendChild(media);
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

function updateDots(container, total, activeIndex) {
  if (!container) return;
  container.innerHTML = "";
  for (let i = 0; i < total; i++) {
    const dot = document.createElement("span");
    dot.className = "dot" + (i === activeIndex ? " active" : "");
    container.appendChild(dot);
  }
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
