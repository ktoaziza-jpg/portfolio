/* ---------- 1. Проекты: наполняй здесь ----------
   На странице Projects две группы:
   1) Agency Work — большая обложка, по клику открывается отдельная страница (см. ниже)
   2) Independent Work — карточки со ссылками на Behance

   Обложки кладём в папку img/ рядом с index.html:
     img/agency-work.jpg             — обложка Agency Work
     img/work-01.jpg ... work-12.jpg — независимые работы, по порядку из списка ниже
   Пока файла нет, показывается цветная заглушка — сайт не ломается.
   Своё имя файла — добавь в работу поле image: 'img/имя.jpg' */
const featured = {
  title: 'Agency Work',
  text:  'A collection of visual designs created during my time at We Digital',
  years: '2025–2026',
  color: '#52284B',
  image: 'img/agency-work.jpg'
};

const independent = {
  title: 'Independent Work',
  text:  'Independent projects, each one opens on Behance',
  years: '2024–2025'
};

const works = [
  { title: 'Social Media Design',                 tag: 'Social Media', url: 'https://www.behance.net/gallery/234881077/Social-Media-Design' },
  { title: 'Visual Support for Festival',         tag: 'Festival',     url: 'https://www.behance.net/gallery/234880147/Visual-Support-for-Festival' },
  { title: 'Social Media Print Design',           tag: 'Print',        url: 'https://www.behance.net/gallery/234876853/Social-Media-Print-Design' },
  { title: 'Social Media Content',                tag: 'Social Media', url: 'https://www.behance.net/gallery/224655413/Social-Media-Content' },
  { title: 'Branding Elements',                   tag: 'Branding',     url: 'https://www.behance.net/gallery/224651589/Branding-elements' },
  { title: 'Flyer Design & Brochure',             tag: 'Print',        url: 'https://www.behance.net/gallery/224650055/Flyer-design-Brochure' },
  { title: 'Marketing Agency Project',            tag: 'Marketing',    url: 'https://www.behance.net/gallery/216876649/Marketing-Agency-Project' },
  { title: 'Project UzCarlsberg',                 tag: 'Project',      url: 'https://www.behance.net/gallery/216872977/Project-UzCarlsberg' },
  { title: 'National Illustrations',              tag: 'Illustration', url: 'https://www.behance.net/gallery/216789507/illjustracii-National-Illustrations' },
  { title: 'Flyer & Brochure for Learning Center', tag: 'Print',       url: 'https://www.behance.net/gallery/216692653/buklet-Flyer-Brochure-for-learning-center' },
  { title: 'Beauty Salon Logo',                   tag: 'Logo',         url: 'https://www.behance.net/gallery/201401451/logotip-dlja-studii-krasoty-Beauty-salon-logo' },
  { title: 'Stickers',                            tag: 'Illustration', url: 'https://www.behance.net/gallery/201399123/stikery-Stickers' }
];

/* ---------- Страница Agency Work: вкладки и разделы ----------
   Картинки лежат в img/agency/ и называются  prefix-01.jpg, prefix-02.jpg ...
   Расположение собирается из блоков, как auto-layout в Figma. Числа — номера файлов:
     R(1, 2, 3)      — ряд: картинки рядом, одной высоты, без обрезки
     C(1, 2, 3)      — колонка: картинки друг под другом, одной ширины
     блоки вкладываются друг в друга: R( C(1, 2), R(3, 4) )
     rng(5, 9)       — то же, что 5, 6, 7, 8, 9
   Верхний уровень раздела — список блоков сверху вниз. Размеры считаются сами,
   края всегда ровные. Не знаешь, какой номер где стоит? Открой сайт с ?nums:
   saidamusaeva.space/?nums#/agency — на каждой картинке появится её номер.

   ext  — расширение файлов ('jpg', 'png', 'webp')
   mode — 'uniform': все блоки одной высоты, короткие стоят по центру (для лент сторис).
          Без mode: каждый блок растягивается на всю ширину.
   Раздел «Selected highlights» виден только на вкладке All work. */
const R = (...c) => ({ t: 'row', c });
const C = (...c) => ({ t: 'col', c });
const rng = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

const agencyTabs = [
  { id: 'all',         label: 'All work' },
  { id: 'social',      label: 'Social Media Design' },
  { id: 'banners',     label: 'Banners' },
  { id: 'storyboards', label: 'Storyboards' }
];

const agencySections = [
  { id: 'highlights', num: '01', title: 'Selected highlights', note: '', prefix: 'highlights', ext: 'jpg',
    layout: [ R(1, 2), R(...rng(3, 6)), R(...rng(7, 10)) ] },

  { id: 'social', num: '02', title: 'Social Media Design', note: 'Posts / stories / carousels', prefix: 'social', ext: 'jpg',
    layout: [
      // слева колонка из трёх, справа ряды
      R( C(1, 2, 14), C( R(...rng(3, 6)), R(...rng(7, 10)), R(11, 12, 13), R(15, 16, 17) ) ),
      R(...rng(18, 23)),
      R(...rng(24, 27)),
      R(...rng(28, 32)),
      R(...rng(33, 38))
    ] },

  { id: 'banners', num: '03', title: 'Advertising & Banners', note: 'Promotional Visuals / Banners', prefix: 'banners', ext: 'jpg',
    layout: [
      R(1, 2),
      // слева блок 3×2, справа одна большая
      R( C( R(3, 4, 5), R(7, 8, 9) ), 6 )
    ] },

  { id: 'storyboards', num: '04', title: 'Storyboards & Motion Assets', note: 'Static Frames / Animation Assets', prefix: 'storyboards', ext: 'jpg',
    mode: 'uniform', layout: rng(1, 7) }
];

const palette = ['#52284B', '#2A2438', '#C2BFC4', '#8C5D82', '#FCBF49'];
const groupHead = d => `
  <div class="group__head">
    <div><h3>${d.title}</h3><p>${d.text}</p></div>
    <span class="card__meta">${d.years}</span>
  </div>`;

// если файла обложки нет — убираем <img> и возвращаем цветную заглушку
const cover = src =>
  `<img src="${src}" alt="" loading="lazy" onerror="this.parentElement.classList.remove('has-img'); this.remove()">`;

function renderProjects() {
  document.getElementById('featured').innerHTML = groupHead(featured) + `
    <a class="card card--feature" href="#/agency" style="--c:${featured.color}">
      <div class="card__media has-img">
        ${cover(featured.image)}
        <span class="card__cta">Open collection →</span>
      </div>
    </a>`;

  document.getElementById('independentHead').innerHTML = groupHead(independent);
  document.getElementById('works').innerHTML = works.map((w, i) => {
    const img = w.image || `img/work-${String(i + 1).padStart(2, '0')}.jpg`;
    return `
    <a class="card" href="${w.url}" target="_blank" rel="noopener" style="--c:${palette[i % palette.length]}">
      <div class="card__media has-img">${cover(img)}</div>
      <div class="card__body">
        <h3>${w.title}</h3>
        <span class="card__meta">${w.tag} ↗</span>
      </div>
    </a>`;
  }).join('');
}

function tileHtml(sec, n, placeholderRatio) {
  const num = String(n).padStart(2, '0');
  return `<button class="tile" data-n="${n}" data-r="${placeholderRatio}" style="--c:${palette[(n - 1) % palette.length]}" aria-label="${sec.title} ${num}">
    <img src="img/agency/${sec.prefix}-${num}.${sec.ext}" alt="" loading="lazy" decoding="async" onload="tileLoaded(this)" onerror="this.remove()">
  </button>`;
}

// картинка загрузилась: запоминаем её настоящую пропорцию и пересчитываем раскладку
function tileLoaded(img) {
  const tile = img.parentElement;
  tile.dataset.r = img.naturalWidth / img.naturalHeight;
  tile.classList.add('is-loaded');
  queueLayout();
}

// блок раскладки -> HTML (число = картинка, R = ряд, C = колонка)
function nodeHtml(sec, node, ph) {
  if (typeof node === 'number') return tileHtml(sec, node, ph);
  return `<div class="lay lay--${node.t}">${node.c.map(k => nodeHtml(sec, k, ph)).join('')}</div>`;
}

function renderAgency() {
  document.getElementById('agencyHead').innerHTML =
    `<div><h2>${featured.title}</h2><p>${featured.text}</p></div><span class="card__meta">${featured.years}</span>`;

  document.getElementById('agencyTabs').innerHTML = agencyTabs.map((t, i) =>
    `<button class="tab${i === 0 ? ' is-active' : ''}" role="tab" data-tab="${t.id}">${t.label}</button>`).join('');

  document.getElementById('agencySections').innerHTML = agencySections.map(s => {
    const ph = s.mode === 'uniform' ? 3.4 : 0.8; // пока картинка не загрузилась
    const bands = s.layout.map(b => `<div class="band">${nodeHtml(s, b, ph)}</div>`).join('');
    return `
    <section class="sec" data-sec="${s.id}" data-mode="${s.mode || 'fit'}">
      <header class="sec__head">
        <h3>${s.num} / ${s.title}</h3>
        ${s.note ? `<span class="sec__note">${s.note}</span>` : ''}
      </header>
      <div class="gallery">${bands}</div>
    </section>`;
  }).join('');
}

if (/[?&]nums/.test(location.search)) document.body.classList.add('show-nums');

/* ---------- Раскладка галереи ----------
   Работает как auto-layout в Figma, но без обрезки: у каждого блока ширина — линейная
   функция высоты (w = a·h + b). Ряд складывает a и b детей, колонка считает по-своему;
   отсюда находим высоту, при которой края сходятся ровно, и раздаём размеры вниз.
   fit      — каждый верхний блок растягивается на всю ширину
   uniform  — у всех блоков одна высота, короткие стоят по центру
   На узком экране блоки раскладываются просто по 2 картинки в ряд. */
const sum = arr => arr.reduce((x, y) => x + y, 0);
const fl = x => Math.floor(x * 100) / 100;

function measureNode(el, g) {
  let m;
  if (el.classList.contains('tile')) {
    m = { a: parseFloat(el.dataset.r) || 1, b: 0 };
  } else {
    const kids = [...el.children];
    kids.forEach(k => measureNode(k, g));
    const n = kids.length;
    if (el.classList.contains('lay--row')) {
      m = { a: sum(kids.map(k => k._m.a)), b: sum(kids.map(k => k._m.b)) + (n - 1) * g };
    } else {
      const a = 1 / sum(kids.map(k => 1 / k._m.a));
      m = { a, b: a * (sum(kids.map(k => k._m.b / k._m.a)) - (n - 1) * g) };
    }
  }
  el._m = m;
  return m;
}

function placeNode(el, w, h) {
  el.style.width = fl(w) + 'px';
  el.style.height = fl(h) + 'px';
  if (el.classList.contains('tile')) return;
  const kids = [...el.children];
  if (el.classList.contains('lay--row')) kids.forEach(k => placeNode(k, k._m.a * h + k._m.b, h));
  else kids.forEach(k => placeNode(k, w, (w - k._m.b) / k._m.a));
}

function layoutSection(sec) {
  const gallery = sec.querySelector('.gallery');
  const W = gallery.clientWidth;
  if (!W) return; // раздел скрыт
  const g = parseFloat(getComputedStyle(gallery).rowGap) || 10;
  const flat = W < 760;
  sec.classList.toggle('is-flat', flat);

  if (flat) {
    // телефон: все картинки по порядку, по 2 в ряд (ленты сторис — по 1)
    const tiles = [...gallery.querySelectorAll('.tile')];
    const size = sec.dataset.mode === 'uniform' ? 1 : 2;
    for (let i = 0; i < tiles.length; i += size) {
      const chunk = tiles.slice(i, i + size);
      const rs = chunk.map(t => parseFloat(t.dataset.r) || 1);
      const h = (W - (chunk.length - 1) * g - 1) / sum(rs);
      chunk.forEach((t, k) => placeNode(t, rs[k] * h, h));
    }
    return;
  }

  const bands = [...gallery.querySelectorAll(':scope > .band')].map(b => {
    const node = b.firstElementChild;
    return { node, m: measureNode(node, g) };
  });
  const heights = bands.map(({ m }) => (W - m.b - 1) / m.a);
  const common = sec.dataset.mode === 'uniform' ? Math.min(...heights) : 0;
  bands.forEach(({ node, m }, i) => {
    const h = common || heights[i];
    placeNode(node, m.a * h + m.b, h);
  });
}

function layoutAll() { document.querySelectorAll('.sec:not([hidden])').forEach(layoutSection); }

let layoutQueued = false;
function queueLayout() {
  if (layoutQueued) return;
  layoutQueued = true;
  requestAnimationFrame(() => { layoutQueued = false; layoutAll(); });
}

// пересчитываем, когда страница появляется на экране или меняется ширина окна
(function watchGalleryWidth() {
  const box = document.getElementById('agencySections');
  if (!box || !('ResizeObserver' in window)) { addEventListener('resize', queueLayout); return; }
  let lastW = 0;
  new ResizeObserver(entries => {
    const w = Math.round(entries[0].contentRect.width);
    if (w !== lastW) { lastW = w; queueLayout(); }
  }).observe(box);
})();

// вкладки: «All work» показывает всё, остальные — только свой раздел
document.addEventListener('click', e => {
  const tab = e.target.closest('.tab');
  if (!tab) return;
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('is-active', t === tab));
  document.querySelectorAll('.sec').forEach(sec => {
    sec.hidden = !(tab.dataset.tab === 'all' || sec.dataset.sec === tab.dataset.tab);
  });
  queueLayout();
});

/* ---------- Просмотр картинки крупно ----------
   Картинка вписывается в экран (маленькие тоже увеличиваются).
   Клик по картинке — приблизить, ещё клик — вернуть. В приближении
   двигай мышь (или палец), чтобы рассматривать нужное место. */
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('.lightbox__img');
let lightboxList = [];
let lightboxIndex = 0;
let zoomed = false;
let baseRect = null;

function fitLightbox() {
  const nw = lightboxImg.naturalWidth, nh = lightboxImg.naturalHeight;
  if (!nw) return;
  const s = Math.min(innerWidth * 0.9 / nw, innerHeight * 0.84 / nh);
  lightboxImg.style.width = Math.round(nw * s) + 'px';
  lightboxImg.style.height = Math.round(nh * s) + 'px';
  lightboxImg.style.visibility = 'visible';
}
function resetZoom() {
  zoomed = false;
  lightboxImg.classList.remove('is-zoomed');
  lightboxImg.style.transformOrigin = '';
}
function setOrigin(e) {
  if (!baseRect) return;
  const x = Math.min(1, Math.max(0, (e.clientX - baseRect.left) / baseRect.width)) * 100;
  const y = Math.min(1, Math.max(0, (e.clientY - baseRect.top) / baseRect.height)) * 100;
  lightboxImg.style.transformOrigin = `${x}% ${y}%`;
}
function showInLightbox(img) {
  resetZoom();
  lightboxImg.style.visibility = 'hidden';
  lightboxImg.style.width = lightboxImg.style.height = '';
  lightboxImg.src = img.currentSrc || img.src;
}
function openLightbox(tile) {
  lightboxList = [...document.querySelectorAll('.sec:not([hidden]) .tile.is-loaded img')];
  lightboxIndex = lightboxList.indexOf(tile.querySelector('img'));
  if (lightboxIndex < 0) return;
  showInLightbox(lightboxList[lightboxIndex]);
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
  if (lenis) lenis.stop();
}
function closeLightbox() {
  lightbox.hidden = true;
  resetZoom();
  document.body.style.overflow = '';
  if (lenis) lenis.start();
}
function stepLightbox(d) {
  lightboxIndex = (lightboxIndex + d + lightboxList.length) % lightboxList.length;
  showInLightbox(lightboxList[lightboxIndex]);
}

lightboxImg.addEventListener('load', fitLightbox);
addEventListener('resize', () => { if (!lightbox.hidden) fitLightbox(); });
lightboxImg.addEventListener('click', e => {
  if (zoomed) { resetZoom(); return; }
  baseRect = lightboxImg.getBoundingClientRect();
  setOrigin(e);
  zoomed = true;
  lightboxImg.classList.add('is-zoomed');
});
lightboxImg.addEventListener('pointermove', e => { if (zoomed) setOrigin(e); });

document.addEventListener('click', e => {
  const tile = e.target.closest('.tile.is-loaded');
  if (tile) { openLightbox(tile); return; }
  if (lightbox.hidden) return;
  if (e.target.closest('.lightbox__prev')) stepLightbox(-1);
  else if (e.target.closest('.lightbox__next')) stepLightbox(1);
  else if (e.target !== lightboxImg) closeLightbox();
});
document.addEventListener('keydown', e => {
  if (lightbox.hidden) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') stepLightbox(-1);
  if (e.key === 'ArrowRight') stepLightbox(1);
});

/* ---------- 2. Роутинг по #hash + анимация перехода ---------- */
const titles = { home: 'Home', projects: 'Projects', agency: 'Agency Work', contacts: 'Contacts' };
const navParent = { agency: 'projects' }; // страница внутри раздела подсвечивает его вкладку в меню
const views  = [...document.querySelectorAll('.view')];
const links  = [...document.querySelectorAll('.menu a')];
const pill   = document.querySelector('.menu__pill');
const wipe   = document.querySelector('.wipe');
const label  = document.querySelector('.wipe__label');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const canHover = matchMedia('(hover: hover) and (pointer: fine)').matches;

let current = null;
let busy = false;
let lenis = null; // создаётся в initLenis(), используется при смене страниц

const routeFromHash = () => {
  const name = location.hash.replace('#/', '');
  return titles[name] ? name : 'home';
};

function movePill() {
  const active = links.find(l => l.getAttribute('href') === '#/' + (navParent[current] || current));
  links.forEach(l => l.classList.toggle('is-active', l === active));
  pill.style.width = active.offsetWidth + 'px';
  pill.style.transform = `translateX(${active.offsetLeft}px)`;
}

function show(name) {
  current = name;
  views.forEach(v => v.classList.toggle('is-active', v.dataset.view === name));
  document.title = `${titles[name]} | Saida Musaeva`;
  if (lenis) lenis.scrollTo(0, { immediate: true }); else window.scrollTo(0, 0);
  movePill();
  initReveal(); // на новой странице могут появиться свои .reveal-элементы
}

async function go(name) {
  if (name === current || busy) return;

  // первый заход или reduced-motion: без шторки
  if (current === null || reduce) { show(name); return; }

  busy = true;
  label.textContent = titles[name];
  const opts = { duration: 600, easing: 'cubic-bezier(.7,0,.2,1)', fill: 'forwards' };

  await wipe.animate([{ transform: 'translateY(100%)' }, { transform: 'translateY(0)' }], opts).finished;
  show(name);
  await wipe.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-100%)' }], { ...opts, delay: 150 }).finished;

  wipe.getAnimations().forEach(a => a.cancel());
  busy = false;
  if (routeFromHash() !== current) go(routeFromHash()); // если успели кликнуть во время анимации
}

/* ---------- 3. Плавный скролл (Lenis) ---------- */
function initLenis() {
  if (reduce || typeof Lenis === 'undefined') return;
  lenis = new Lenis({ duration: 1.1, smoothWheel: true });
  function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);
}

/* ---------- 4. Магнетизм: бейдж и кнопка «Available for work» тянутся к курсору ---------- */
function initMagnetic() {
  if (reduce || !canHover) return;
  document.querySelectorAll('.badge, .nav__cta').forEach(el => {
    let tx = 0, ty = 0, bx = 0, by = 0;
    const strength = el.classList.contains('badge') ? 0.45 : 0.3;

    el.addEventListener('mouseenter', () => el.classList.add('is-hover'));
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      tx = (e.clientX - r.left - r.width / 2) * strength;
      ty = (e.clientY - r.top - r.height / 2) * strength;
    });
    el.addEventListener('mouseleave', () => { tx = 0; ty = 0; el.classList.remove('is-hover'); });

    (function raf() {
      bx += (tx - bx) * 0.2; by += (ty - by) * 0.2;
      el.style.transform = `translate(${bx.toFixed(1)}px, ${by.toFixed(1)}px)`;
      requestAnimationFrame(raf);
    })();
  });
}

/* ---------- 5. 3D-наклон карточек проектов ---------- */
function initTilt() {
  if (reduce || !canHover) return;
  document.addEventListener('mousemove', e => {
    const card = e.target.closest('.card');
    if (!card) return;
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    card.style.transition = 'none';
    card.style.transform = `perspective(900px) rotateX(${(-py * 6).toFixed(2)}deg) rotateY(${(px * 8).toFixed(2)}deg)`;
  });
  document.addEventListener('mouseout', e => {
    const card = e.target.closest('.card');
    if (!card) return;
    const related = e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest('.card');
    if (related === card) return;
    card.style.transition = 'transform .5s cubic-bezier(.2,.7,.1,1)';
    card.style.transform = '';
  });
}

/* ---------- 6. Бегущую строку можно тащить рукой ---------- */
function initMarquee() {
  const wrapEl = document.querySelector('.marquee');
  const track = document.querySelector('.marquee__track');
  if (!wrapEl || !track) return;

  let pos = 0;
  let dragging = false;
  let lastX = 0;
  let velocity = 0;
  const autoSpeed = reduce ? 0 : 0.6;

  (function raf() {
    if (!dragging) { pos -= autoSpeed + velocity; velocity *= 0.94; }
    const wrap = track.scrollWidth / 2;
    if (wrap > 0) {
      if (pos <= -wrap) pos += wrap;
      if (pos > 0) pos -= wrap;
    }
    track.style.transform = `translateX(${pos}px)`;
    requestAnimationFrame(raf);
  })();

  wrapEl.addEventListener('pointerdown', e => {
    dragging = true; lastX = e.clientX;
    wrapEl.classList.add('is-dragging');
    wrapEl.setPointerCapture(e.pointerId);
  });
  wrapEl.addEventListener('pointermove', e => {
    if (!dragging) return;
    const dx = e.clientX - lastX; lastX = e.clientX;
    pos += dx; velocity = -dx * 0.4;
  });
  ['pointerup', 'pointercancel', 'pointerleave'].forEach(evt =>
    wrapEl.addEventListener(evt, () => { dragging = false; wrapEl.classList.remove('is-dragging'); })
  );
}

/* ---------- 7. Появление «Обо мне» и карточек со статистикой при скролле ---------- */
let revealObserver = null;
function initReveal() {
  if (!('IntersectionObserver' in window)) return;
  if (revealObserver) revealObserver.disconnect();
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.reveal, .about__stats').forEach(el => revealObserver.observe(el));
}

/* ---------- 8. Старт ---------- */
renderProjects();
renderAgency();
pill.style.transition = 'none';          // чтобы плашка не «выезжала» при загрузке
show(routeFromHash());
requestAnimationFrame(() => (pill.style.transition = ''));

initLenis();
initMagnetic();
initTilt();
initMarquee();

window.addEventListener('hashchange', () => go(routeFromHash()));
window.addEventListener('resize', movePill);
document.fonts.ready.then(movePill);