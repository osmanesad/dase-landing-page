let currentLang = "en";
let sloganIndex = 0;

const slogans = {
  en: [
    "a better brew is coming",
    "not just coffee. a culture.",
    "a quiet corner is on the way",
    "books. brews. beyoğlu.",
    "almost ready to pause",
    "a place to sip and reflect",
    "coffee. art. stillness.",
    "brewing stories and spaces",
  ],
  tr: [
    "daha iyi bir demleme geliyor",
    "sadece kahve değil. bir kültür.",
    "sessiz bir köşe yakında",
    "kitaplar. kahveler. beyoğlu.",
    "neredeyse hazırız",
    "bir yudumluk huzur",
    "kahve. sanat. dinginlik.",
    "hikâyeleri ve alanları demliyoruz",
  ],
};

function changeSlogan() {
  const h1 = document.querySelector("h1");
  h1.textContent = slogans[currentLang][sloganIndex];
  sloganIndex = (sloganIndex + 1) % slogans[currentLang].length;
}

function setLanguage(lang) {
  currentLang = lang;
  sloganIndex = 0;
  changeSlogan();
  updateStaticText();

  // Aktif dil butonunu güncelle
  document.querySelectorAll(".language-switcher button").forEach((btn) => {
    const isActive = btn.textContent.toLowerCase() === lang;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-pressed", isActive);
  });
}

function updateStaticText() {
  document.querySelector(".subtext").textContent =
    currentLang === "en"
      ? "a space for coffee, books & art"
      : "kahve, kitap ve sanat için bir alan";

  document.querySelector(".fixed-opening").textContent =
    currentLang === "en"
      ? "opening 2026 in beyoğlu, istanbul"
      : "2026'da beyoğlu'nda açılıyor";

  document.querySelector(".contact-button").textContent =
    currentLang === "en" ? "Contact" : "İletişim";

  document.querySelector(".send-btn").textContent =
    currentLang === "en" ? "Send Email →" : "Mail Gönder →";

  document.querySelector(".email-form h3").textContent =
    currentLang === "en" ? "Get in touch" : "İletişime geç";

  document.querySelector('input[name="from"]').placeholder =
    currentLang === "en" ? "Your email address" : "E-posta adresiniz";

  document.querySelector('input[name="subject"]').placeholder =
    currentLang === "en" ? "Subject" : "Konu";

  document.querySelector('textarea[name="body"]').placeholder =
    currentLang === "en" ? "Your message" : "Mesajınız";
}

function showForm() {
  document.querySelector(".email-form").style.display = "flex";
}

function closeForm() {
  document.querySelector(".email-form").style.display = "none";
}

function formatMailto(event) {
  event.preventDefault();

  const from = document.querySelector('input[name="from"]').value;
  const subjectRaw = document.querySelector('input[name="subject"]').value;
  const bodyRaw = document.querySelector('textarea[name="body"]').value;

  const subject = encodeURIComponent(subjectRaw);
  const fullBody = `From: ${from}\n\n${bodyRaw}`;
  const message = encodeURIComponent(fullBody);

  window.location.href = `mailto:info@dasecoffee.co?subject=${subject}&body=${message}`;
}

document.addEventListener("DOMContentLoaded", () => {
  setLanguage("en");
  setInterval(changeSlogan, 7000);
});
