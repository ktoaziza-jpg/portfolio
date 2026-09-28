/* ---------- 1. Проекты: наполняй здесь ----------
   title  — название
   tag    — тип проекта
   year   — год
   color  — цвет карточки
   text   — не выводится пока, пригодится для страницы кейса
   image  — путь к картинке, например 'img/finly.jpg' ('' = цветная заглушка) */
const projects = [
  { title: 'Project 1',    tag: 'Design', year: '2026', color: '#2B3BFF', image: '' },
  { title: 'Project 2',         tag: 'Dashboard',  year: '2025', color: '#FF5CA8', image: '' },
  { title: 'Project 3',    tag: 'Web',        year: '2025', color: '#5EE6B0', image: '' },
  { title: 'Project 4',          tag: 'Mobile app', year: '2024', color: '#8B7CF6', image: '' },
  { title: 'Project 5',   tag: 'Web',        year: '2024', color: '#FFD84A', image: '' }
];

function renderProjects() {
  document.getElementById('projectGrid').innerHTML = projects.map(p => `
    <article class="card" style="--c:${p.color}">
      <div class="card__media ${p.image ? 'has-img' : ''}">
        ${p.image ? `<img src="${p.image}" alt="${p.title}" loading="lazy">` : ''}
      </div>
      <div class="card__body">
        <h3>${p.title}</h3>
        <span class="card__meta">${p.tag} / ${p.year}</span>
      </div>
    </article>`).join('');
}

/* ---------- 2. Роутинг по #hash + анимация перехода ---------- */
const titles = { home: 'Home', projects: 'Projects', contacts: 'Contacts' };
const views  = [...document.querySelectorAll('.view')];
const links  = [...document.querySelectorAll('.menu a')];
const pill   = document.querySelector('.menu__pill');
const wipe   = document.querySelector('.wipe');
const label  = document.querySelector('.wipe__label');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

let current = null;
let busy = false;

const routeFromHash = () => {
  const name = location.hash.replace('#/', '');
  return titles[name] ? name : 'home';
};

function movePill() {
  const active = links.find(l => l.getAttribute('href') === '#/' + current);
  links.forEach(l => l.classList.toggle('is-active', l === active));
  pill.style.width = active.offsetWidth + 'px';
  pill.style.transform = `translateX(${active.offsetLeft}px)`;
}

function show(name) {
  current = name;
  views.forEach(v => v.classList.toggle('is-active', v.dataset.view === name));
  document.title = `${titles[name]} | Saida Musaeva`;
  window.scrollTo(0, 0);
  movePill();
}

async function go(name) {
  if (name === current || busy) return;

  // первый заход или reduced-motion: без шторки
  if (current === null || reduce) { show(name); return; }

  busy = true;
  label.textContent = titles[name];
  wipe.dataset.page = name;   // цвет шторки зависит от страницы
  const opts = { duration: 600, easing: 'cubic-bezier(.7,0,.2,1)', fill: 'forwards' };

  await wipe.animate([{ transform: 'translateY(100%)' }, { transform: 'translateY(0)' }], opts).finished;
  show(name);
  await wipe.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-100%)' }], { ...opts, delay: 150 }).finished;

  wipe.getAnimations().forEach(a => a.cancel());
  busy = false;
  if (routeFromHash() !== current) go(routeFromHash()); // если успели кликнуть во время анимации
}

/* ---------- 3. Старт ---------- */
renderProjects();
pill.style.transition = 'none';          // чтобы плашка не «выезжала» при загрузке
show(routeFromHash());
requestAnimationFrame(() => (pill.style.transition = ''));

window.addEventListener('hashchange', () => go(routeFromHash()));
window.addEventListener('resize', movePill);
document.fonts.ready.then(movePill);