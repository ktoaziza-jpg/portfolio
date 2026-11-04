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
   Картинки кладём в папку img/agency/ с именами  prefix-01.jpg, prefix-02.jpg ...
   Например: img/agency/social-01.jpg
   count — сколько картинок в разделе (поставь своё число),
   ext   — расширение файлов ('jpg', 'png', 'webp').
   Раздел «Selected highlights» виден только на вкладке All work. */
const agencyTabs = [
  { id: 'all',         label: 'All work' },
  { id: 'social',      label: 'Social Media Design' },
  { id: 'banners',     label: 'Banners' },
  { id: 'storyboards', label: 'Storyboards' }
];

const agencySections = [
  { id: 'highlights',  num: '01', title: 'Selected highlights',          note: '',                              prefix: 'highlights',  count: 10, ext: 'jpg' },
  { id: 'social',      num: '02', title: 'Social Media Design',          note: 'Posts / stories / carousels',   prefix: 'social',      count: 24, ext: 'jpg' },
  { id: 'banners',     num: '03', title: 'Advertising & Banners',        note: 'Promotional Visuals / Banners', prefix: 'banners',     count: 9,  ext: 'jpg' },
  { id: 'storyboards', num: '04', title: 'Storyboards & Motion Assets',  note: 'Static Frames / Animation Assets', prefix: 'storyboards', count: 20, ext: 'jpg' }
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

// стартовые пропорции плиток-заглушек; настоящая пропорция берётся из картинки после загрузки
const ratios = [0.8, 1.3, 0.75, 1, 1.6, 0.9];

function renderAgency() {
  document.getElementById('agencyHead').innerHTML =
    `<div><h2>${featured.title}</h2><p>${featured.text}</p></div><span class="card__meta">${featured.years}</span>`;

  document.getElementById('agencyTabs').innerHTML = agencyTabs.map((t, i) =>
    `<button class="tab${i === 0 ? ' is-active' : ''}" role="tab" data-tab="${t.id}">${t.label}</button>`).join('');

  document.getElementById('agencySections').innerHTML = agencySections.map(s => {
    const tiles = Array.from({ length: s.count }, (_, i) => {
      const n = String(i + 1).padStart(2, '0');
      return `<button class="tile" style="--c:${palette[i % palette.length]}; --r:${ratios[i % ratios.length]}" aria-label="${s.title} ${n}">
        <img src="img/agency/${s.prefix}-${n}.${s.ext}" alt="" loading="lazy"
             onload="this.parentElement.style.setProperty('--r', this.naturalWidth / this.naturalHeight); this.parentElement.classList.add('is-loaded')"
             onerror="this.remove()">
      </button>`;
    }).join('');
    return `
    <section class="sec" data-sec="${s.id}">
      <header class="sec__head">
        <h3>${s.num} / ${s.title}</h3>
        ${s.note ? `<span class="sec__note">${s.note}</span>` : ''}
      </header>
      <div class="gallery">${tiles}</div>
    </section>`;
  }).join('');
}

// вкладки: «All work» показывает всё, остальные — только свой раздел
document.addEventListener('click', e => {
  const tab = e.target.closest('.tab');
  if (!tab) return;
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('is-active', t === tab));
  document.querySelectorAll('.sec').forEach(sec => {
    sec.hidden = !(tab.dataset.tab === 'all' || sec.dataset.sec === tab.dataset.tab);
  });
});

/* ---------- Просмотр картинки крупно ---------- */
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('.lightbox__img');
let lightboxList = [];
let lightboxIndex = 0;

function openLightbox(tile) {
  lightboxList = [...document.querySelectorAll('.sec:not([hidden]) .tile.is-loaded img')];
  lightboxIndex = lightboxList.indexOf(tile.querySelector('img'));
  if (lightboxIndex < 0) return;
  lightboxImg.src = lightboxList[lightboxIndex].src;
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
  if (lenis) lenis.stop();
}
function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = '';
  if (lenis) lenis.start();
}
function stepLightbox(d) {
  lightboxIndex = (lightboxIndex + d + lightboxList.length) % lightboxList.length;
  lightboxImg.src = lightboxList[lightboxIndex].src;
}
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