/* ═══════════════════════════════════════════════════════════════
   animations.js  —  Intersection Observer (scroll reveal),
                      animación de skill bars y debounce util.
   Portafolio: María Alejandra García Merchán
═══════════════════════════════════════════════════════════════ */

/* ── Utilidad: debounce ──────────────────────────────────── */
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

/* ── Intersection Observer para scroll reveal ────────────── */
let revealObserver = null;

function initScrollReveal() {
  /* Desconectar observer previo si existe */
  if (revealObserver) {
    revealObserver.disconnect();
  }

  const revealEls = document.querySelectorAll(
    '.reveal-up, .reveal-left, .reveal-right, .reveal-fade'
  );

  const options = {
    root: null,
    rootMargin: '0px 0px -60px 0px', /* dispara un poco antes del borde inferior */
    threshold: 0.1,
  };

  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        /* Una vez visible ya no necesitamos observarla */
        revealObserver.unobserve(entry.target);
      }
    });
  }, options);

  revealEls.forEach(el => revealObserver.observe(el));
}

/* ── Intersection Observer para skill bars ───────────────── */
function initSkillBars() {
  const fills = document.querySelectorAll('.skill-fill[data-width]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill  = entry.target;
        const width = fill.dataset.width || '0';

        /* Pequeño delay visual escalonado según índice */
        const siblings = Array.from(
          fill.closest('.skill-list')?.querySelectorAll('.skill-fill') || []
        );
        const idx = siblings.indexOf(fill);
        const delay = idx * 100;

        setTimeout(() => {
          fill.style.width = `${width}%`;
        }, delay);

        observer.unobserve(fill);
      }
    });
  }, {
    threshold: 0.4,
  });

  fills.forEach(fill => observer.observe(fill));
}

/* ── Animación de contadores (no usada visualmente pero útil)
      Se mantiene por si se quiere agregar estadísticas         */
function animateCounter(el, target, duration = 1200) {
  const start     = performance.now();
  const startVal  = 0;

  function update(timestamp) {
    const elapsed  = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    /* Ease out cubic */
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(startVal + (target - startVal) * eased);
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

/* ── Animación de sección hero: degradado extra en scroll ── */
function initHeroParallax() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const onScroll = debounce(() => {
    const scrolled = window.scrollY;
    const opacity  = Math.max(0, 1 - scrolled / 600);
    const heroContent = hero.querySelector('.hero-content');
    if (heroContent) {
      heroContent.style.opacity = opacity;
      heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
    }
  }, 8); /* muy bajo delay para que sea fluido */

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ── Inicialización ──────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initSkillBars();
  initHeroParallax();
});

/* Exponer initScrollReveal para que projects.js pueda
   llamarla al renderizar nuevas cards                       */
window.initScrollReveal = initScrollReveal;
