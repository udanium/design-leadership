// Lightweight, dependency-free interactions. Works on GitHub Pages.
document.documentElement.classList.add('js');

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const progress = document.getElementById('read-progress');
let scrollTicking = false;
function updateProgress() {
  const doc = document.documentElement;
  const total = Math.max(1, doc.scrollHeight - doc.clientHeight);
  progress.style.width = `${Math.min(100, (window.scrollY / total) * 100)}%`;
  scrollTicking = false;
}
window.addEventListener('scroll', () => {
  if (!scrollTicking) { window.requestAnimationFrame(updateProgress); scrollTicking = true; }
}, { passive: true });
window.addEventListener('resize', updateProgress, { passive: true });
updateProgress();

// Reveal content as it enters view; leave content immediately visible if motion is reduced.
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !reducedMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }
  }, { rootMargin: '0px 0px -35px 0px', threshold: 0.08 });
  reveals.forEach(el => revealObserver.observe(el));
} else {
  reveals.forEach(el => el.classList.add('visible'));
}

// Compact mobile navigation.
const menuToggle = document.getElementById('menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation menu');
  mobileNav.hidden = true;
}
menuToggle.addEventListener('click', () => {
  const opened = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!opened));
  menuToggle.setAttribute('aria-label', opened ? 'Open navigation menu' : 'Close navigation menu');
  mobileNav.hidden = opened;
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
window.addEventListener('resize', () => { if (window.innerWidth > 760) closeMenu(); }, {passive: true});

// Section-aware desktop navigation.
const navLinks = document.querySelectorAll('.desktop-nav a');
const watchedSections = [...navLinks].map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
if ('IntersectionObserver' in window) {
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
      }
    });
  }, {rootMargin: '-15% 0px -70% 0px', threshold: 0});
  watchedSections.forEach(section => navObserver.observe(section));
}

// Keep case-story content structured, editable, and grounded in the supplied PDF.
const projects = {
  aurora: {
    category: '01 / PRODUCT REDESIGN · AURORA SOLAR',
    title: 'A better way to sell solar.',
    subtitle: 'Sales Mode redesign and the Northstar vision called “Prism” · January–October 2023',
    image: 'assets/aurora-case-collage_page7.webp',
    alt: 'Aurora Solar product research, co-creation workshops, testing, and resulting screen designs',
    challenge: 'Aurora wanted a stronger solar-sales experience: easier navigation and custom narratives that would help sales representatives work with customers.',
    work: [
      'Explored the needs and workflows of solar sales reps.',
      'Used appointment simulations, co-creation sessions, prototype tests, and quantitative surveys.',
      'Developed and refined a Northstar product vision, then designed the Sales Mode experience.'
    ],
    outcomes: ['Adoption moved from below 22% to above 55%', 'Customer churn decreased from 70% to 35%', 'Enabled +75% V2 platform migration OKRs', 'More than $1.1M ARR by year-end']
  },
  automation: {
    category: '02 / CORE PLATFORM · AUTOMATION ANYWHERE',
    title: 'One platform. A clearer path.',
    subtitle: 'Global navigation, platform information architecture, and onboarding · 2019–2020',
    image: 'assets/automation-case-collage_page8.webp',
    alt: 'Automation Anywhere navigation principles, platform maps, onboarding and navigation UI',
    challenge: 'A growing automation platform needed cohesive, workflow-oriented navigation and onboarding to support new customer segments and expanding capabilities.',
    work: [
      'Mapped people, contexts, activities, and the way users moved between them.',
      'Defined global navigation principles and a unified IA: practical language, coherent structure, and daily-task efficiency.',
      'Designed the “Pathfinder” navigation and onboarding direction across the platform.'
    ],
    outcomes: ['22-point NPS improvement per navigation IA', '37% better task completion efficiency', '25% reduction in support tickets', '42% increase in usage by Citizen Developers']
  }
};
const caseDialog = document.getElementById('case-dialog');
const caseDialogContent = document.getElementById('case-dialog-content');
const caseClose = caseDialog.querySelector('.modal-close');
function openProject(key) {
  const project = projects[key];
  if (!project) return;
  caseDialogContent.innerHTML = `
    <p class="eyebrow orange">${project.category}</p>
    <h2>${project.title}</h2>
    <p class="modal-intro">${project.subtitle}</p>
    <img class="modal-hero-image" src="${project.image}" alt="${project.alt}">
    <div class="modal-cols">
      <div><h3>The challenge</h3><p>${project.challenge}</p></div>
      <div><h3>What the work involved</h3><ul>${project.work.map(x=>`<li>${x}</li>`).join('')}</ul></div>
    </div>
    <div class="modal-outcomes"><h3>Reported results</h3><div class="outcomes-list">${project.outcomes.map(x=>`<span>${x}</span>`).join('')}</div></div>
    <p class="modal-disclaimer">Source: Uday Gajendar, Fall 2026 overview. Metrics are reported product/team outcomes and are not claimed as individual attribution.</p>
  `;
  caseDialog.showModal();
  document.body.classList.add('dialog-open');
  caseClose.focus();
}
document.querySelectorAll('[data-case]').forEach(el => el.addEventListener('click', () => openProject(el.dataset.case)));

// An image gallery with category filters, lightbox, and keyboard navigation.
const allTiles = Array.from(document.querySelectorAll('.artifact-tile'));
const filters = document.querySelectorAll('[data-filter]');
const imageDialog = document.getElementById('image-dialog');
const dialogImage = document.getElementById('dialog-image');
const dialogTitle = document.getElementById('dialog-title');
const dialogDescription = document.getElementById('dialog-description');
const dialogCount = document.getElementById('dialog-count');
let currentIndex = 0;
let visibleTiles = [...allTiles];
filters.forEach(btn => btn.addEventListener('click', () => {
  const category = btn.dataset.filter;
  filters.forEach(b => {
    const selected = b === btn;
    b.classList.toggle('active', selected);
    b.setAttribute('aria-pressed', String(selected));
  });
  allTiles.forEach(tile => {
    tile.hidden = category !== 'all' && tile.dataset.category !== category;
  });
  visibleTiles = allTiles.filter(tile => !tile.hidden);
}));
function displayTile(index) {
  if (!visibleTiles.length) return;
  currentIndex = (index + visibleTiles.length) % visibleTiles.length;
  const tile = visibleTiles[currentIndex];
  dialogImage.src = tile.dataset.image;
  dialogImage.alt = tile.querySelector('img').alt;
  dialogTitle.textContent = tile.dataset.title;
  dialogDescription.textContent = tile.dataset.detail;
  dialogCount.textContent = `${String(currentIndex + 1).padStart(2,'0')} / ${String(visibleTiles.length).padStart(2,'0')}`;
}
allTiles.forEach(tile => tile.addEventListener('click', () => {
  displayTile(visibleTiles.indexOf(tile));
  imageDialog.showModal();
  document.body.classList.add('dialog-open');
  imageDialog.querySelector('.modal-close').focus();
}));
document.getElementById('gallery-prev').addEventListener('click', () => displayTile(currentIndex - 1));
document.getElementById('gallery-next').addEventListener('click', () => displayTile(currentIndex + 1));
document.addEventListener('keydown', event => {
  if (!imageDialog.open) return;
  if (event.key === 'ArrowRight') { event.preventDefault(); displayTile(currentIndex + 1); }
  if (event.key === 'ArrowLeft') { event.preventDefault(); displayTile(currentIndex - 1); }
});

for (const dialog of [caseDialog, imageDialog]) {
  dialog.querySelector('.modal-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
}
