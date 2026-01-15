const CONTENT = {
  tr: {
    brandSub: "kahve · kağıt · objeler",
    intro: "Acele etmeden üretilen, sınırlı sayıda seçkiler.",
    buttons: { req: "WHATSAPP İLE TALEP ET" },
    shopTitle: "İNDEKS 001"
  },
  en: {
    brandSub: "coffee · paper · objects",
    intro: "A slow selection of limited goods.",
    buttons: { req: "REQUEST VIA WHATSAPP" },
    shopTitle: "INDEX 001"
  }
};

const PRODUCTS = [
  {
    id: "01", key: "tote", name: { tr: "Bez Çanta", en: "Tote Bag" },
    desc: { tr: "Kalın kanvas, günlük kullanım için ağır işçi.", en: "Heavy canvas, designed for daily loads." },
    img: "assets/drop-001/tote/canta1.png" // Kendi görsel yolunu kontrol et
  },
  {
    id: "02", key: "mug", name: { tr: "Seramik Bardak", en: "Ceramic Cup" },
    desc: { tr: "El yapımı, dokulu yüzey. Her biri tek.", en: "Handmade, textured surface. Each one unique." },
    img: "assets/drop-001/mug/bardak1.png"
  },
  {
    id: "03", key: "notebook", name: { tr: "Eskiz Defteri", en: "Sketchbook" },
    desc: { tr: "Yumuşak kağıt, düz sayfalar.", en: "Soft paper, plain pages." },
    img: "assets/drop-001/notebook/defter1.png"
  },
  {
    id: "04", key: "sticker", name: { tr: "Sticker Pack", en: "Sticker Pack" },
    desc: { tr: "Drop 001 için özel grafikler.", en: "Custom graphics for Drop 001." },
    img: "assets/drop-001/sticker/sticker1.png"
  }
];

let currentLang = "tr";
const WHATSAPP = "905445072918";

function $(id) { return document.getElementById(id); }

function render() {
  const list = $("productList");
  const stageImg = $("stageImage");
  const stageTag = $("stageTag");
  
  list.innerHTML = "";
  
  // Varsayılan ilk görsel
  if(PRODUCTS.length > 0) {
    stageImg.src = PRODUCTS[0].img;
    stageImg.onload = () => stageImg.classList.add("loaded");
    stageTag.textContent = `${PRODUCTS[0].id} — ${PRODUCTS[0].name[currentLang]}`;
  }

  PRODUCTS.forEach((p, index) => {
    const item = document.createElement("div");
    item.className = `list-item ${index === 0 ? 'active-item' : ''}`; // İlk ürün açık gelir
    
    // HTML Yapısı
    item.innerHTML = `
      <div class="item-header">
        <span class="item-id mono">${p.id}</span>
        <h2 class="item-title serif">${p.name[currentLang]}</h2>
      </div>
      <p class="item-desc">${p.desc[currentLang]}</p>
      <div class="action-row">
        <a href="https://wa.me/${WHATSAPP}?text=I want ${p.name.en}" target="_blank" class="btn-buy">
          ${CONTENT[currentLang].buttons.req} →
        </a>
      </div>
    `;

    // Mouse Interaction (Desktop)
    item.addEventListener("mouseenter", () => {
      // Tüm aktifleri temizle
      document.querySelectorAll(".list-item").forEach(el => el.classList.remove("active-item"));
      // Buna aktif ekle
      item.classList.add("active-item");
      
      // Görseli değiştir
      stageImg.classList.remove("loaded");
      setTimeout(() => {
        stageImg.src = p.img;
        stageTag.textContent = `${p.id} — ${p.name[currentLang]}`;
        stageImg.onload = () => stageImg.classList.add("loaded");
      }, 100);
    });
    
    // Mobil için tıklama (Accordion mantığı)
    item.addEventListener("click", () => {
      if(window.innerWidth < 900) {
        stageImg.src = p.img;
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Görsele yukarı çık
      }
    });

    list.appendChild(item);
  });
}

// Init
window.addEventListener("load", () => {
  render();
  
  $("btnTR").onclick = () => { currentLang = "tr"; render(); $("btnTR").classList.add("active"); $("btnEN").classList.remove("active"); };
  $("btnEN").onclick = () => { currentLang = "en"; render(); $("btnEN").classList.add("active"); $("btnTR").classList.remove("active"); };
  
  // Modal basit mantık
  const modal = $("emailForm");
  $("contactBtn").onclick = () => modal.style.display = "flex";
  $("closeFormBtn").onclick = () => modal.style.display = "none";
});