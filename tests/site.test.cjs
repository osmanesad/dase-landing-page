const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { JSDOM, VirtualConsole } = require('jsdom');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');

function page(file, options = {}) {
  const errors = [];
  const console = new VirtualConsole();
  console.on('jsdomError', error => errors.push(error));
  const dom = new JSDOM(read(file), {
    url: 'https://example.test/subdirectory/' + file,
    runScripts: 'outside-only', virtualConsole: console
  });
  const w = dom.window;
  // JSDOM has no layout or native dialog implementation. Test interaction
  // handlers with minimal platform shims; these are not visual browser tests.
  w.HTMLElement.prototype.scrollIntoView = function () { this.scrolled = true; };
  w.HTMLDialogElement.prototype.showModal = function () { this.setAttribute('open', ''); };
  w.HTMLDialogElement.prototype.close = function () { this.removeAttribute('open'); };
  if (options.saved) w.localStorage.setItem('dase-language', options.saved);
  if (options.basket) w.localStorage.setItem('dase-art-basket-v1', options.basket);
  if (options.storageBlocked) Object.defineProperty(w, 'localStorage', { get() { throw Error('blocked'); } });
  if (file === 'art/index.html') {
    w.eval(read('art/catalog.js'));
    if (options.configure) options.configure(w.DASE_ART);
    w.eval(read('art/shop.js'));
  } else {
    for (const script of w.document.querySelectorAll('script:not([src])')) w.eval(script.textContent);
  }
  return { dom, w, d: w.document, errors };
}
const click = (d, selector) => { const node = d.querySelector(selector); assert(node, selector); node.click(); return node; };
const available = p => Object.assign(p, {
  status: 'available', name: { tr: 'Test eseri', en: 'Test artwork' },
  image: 'photos/test.webp', images: ['photos/detail.webp', 'photos/test.webp'],
  priceKurus: 45000, stock: 2, paymentUrl: 'https://checkout.example.test/item'
});

test('both pages: links, assets, IDs, accessible references and JavaScript syntax', () => {
  for (const file of ['index.html', 'art/index.html']) {
    const { dom, d, errors } = page(file);
    const ids = [...d.querySelectorAll('[id]')].map(n => n.id);
    assert.equal(new Set(ids).size, ids.length, 'duplicate IDs');
    for (const node of d.querySelectorAll('[aria-labelledby]')) {
      for (const id of node.getAttribute('aria-labelledby').split(/\s+/)) assert(d.getElementById(id), id);
    }
    for (const node of d.querySelectorAll('[href], [src]')) {
      const value = node.getAttribute('href') || node.getAttribute('src');
      if (!value) continue;
      if (/^(https?:|mailto:)/.test(value)) {
        if (node.target === '_blank') assert(node.rel.includes('noopener'), value);
        continue;
      }
      const url = new URL(value, 'https://example.test/' + file);
      const target = url.pathname.replace(/^\//, '') || file;
      assert(fs.existsSync(path.join(root, target)), value);
      if (url.hash) {
        const destination = target === file ? d : new JSDOM(read(target)).window.document;
        assert(destination.getElementById(decodeURIComponent(url.hash.slice(1))), value);
      }
    }
    for (const script of d.querySelectorAll('script')) new vm.Script(script.src ? read(script.getAttribute('src').startsWith('art/') ? script.getAttribute('src') : path.posix.join(path.posix.dirname(file), script.getAttribute('src'))) : script.textContent);
    for (const css of [file === 'index.html' ? d.querySelector('style').textContent : read('art/art.css')]) {
      for (const match of css.matchAll(/url\(["']?([^"')]+)["']?\)/g)) assert(fs.existsSync(path.resolve(root, path.dirname(file), match[1])), match[1]);
    }
    assert.equal(errors.length, 0);
    dom.window.close();
  }
});

test('home: all three Art entry points, translations and malformed saved language', () => {
  for (const saved of ['tr', 'en', 'toString', 'constructor', 'invalid']) {
    const { dom, d, errors } = page('index.html', { saved });
    assert.equal(d.documentElement.lang, saved === 'en' ? 'en' : 'tr');
    assert.equal(d.querySelectorAll('a[href="art/index.html"]').length, 3);
    for (const id of ['coffee', 'books']) {
      const card = d.getElementById(id);
      assert.equal(card.tagName, 'ARTICLE');
      assert(card.querySelector('.pending-signal'));
      assert(card.querySelector('.pending-copy').textContent.trim());
      assert(!card.querySelector('.arrow-icon'));
    }
    const track = d.querySelector('.ticker-track');
    const animation = d.defaultView.getComputedStyle(track).animation.split(/\s+/).sort();
    assert.deepEqual(animation, ['ticker-scroll', '22s', 'linear', 'infinite'].sort());
    const groups = track.querySelectorAll('.ticker-group');
    assert.equal(groups.length, 2);
    assert.equal(groups[0].textContent, groups[1].textContent);
    assert.equal(groups[1].getAttribute('aria-hidden'), 'true');
    const reducedMotion = [...d.styleSheets[0].cssRules].filter(rule => rule.conditionText?.replace(/\s/g, '') === '(prefers-reduced-motion:reduce)');
    assert(reducedMotion.some(media => [...media.cssRules].some(rule => rule.selectorText === '.ticker-track' && rule.style.getPropertyValue('animation-duration') === '66s')));
    assert.equal(track.style.animationPlayState, 'running');
    click(d, '#ticker-toggle');
    assert.equal(track.style.animationPlayState, 'paused');
    assert.equal(d.querySelector('#ticker-toggle').getAttribute('aria-pressed'), 'true');
    for (const lang of ['en', 'tr']) {
      click(d, `[data-lang="${lang}"]`);
      assert.equal(d.documentElement.lang, lang);
      for (const node of d.querySelectorAll('[data-i18n]')) assert(node.textContent.trim());
      assert.equal(d.querySelector('#coffee [data-i18n="preparing"]').textContent, lang === 'en' ? 'COMING SOON' : 'HAZIRLANIYOR');
      assert.equal(track.style.animationPlayState, 'paused');
      assert.equal(d.querySelector('#ticker-toggle').textContent, lang === 'en' ? 'PLAY' : 'OYNAT');
    }
    click(d, '#ticker-toggle');
    assert.equal(track.style.animationPlayState, 'running');
    assert.equal(errors.length, 0);
    dom.window.close();
  }
});

test('art: profiles, 30 products, filtering, all dialogs, recommendations and profile return', () => {
  const { dom, w, d, errors } = page('art/index.html');
  assert.equal(d.querySelectorAll('.artist-profile').length, 3);
  assert(d.querySelector('.preparation-notice').textContent.includes('henüz satışa açık değildir'));
  const initial = new JSDOM(read('art/index.html')).window.document;
  assert(initial.querySelector('.preparation-notice').textContent.includes('hazırlanıyor'));
  const instagramProfiles = { beyza: 'beyzaornekl', irem: 'atelier.tue', aysegul: 'asheluldag' };
  for (const [id, handle] of Object.entries(instagramProfiles)) {
    const link = d.querySelector(`#sanatci-${id} .artist-instagram`);
    assert.equal(link.href, `https://www.instagram.com/${handle}/`);
    assert.equal(link.target, '_blank');
    assert(link.rel.includes('noopener'));
    const photo = d.querySelector(`#sanatci-${id} .artist-avatar`);
    assert(photo);
    assert(fs.existsSync(path.join(root, 'art', photo.getAttribute('src'))));
    photo.dispatchEvent(new w.Event('error'));
    assert(!d.querySelector(`#sanatci-${id} .artist-avatar`));
  }
  assert.equal(d.querySelectorAll('.product-card').length, 30);
  const mixedOrder = [...d.querySelectorAll('.product-card')].map(card => card.dataset.productId);
  assert.equal(new Set(mixedOrder).size, 30);
  for (let index = 0; index < mixedOrder.length; index += 3) {
    const artistIds = mixedOrder.slice(index, index + 3).map(id => w.DASE_ART.products.find(p => p.id === id).artistId);
    assert.equal(new Set(artistIds).size, 3, 'each group of three represents all artists');
  }
  assert.equal(new Set(w.DASE_ART.products.map(p => p.id)).size, 30);
  for (const artist of w.DASE_ART.artists) {
    click(d, `#sanatci-${artist.id} button`);
    assert.equal(d.activeElement.id, 'collection-title');
    assert.equal(d.querySelectorAll('.product-card').length, 10);
    assert(d.querySelector('#collection-empty').hidden);
    for (const button of d.querySelectorAll('.product-card h3 button')) {
      button.click();
      assert(d.querySelector('#product-dialog').open);
      assert.equal(d.querySelector('#product-artist').hash, '#sanatci-' + artist.id);
      assert(d.querySelector('#product-description').textContent.trim());
      assert(d.querySelector('#product-payment').hidden);
      assert(d.querySelector('#product-add').hidden);
      const message = new URL(d.querySelector('#product-whatsapp').href).searchParams.get('text');
      assert(message.includes(artist.name));
      assert(message.includes(d.querySelector('#product-code').textContent));
      const current = d.querySelector('#product-title').textContent;
      click(d, '#related-products button');
      assert.notEqual(d.querySelector('#product-title').textContent, current);
      assert.equal(d.querySelector('#product-artist').hash, '#sanatci-' + artist.id);
    }
    click(d, '#product-artist');
    assert(!d.querySelector('#product-dialog').open);
    assert.equal(d.activeElement.id, 'sanatci-' + artist.id);
  }
  const filter = d.querySelector('[data-artist-filter="beyza"]');
  filter.focus(); filter.click();
  assert.equal(d.activeElement.dataset.artistFilter, 'beyza');
  click(d, '.product-card button'); click(d, '#browse-collection');
  assert.equal(d.querySelectorAll('.product-card').length, 30);
  assert.deepEqual([...d.querySelectorAll('.product-card')].map(card => card.dataset.productId), mixedOrder);
  for (const link of d.querySelectorAll('#commission-links a')) {
    assert(new URL(link.href).searchParams.get('text').includes(link.textContent));
  }
  for (const lang of ['en', 'tr']) {
    click(d, `[data-lang="${lang}"]`);
    assert(d.querySelector('#preparation-title').textContent.includes(lang === 'en' ? 'taking shape' : 'hazırlanıyor'));
    for (const node of d.querySelectorAll('[data-copy]')) assert(node.textContent.trim(), node.dataset.copy);
    assert.equal(d.documentElement.lang, lang);
  }
  assert.equal(errors.length, 0);
  dom.window.close();
});

test('gallery and broken image fallback; disabled sales keep checkout hidden', () => {
  const { dom, d, w, errors } = page('art/index.html', { configure(data) { available(data.products[0]); } });
  click(d, '[data-product-id="M01"] button');
  assert.equal(d.querySelectorAll('#product-gallery button').length, 2);
  click(d, '#product-gallery button:nth-child(2)');
  assert.equal(d.querySelector('#product-image img').getAttribute('src'), 'photos/detail.webp');
  assert.equal(d.querySelector('#product-gallery button:nth-child(2)').getAttribute('aria-pressed'), 'true');
  d.querySelector('#product-image img').dispatchEvent(new w.Event('error'));
  assert(d.querySelector('#product-image .image-error'));
  assert(d.querySelector('#product-visual-note').textContent.includes('yüklenemedi'));
  assert(d.querySelector('#product-payment').hidden);
  assert.equal(errors.length, 0);
  dom.window.close();
});

test('enabled sales: stock, basket totals, persistence, quantity bounds and WhatsApp order', () => {
  const { dom, w, d, errors } = page('art/index.html', { configure(data) { data.ordersEnabled = true; available(data.products[0]); } });
  click(d, '[data-product-id="M01"] button');
  assert(!d.querySelector('#product-payment').hidden);
  assert.equal(d.querySelector('#product-payment').href, 'https://checkout.example.test/item');
  click(d, '#product-add'); click(d, '#basket-open');
  assert.equal(d.querySelector('#basket-count').textContent, '1');
  click(d, '[data-control="M01-plus"]');
  assert.equal(d.querySelector('#basket-count').textContent, '2');
  assert(d.querySelector('[data-control="M01-plus"]').disabled);
  assert.equal(JSON.parse(w.localStorage.getItem('dase-art-basket-v1')).M01, 2);
  assert.equal(w.eval('setQuantity("M01", 3)'), false);
  assert.equal(w.eval('setQuantity("M01", -1)'), false);
  assert.equal(w.eval('setQuantity("M01", 1.5)'), false);
  assert.equal(w.eval('setQuantity("M01", NaN)'), false);
  const message = new URL(d.querySelector('#order-link').href).searchParams.get('text');
  assert(message.includes('M01')); assert(message.includes('İrem')); assert(message.includes('900'));
  click(d, '[data-control="M01-minus"]'); click(d, '[data-control="M01-minus"]');
  assert.equal(d.querySelector('#basket-count').textContent, '0');
  assert(d.querySelector('#basket-summary').hidden);
  assert(!d.querySelector('#order-link').hasAttribute('href'));
  assert.equal(errors.length, 0);
  dom.window.close();
});

test('payment rejects unsafe URLs and unavailable stock; restore handles stale and malformed storage', () => {
  for (const paymentUrl of ['javascript:alert(1)', 'http://checkout.example', 'https://user:pass@checkout.example', 'broken']) {
    const { dom, d } = page('art/index.html', { configure(data) { data.ordersEnabled = true; available(data.products[0]); data.products[0].paymentUrl = paymentUrl; } });
    click(d, '[data-product-id="M01"] button'); assert(d.querySelector('#product-payment').hidden); dom.window.close();
  }
  for (const status of ['sold', 'available']) {
    const { dom, d } = page('art/index.html', { configure(data) { data.ordersEnabled = true; available(data.products[0]); Object.assign(data.products[0], { status, stock: 0 }); } });
    click(d, '[data-product-id="M01"] button'); assert(d.querySelector('#product-add').hidden); assert(d.querySelector('#product-payment').hidden);
    assert.equal(d.querySelector('#product-price').textContent, 'Tükendi'); dom.window.close();
  }
  for (const saved of ['broken', 'null', '{"M01":99,"unknown":4,"B01":2}', '{"M01":-2}', '{"M01":1.5}']) {
    const { dom, d, errors } = page('art/index.html', { basket: saved, configure(data) { data.ordersEnabled = true; available(data.products[0]); } });
    assert.equal(d.querySelector('#basket-count').textContent, saved.includes('99') ? '2' : '0'); assert.equal(errors.length, 0); dom.window.close();
  }
});

test('both pages remain usable when localStorage is unavailable', () => {
  for (const file of ['index.html', 'art/index.html']) {
    const { dom, d, errors } = page(file, { storageBlocked: true });
    click(d, '[data-lang="en"]'); assert.equal(d.documentElement.lang, 'en');
    if (file.startsWith('art/')) { click(d, '[data-product-id="M01"] button'); assert(d.querySelector('#product-dialog').open); }
    assert.equal(errors.length, 0); dom.window.close();
  }
});
