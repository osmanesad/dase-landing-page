# Değişiklikler ve denetim

## 23 Kasım 2026 — Kahve ve Kitaplar hazırlanıyor

- Ana sayfadaki Kahve ve Kitaplar kartlarına Türkçe/İngilizce “Hazırlanıyor” etiketi, yanıp sönen sinyal ve bölüme özel yakında açıklaması eklendi.
- Tıklama beklentisi yaratan oklar ve kart hover vurgusu bu iki karttan kaldırıldı. Menü bağlantıları aynı sayfadaki ilgili karta gider; hedef kart arka planla belirginleşir. Sanat bağlantıları ayrı sayfayı açmaya devam eder.
- Yeni sayfa eklenmedi; mevcut ana sayfa akışı korundu.

## 23 Kasım 2026 — Sinyal görünürlüğü

- “Yakında” ışığı 16 piksele büyütüldü; koyu zeminden ayrılan parlak yeşil renk, aydınlık/koyu döngü ve dışa yayılan halka eklendi.
- Azaltılmış hareket kuralının ışığı tamamen durdurması yerine daha yavaş ışık döngüsü kullanıldı; bu tercihte yayılan halka hareket etmez.
- Eski CSS’nin önbellekten gelmesini önlemek için Sanat sayfasının stil bağlantısına sürüm eklendi. Görsel tarayıcı doğrulaması yapılmadı.

## 23 Kasım 2026 — Yakında sinyal ışığı

- Sanat sayfasındaki “Yakında” etiketinin yanına yuvarlak, turuncu bir sinyal ışığı eklendi. Parlaklığı 2,4 saniyelik yumuşak döngüyle değişir.
- Işık dekoratiftir; ekran okuyuculardan gizlenir. Azaltılmış hareket tercihinde sabit görünür. Türkçe/İngilizce etiket değişirken yerinde kalır.

## 23 Kasım 2026 — Kayan yazının durması

- Ana sayfada azaltılmış hareket tercihinin kayan yazıyı tamamen durduran kuralı değiştirildi. Normal hız 22 saniye; azaltılmış hareket tercihinde daha yavaş, 66 saniyelik döngü kullanılır.
- Ziyaretçinin animasyonu durdurup yeniden başlatabileceği Türkçe/İngilizce düğme eklendi. Dil değişiminde duraklatma durumu korunur.
- Animasyon ayarı, yavaşlatılmış döngü ve durdur/oynat etkileşimleri test edildi. Gerçek tarayıcıda görsel doğrulama yapılmadı.

## 23 Kasım 2026 — Karma eser sıralaması

- “Tüm sanatçılar” listesi Beyza, İrem ve Ayşegül’den birer eser dönüşümlü gösterecek şekilde düzenlendi. Mozaiklerin listenin başında toplu görünmesi giderildi.
- Sanatçı filtreleri kendi eser sırasını korur. Dil değiştirirken ve tüm eserlere dönerken karma liste sırası sabit kalır.
- Ürün kaybı/tekrarı olmaması ve her üçlü grupta üç sanatçının bulunması test edildi.

## 23 Kasım 2026 — Yayına hazırlık açıklaması

- Sanat sayfasının açılışına Türkçe/İngilizce “hazırlanıyor / yakında” açıklaması eklendi. Eserlerin taslak ve temsili olduğu, satışın henüz açılmadığı açıklandı. Açıklama JavaScript kapalıyken de görünür.
- Ana sayfa kayan yazısının 22 saniyelik sonsuz animasyon ayarı, iki eş içerik grubu ve azaltılmış hareket tercihinde durması test edildi. Bu kontrol CSS/DOM düzeyindedir; bağlı tarayıcı olmadığından animasyonun görsel çalışması doğrulanamadı.

## 23 Kasım 2026 — Instagram profilleri

- Beyza (`@beyzaornekl`), İrem (`@atelier.tue`) ve Ayşegül (`@asheluldag`) için sanatçı kartlarına Instagram bağlantıları eklendi.
- Üç hesabın herkese açık profil fotoğrafları indirilip kartlara eklendi. Fotoğraflar siteden sunuluyor; yüklenemeyen portre gizleniyor.
- Profil başına üç gönderi görseli alınamadı; herkese açık profil yanıtlarında gönderi fotoğrafları sunulmadı. Profil fotoğrafları ürün fotoğrafı olarak kullanılmadı.
- Profil bağlantıları, dosyaları ve bozuk portre davranışı mevcut testlere eklendi.

## 23 Kasım 2026 — Son sistem denetimi

Aktif ana sayfa (`index.html`) ve Sanat sayfası (`art/index.html`) denetlendi.

### Düzeltilen hatalar

- Sanatçı filtresi yeniden çizildiğinde kaybolan klavye odağı korunuyor.
- Ürün detayından sanatçı profiline dönüşte pencere kapanıyor, doğru profile kaydırılıyor ve klavye odağı profile taşınıyor.
- Diğer eser önerileri aynı sanatçının eserlerini önce gösteriyor; mevcut eserin tekrar önerilmesi engelleniyor.
- Sanat sayfasının mobilde tamamen gizlenen menüsü erişilebilir ikinci bir satırda gösteriliyor. Tablet açılışı tek sütuna alındı; dar ekran başlığı ve kontrolleri düzenlendi.
- Yüklenemeyen fotoğraflar için anlaşılır geri bildirim eklendi.
- Stoku sıfır olan satıştaki eserler “Tükendi” olarak gösteriliyor.
- Sepet miktarlarında negatif, kesirli, geçersiz veya stok üstü değerler reddediliyor. Başarısız eklemelerde başarı mesajı gösterilmiyor.
- Sepetin WhatsApp mesajına sanatçı adı eklendi. Doğrudan ödeme linki olmayan satıştaki ürünlerde WhatsApp sipariş açıklaması gösteriliyor.
- Ana sayfada bozuk/kasıtsız kaydedilmiş dil değerlerinin (`toString`, `constructor` vb.) çevirileri bozması düzeltildi.
- Menü etiketleri, Türkçe başlangıç başlıkları, azaltılmış hareket tercihi, bölüm kaydırma boşlukları ve koyu bölümde odak görünürlüğü düzenlendi.
- Ana sayfanın sanat tanıtımı üç sanatçının güncel üretim alanlarına uyarlandı.

### Doğrulama

`npm test` ile 7 test grubu çalışır:

1. İki sayfanın yerel bağlantıları, dosyaları, bölüm hedefleri, benzersiz kimlikleri ve JavaScript sözdizimi.
2. Ana sayfadaki üç Sanat girişi, çeviriler ve bozuk dil tercihleri.
3. Üç profil, 30 ürün, filtreleme, detaylar, aynı sanatçıdan öneriler, profil dönüşü ve özel sipariş bağlantıları.
4. Galeri seçimi, bozuk fotoğraf geri bildirimi ve satış kapalıyken ödeme düğmesinin gizlenmesi.
5. Satış açık örnek verilerle stok, sepet miktarı/toplamı, kayıt ve WhatsApp sipariş mesajı.
6. Geçersiz ödeme URL’leri, tükenmiş stok ve bozuk/eski sepet kayıtları.
7. Tarayıcı depolaması kullanılamadığında iki sayfanın çalışması.

Testler gerçek sayfa HTML’ini ve uygulama kodunu JSDOM ortamında çalıştırır. Yerleşim çizimi yapılmaz; pencere ve kaydırma API’leri test ortamında taklit edilir. Bağlı tarayıcı olmadığından masaüstü/mobil görsel doğrulama ve gerçek tarayıcı pencere davranışı bu denetimde doğrulanamadı. WhatsApp hesabının erişilebilirliği, harita/Instagram servislerinin dış durumu, ödeme sağlayıcı hesabı ve gerçek ödeme işlemi bu testlerin kapsamı dışındadır.

### Mevcut sistem

- Beyza: 10 suluboya kartpostal taslağı (B01–B10).
- İrem: 10 mozaik taslağı (M01–M10); profili tuval çalışmalarını da kapsar.
- Ayşegül: 10 tuval resmi taslağı (A01–A10).
- Sanatçı profilleri, sanatçıya göre eserler, ürün detayları, galeri desteği, ilgili eserler, WhatsApp bilgi/özel sipariş ve ürün bazında ödeme bağlantısı desteği mevcuttur.

Ürünler temsili görseller kullanan taslaklardır; `ordersEnabled: false` korunmuştur. Gerçek fotoğraflar, ürün açıklamaları/ölçüleri, fiyatlar, stoklar ve ödeme sağlayıcı linkleri tamamlanmadan satışa açılmamalıdır. Kart bilgisi sitede toplanmaz. GitHub’a gönderim, canlı hosting dağıtımının doğrulandığı anlamına gelmez.
