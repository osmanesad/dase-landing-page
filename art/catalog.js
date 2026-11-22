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
  artists: [
    {
      id: "beyza", name: "Beyza", visual: "watercolor",
      medium: { tr: "Suluboya · Kartpostal", en: "Watercolour · Postcards" },
      bio: { tr: "Beyza, suluboyayla kartpostallar yapıyor. Renkleri kâğıt üzerinde buluşturan çalışmalarını keşfet; sana özel bir resim için fikrini onunla paylaş.", en: "Beyza makes watercolour postcards. Explore her work on paper, or share your idea for a commissioned painting." }
    },
    {
      id: "irem", name: "İrem", visual: "mosaic",
      medium: { tr: "Mozaik · Tuval", en: "Mosaic · Canvas" },
      bio: { tr: "İrem’in üretimi mozaikten tuvale uzanıyor. Küçük parçalarla kurduğu dünyaların yanında tuval üzerine resimler de yapıyor. Sipariş üzerine resim taleplerini de iletebilirsin.", en: "İrem works in both mosaic and painting on canvas. Alongside the worlds she builds from small pieces, she also welcomes requests for commissioned paintings." }
    },
    {
      id: "aysegul", name: "Ayşegül", visual: "canvas",
      medium: { tr: "Tuval · Farklı materyaller", en: "Canvas · Mixed materials" },
      bio: { tr: "Ayşegül, tuval üzerinde renkleri farklı materyallerle bir araya getiriyor. Bağımsız üretimlerini keşfet ya da sana özel bir resim için onunla bir fikir paylaş.", en: "Ayşegül brings colour and different materials together on canvas. Explore her independent practice, or share an idea for a painting made for you." }
    }
  ],
  products: [
    { id: "M01", artistId: "irem", category: "mosaic", status: "draft", name: { tr: "", en: "" }, description: { tr: "", en: "" }, size: "", image: "", images: [], paymentUrl: "", priceKurus: null, stock: 0 },
    { id: "M02", artistId: "irem", category: "mosaic", status: "draft", name: { tr: "", en: "" }, description: { tr: "", en: "" }, size: "", image: "", images: [], paymentUrl: "", priceKurus: null, stock: 0 },
    { id: "M03", artistId: "irem", category: "mosaic", status: "draft", name: { tr: "", en: "" }, description: { tr: "", en: "" }, size: "", image: "", images: [], paymentUrl: "", priceKurus: null, stock: 0 },
    { id: "M04", artistId: "irem", category: "mosaic", status: "draft", name: { tr: "", en: "" }, description: { tr: "", en: "" }, size: "", image: "", images: [], paymentUrl: "", priceKurus: null, stock: 0 },
    { id: "M05", artistId: "irem", category: "mosaic", status: "draft", name: { tr: "", en: "" }, description: { tr: "", en: "" }, size: "", image: "", images: [], paymentUrl: "", priceKurus: null, stock: 0 },
    { id: "M06", artistId: "irem", category: "mosaic", status: "draft", name: { tr: "", en: "" }, description: { tr: "", en: "" }, size: "", image: "", images: [], paymentUrl: "", priceKurus: null, stock: 0 },
    { id: "M07", artistId: "irem", category: "mosaic", status: "draft", name: { tr: "", en: "" }, description: { tr: "", en: "" }, size: "", image: "", images: [], paymentUrl: "", priceKurus: null, stock: 0 },
    { id: "M08", artistId: "irem", category: "mosaic", status: "draft", name: { tr: "", en: "" }, description: { tr: "", en: "" }, size: "", image: "", images: [], paymentUrl: "", priceKurus: null, stock: 0 },
    { id: "M09", artistId: "irem", category: "mosaic", status: "draft", name: { tr: "", en: "" }, description: { tr: "", en: "" }, size: "", image: "", images: [], paymentUrl: "", priceKurus: null, stock: 0 },
    { id: "M10", artistId: "irem", category: "mosaic", status: "draft", name: { tr: "", en: "" }, description: { tr: "", en: "" }, size: "", image: "", images: [], paymentUrl: "", priceKurus: null, stock: 0 }
  ]
};
