/*
 * status: "draft" (yakında), "available" (satışta) veya "sold" (tükendi).
 * priceKurus tam sayı olmalı. Örnek: 450 TL için 45000.
 * Fotoğraf yolu örneği: "photos/m01.webp". Gerçek fotoğrafı o konuma yükleyin.
 * Siparişe açmadan önce WhatsApp hattını ve Tosla İşim Link ile Ödeme’yi doğrulayın.
 * Her ürüne images: ["photos/m01-detail.webp", ...] ile ek görseller eklenebilir.
 * paymentUrl: "https://..." alanına sağlayıcının gerçek ürün ödeme linkini girin.
 * Ödeme yalnızca ordersEnabled açık, ürün available ve fotoğraf/fiyat/stok doluysa görünür.
 * Fotoğrafı olmayan ürünlerde açıkça temsili olarak etiketlenen çizimler gösterilir.
 */
window.DASE_ART = {
  ordersEnabled: false,
  whatsapp: "905445072918",
  products: [
    { id: "M01", status: "draft", name: { tr: "", en: "" }, description: { tr: "", en: "" }, size: "", image: "", images: [], paymentUrl: "", priceKurus: null, stock: 0 },
    { id: "M02", status: "draft", name: { tr: "", en: "" }, description: { tr: "", en: "" }, size: "", image: "", images: [], paymentUrl: "", priceKurus: null, stock: 0 },
    { id: "M03", status: "draft", name: { tr: "", en: "" }, description: { tr: "", en: "" }, size: "", image: "", images: [], paymentUrl: "", priceKurus: null, stock: 0 },
    { id: "M04", status: "draft", name: { tr: "", en: "" }, description: { tr: "", en: "" }, size: "", image: "", images: [], paymentUrl: "", priceKurus: null, stock: 0 },
    { id: "M05", status: "draft", name: { tr: "", en: "" }, description: { tr: "", en: "" }, size: "", image: "", images: [], paymentUrl: "", priceKurus: null, stock: 0 },
    { id: "M06", status: "draft", name: { tr: "", en: "" }, description: { tr: "", en: "" }, size: "", image: "", images: [], paymentUrl: "", priceKurus: null, stock: 0 },
    { id: "M07", status: "draft", name: { tr: "", en: "" }, description: { tr: "", en: "" }, size: "", image: "", images: [], paymentUrl: "", priceKurus: null, stock: 0 },
    { id: "M08", status: "draft", name: { tr: "", en: "" }, description: { tr: "", en: "" }, size: "", image: "", images: [], paymentUrl: "", priceKurus: null, stock: 0 },
    { id: "M09", status: "draft", name: { tr: "", en: "" }, description: { tr: "", en: "" }, size: "", image: "", images: [], paymentUrl: "", priceKurus: null, stock: 0 },
    { id: "M10", status: "draft", name: { tr: "", en: "" }, description: { tr: "", en: "" }, size: "", image: "", images: [], paymentUrl: "", priceKurus: null, stock: 0 }
  ]
};
