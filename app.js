// app.js — The Editorial Archive Edition

let currentLang = "tr";
const WHATSAPP_PHONE = "905445072918";

const CONTENT = {
  en: {
    brandSub: "coffee · printed matter · objects",
    heroLead:
      "A slow practice around coffee and printed matter. Limited quantities, manual distribution.",
    heroAccent: "ISTANBUL / ARCHIVE 001",
    scrollHint: "scroll to index",
    shopTitle: "INDEX",
    aboutTitle: "Manifesto",
    aboutLead:
      "Not a café. Not a rush. Just a table, a parcel, and a place for fewer, better things.",
    aboutPanelLeftTitle: "The Practice",
    aboutPanelLeftBody:
      "dase coffee is a selection space. We focus on limited drops of coffee, printed goods, and objects that fit the mood.",
    aboutPanelRightTitle: "Currently",
    aboutList: [
      "limited product drops",
      "printed matter",
      "objects that fit the mood",
    ],
    orderTitle: "Logistics",
    orderLead: "Requests are handled manually via WhatsApp.",
    orderList: [
      "limited stock",
      "weekly shipping",
      "shipping within Türkiye",
      "invoiced orders",
    ],
    contactBtn: "Get in touch",
    formTitle: "Communication",
    sendBtn: "TRANSMIT MESSAGE",
    placeholders: { from: "Email", subject: "Ref", body: "Message content..." },
    footerBrand: "dase coffee",
    footerIG: "instagram",
    footerNote: "est. 2024 — istanbul",
    buttons: { request: "REQUEST VIA WHATSAPP" },
  },
  tr: {
    brandSub: "kahve · basılı işler · objeler",
    heroLead:
      "Kahve ve basılı işler etrafında kurgulanmış yavaş bir pratik. Sınırlı üretim, manuel dağıtım.",
    heroAccent: "İSTANBUL / ARŞİV 001",
    scrollHint: "incele",
    shopTitle: "İNDEKS",
    aboutTitle: "Manifesto",
    aboutLead:
      "Bir kafe değil. Bir acele mekânı da değil. Az ve öz şeyler için bir masa, bir kargo, bir alan.",
    aboutPanelLeftTitle: "Pratik",
    aboutPanelLeftBody:
      "dase coffee bir seçki alanıdır. Sınırlı kahve drop'ları, basılı işler ve ruha uyan objeler üzerine odaklanır.",
    aboutPanelRightTitle: "Şimdilik",
    aboutList: [
      "sınırlı ürün drop’ları",
      "basılı işler (poster, defter)",
      "ruha uyan küçük objeler",
    ],
    orderTitle: "Lojistik",
    orderLead: "Talepler WhatsApp üzerinden manuel yönetilir.",
    orderList: [
      "stoklar sınırlıdır",
      "haftalık kargo",
      "Türkiye içi gönderim",
      "faturalı satış",
    ],
    contactBtn: "İletişim",
    formTitle: "İletişim Kanalı",
    sendBtn: "MESAJI İLET",
    placeholders: {
      from: "E-posta",
      subject: "Konu",
      body: "Mesaj içeriği...",
    },
    footerBrand: "dase coffee",
    footerIG: "instagram",
    footerNote: "est. 2024 — istanbul",
    buttons: { request: "WHATSAPP İLE TALEP ET" },
  },
};

const PRODUCTS = [
  {
    id: "tote",
    tag: { en: "LIMITED", tr: "SINIRLI" },
    name: { en: "Tote Bag", tr: "Bez Çanta" },
    desc: {
      en: "Heavy cotton tote bag. Designed for daily loads.",
      tr: "Kalın pamuk bez çanta. Günlük yükler için.",
    },
    cover: "assets/drop-001/tote/canta1.png",
    galleryKey: "tote",
  },
  {
    id: "mug",
    tag: { en: "CERAMIC", tr: "SERAMİK" },
    name: { en: "Ceramic Cup", tr: "Seramik Bardak" },
    desc: {
      en: "Handmade ceramic cup. Unique texture.",
      tr: "El yapımı seramik bardak. Eşsiz doku.",
    },
    cover: "assets/drop-001/mug/bardak1.png",
    galleryKey: "mug",
  },
  {
    id: "notebook",
    tag: { en: "PAPER", tr: "KAĞIT" },
    name: { en: "Notebook", tr: "Defter" },
    desc: {
      en: "Plain cover, soft paper. Open space for notes.",
      tr: "Sade kapak, yumuşak kâğıt. Notlar için alan.",
    },
    cover: "assets/drop-001/notebook/defter1.png",
    galleryKey: "notebook",
  },
  {
    id: "sticker",
    tag: { en: "SET", tr: "SET" },
    name: { en: "Sticker Pack", tr: "Sticker Seti" },
    desc: {
      en: "A small visual set made for this drop.",
      tr: "Bu drop için hazırlanan görsel seti.",
    },
    cover: "assets/drop-001/sticker/sticker1.png",
    galleryKey: "sticker",
  },
];

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

// Carousel State
const carouselIndexByProductId = Object.create(null);
function getGallery(p) {
  return GALLERIES[p.galleryKey] || (p.cover ? [p.cover] : []);
}
function getIndex(p) {
  return carouselIndexByProductId[p.id] || 0;
}

function nextImage(p) {
  const list = getGallery(p);
  if (list.length < 2) return;
  const current = getIndex(p);
  carouselIndexByProductId[p.id] = (current + 1) % list.length;
  renderProducts(); // Re-render to update image
}

function renderProducts() {
  const grid = $("productGrid");
  if (!grid) return;
  grid.innerHTML = "";
  const t = CONTENT[currentLang];

  PRODUCTS.forEach((p, index) => {
    // 1. Row Wrapper
    const row = document.createElement("article");
    row.className = "product-row";

    // 2. Info Column
    const infoCol = document.createElement("div");
    infoCol.className = "p-info";
    infoCol.innerHTML = `
      <span class="p-id mono">0${index + 1} — ${p.tag[currentLang]}</span>
      <h3 class="p-title">${p.name[currentLang]}</h3>
      <p class="p-desc">${p.desc[currentLang]}</p>
    `;

    // 3. Media Column
    const mediaCol = document.createElement("div");
    mediaCol.className = "p-media";
    const gallery = getGallery(p);
    const idx = getIndex(p);

    const img = document.createElement("img");
    img.className = "p-img";
    img.src = gallery[idx];

    // Click logic
    if (gallery.length > 1) {
      img.addEventListener("click", () => nextImage(p));
      mediaCol.title =
        currentLang === "en" ? "Click for next" : "Değiştirmek için tıkla";

      const badge = document.createElement("div");
      badge.className = "media-counter mono";
      badge.textContent = `[${idx + 1}/${gallery.length}]`;
      mediaCol.appendChild(badge);
    }
    mediaCol.appendChild(img);

    // 4. Action Column
    const actionCol = document.createElement("div");
    actionCol.className = "p-action";

    const waText =
      currentLang === "en"
        ? `Hi, I want ${p.name.en}`
        : `Merhaba, ${p.name.tr} talep ediyorum`;
    const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
      waText
    )}`;

    actionCol.innerHTML = `
      <span class="tag-badge mono">${
        currentLang === "en" ? "IN STOCK" : "STOKTA"
      }</span>
      <a href="${waUrl}" target="_blank" class="btn-whatsapp">${
      t.buttons.request
    } →</a>
    `;

    row.append(infoCol, mediaCol, actionCol);
    grid.appendChild(row);
  });
}

function updateText() {
  const t = CONTENT[currentLang];
  $("btnEN").classList.toggle("active", currentLang === "en");
  $("btnTR").classList.toggle("active", currentLang === "tr");

  // Hero
  $("brandSub").textContent = t.brandSub;
  $("heroLead").textContent = t.heroLead;
  $("heroAccent").textContent = t.heroAccent;
  $("scrollHint").textContent = t.scrollHint;
  $("shopTitle").textContent = t.shopTitle;

  // About
  $("aboutTitle").textContent = t.aboutTitle;
  $("aboutLead").textContent = t.aboutLead;
  $("aboutPanelLeftTitle").textContent = t.aboutPanelLeftTitle;
  $("aboutPanelLeftBody").textContent = t.aboutPanelLeftBody;
  $("aboutPanelRightTitle").textContent = t.aboutPanelRightTitle;

  const al = $("aboutList");
  al.innerHTML = "";
  t.aboutList.forEach((i) => {
    const li = document.createElement("li");
    li.textContent = i;
    al.appendChild(li);
  });

  // Order & Footer
  $("orderTitle").textContent = t.orderTitle;
  $("orderLead").textContent = t.orderLead;
  const ol = $("orderList");
  ol.innerHTML = "";
  t.orderList.forEach((i) => {
    const li = document.createElement("li");
    li.textContent = i;
    ol.appendChild(li);
  });

  $("contactBtn").textContent = t.contactBtn;
  $("footerBrand").textContent = t.footerBrand;
  $("footerNote").textContent = t.footerNote;
  $("formTitle").textContent = t.formTitle;
  $("sendBtn").textContent = t.sendBtn;
  $("fromInput").placeholder = t.placeholders.from;
  $("subjectInput").placeholder = t.placeholders.subject;
  $("bodyInput").placeholder = t.placeholders.body;

  renderProducts();
}

window.addEventListener("load", () => {
  $("btnEN").onclick = () => {
    currentLang = "en";
    updateText();
  };
  $("btnTR").onclick = () => {
    currentLang = "tr";
    updateText();
  };

  // Modal
  const m = $("emailForm");
  $("footerContact").onclick = () => (m.style.display = "block");
  $("closeFormBtn").onclick = () => (m.style.display = "none");

  // Mailto
  $("contactForm").onsubmit = (e) => {
    e.preventDefault();
    const s = $("subjectInput").value;
    const b = $("bodyInput").value;
    const f = $("fromInput").value;
    window.location.href = `mailto:info@dasecoffee.co?subject=${s}&body=From: ${f}%0D%0A${b}`;
  };

  updateText();
});
