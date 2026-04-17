/* ═══════════════════════════════════════════════════════════════
   main.js  —  Lógica principal del portafolio
   Incluye: tema, cursor, partículas, typing, navbar, menú
            móvil, barra de scroll, volver arriba, formulario.
   Portafolio: María Alejandra García Merchán
═══════════════════════════════════════════════════════════════ */

/* ════════════════════════════════════════════════════════════
   1. TEMA CLARO / OSCURO
════════════════════════════════════════════════════════════ */
(function initTheme() {
  const STORAGE_KEY = 'mg-portfolio-theme';
  const html        = document.documentElement;
  const btn         = document.getElementById('themeToggle');

  /* Leer preferencia guardada o usar 'dark' por defecto */
  const saved = localStorage.getItem(STORAGE_KEY) || 'dark';
  html.setAttribute('data-theme', saved);

  btn?.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem(STORAGE_KEY, next);
  });
})();


/* ════════════════════════════════════════════════════════════
   2. CURSOR PERSONALIZADO
════════════════════════════════════════════════════════════ */
function initCustomCursor() {
  /* Solo activo en dispositivos con puntero fino (desktop) */
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || !follower) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  /* Actualizar posición del cursor principal inmediatamente */
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = `${mouseX}px`;
    cursor.style.top  = `${mouseY}px`;
  });

  /* Seguidor con lag via requestAnimationFrame */
  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = `${followerX}px`;
    follower.style.top  = `${followerY}px`;
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  /* Efecto hover al pasar sobre links y botones */
  const interactables = 'a, button, .filter-btn, .project-card, .contact-card, .soft-skill';

  document.addEventListener('mouseover', e => {
    if (e.target.closest(interactables)) {
      document.body.classList.add('cursor-hover');
    }
  });

  document.addEventListener('mouseout', e => {
    if (e.target.closest(interactables)) {
      document.body.classList.remove('cursor-hover');
    }
  });

  /* Ocultar al salir de la ventana */
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity   = '0';
    follower.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity   = '1';
    follower.style.opacity = '0.7';
  });
}


/* ════════════════════════════════════════════════════════════
   3. BARRA DE PROGRESO DE SCROLL
════════════════════════════════════════════════════════════ */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgressBar');
  if (!bar) return;

  function update() {
    const scrollTop  = window.scrollY;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    const pct        = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width  = `${pct}%`;
    bar.setAttribute('aria-valuenow', Math.round(pct));
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
}


/* ════════════════════════════════════════════════════════════
   4. NAVBAR: scroll + sección activa
════════════════════════════════════════════════════════════ */
function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const navLinks  = document.querySelectorAll('.nav-link[data-section]');
  const sections  = document.querySelectorAll('section[id]');

  if (!navbar) return;

  /* Añadir/quitar clase .scrolled */
  function handleScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    /* Detectar sección activa */
    let current = 'home';
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      const isActive = link.dataset.section === current;
      link.classList.toggle('active', isActive);
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}


/* ════════════════════════════════════════════════════════════
   5. MENÚ HAMBURGUESA (MÓVIL)
════════════════════════════════════════════════════════════ */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  const overlay   = document.getElementById('navOverlay');

  if (!hamburger || !navLinks || !overlay) return;

  function open() {
    navLinks.classList.add('open');
    overlay.classList.add('visible');
    overlay.removeAttribute('aria-hidden');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    navLinks.classList.remove('open');
    overlay.classList.remove('visible');
    overlay.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    isOpen ? close() : open();
  });

  overlay.addEventListener('click', close);

  /* Cerrar al seleccionar un link */
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', close);
  });

  /* Cerrar con Escape */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') close();
  });
}


/* ════════════════════════════════════════════════════════════
   6. EFECTO TYPING / ROLES ROTATIVOS
════════════════════════════════════════════════════════════ */
function initTypingEffect() {
  const target = document.getElementById('typingText');
  if (!target) return;

  const roles = [
    'Desarrolladora Full Stack Junior',
    'Node.js Developer',
    'Backend Enthusiast',
    'Apasionada por la Tecnología',
  ];

  let roleIndex  = 0;
  let charIndex  = 0;
  let isDeleting = false;

  /* Velocidades en ms */
  const TYPE_SPEED   = 65;
  const DELETE_SPEED = 35;
  const PAUSE_END    = 1800; /* pausa al terminar de escribir */
  const PAUSE_START  = 400;  /* pausa antes de escribir siguiente */

  function type() {
    const current = roles[roleIndex];

    if (!isDeleting) {
      /* Escribir */
      target.textContent = current.slice(0, charIndex + 1);
      charIndex++;

      if (charIndex === current.length) {
        /* Terminar de escribir → esperar y borrar */
        isDeleting = true;
        setTimeout(type, PAUSE_END);
        return;
      }
      setTimeout(type, TYPE_SPEED);
    } else {
      /* Borrar */
      target.textContent = current.slice(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        /* Terminar de borrar → siguiente rol */
        isDeleting = false;
        roleIndex  = (roleIndex + 1) % roles.length;
        setTimeout(type, PAUSE_START);
        return;
      }
      setTimeout(type, DELETE_SPEED);
    }
  }

  /* Empezar con un pequeño retraso */
  setTimeout(type, 800);
}


/* ════════════════════════════════════════════════════════════
   7. BOTÓN VOLVER ARRIBA
════════════════════════════════════════════════════════════ */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.removeAttribute('hidden');
    } else {
      btn.setAttribute('hidden', '');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


/* ════════════════════════════════════════════════════════════
   8. FORMULARIO DE CONTACTO (validación + feedback)
════════════════════════════════════════════════════════════ */
function initContactForm() {
  const form       = document.getElementById('contactForm');
  const successBox = document.getElementById('formSuccess');
  const resetBtn   = document.getElementById('resetForm');

  if (!form) return;

  /* Validar campo individual */
  function validateField(input) {
    const id    = input.id;
    const val   = input.value.trim();
    const errEl = document.getElementById(
      id === 'inputName'    ? 'nameError'    :
      id === 'inputEmail'   ? 'emailError'   :
      id === 'inputMessage' ? 'messageError' : ''
    );

    let msg = '';

    if (!val) {
      msg = 'Este campo es obligatorio.';
    } else if (id === 'inputEmail') {
      /* Validación de email básica */
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(val)) msg = 'Ingresa un email válido.';
    } else if (id === 'inputName' && val.length < 2) {
      msg = 'El nombre debe tener al menos 2 caracteres.';
    } else if (id === 'inputMessage' && val.length < 10) {
      msg = 'El mensaje debe tener al menos 10 caracteres.';
    }

    if (errEl) errEl.textContent = msg;
    input.classList.toggle('error', !!msg);
    return !msg;
  }

  /* Validar en tiempo real al salir del campo */
  form.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) validateField(input);
    });
  });

  /* Submit */
  form.addEventListener('submit', e => {
    e.preventDefault();

    const inputs  = Array.from(form.querySelectorAll('input, textarea'));
    const allOk   = inputs.every(inp => validateField(inp));

    if (!allOk) return;

    /* Simular envío (sin backend real) */
    const btn = document.getElementById('submitBtn');
    btn.disabled = true;
    btn.innerHTML = '<span>Enviando…</span>';

    setTimeout(() => {
      form.setAttribute('hidden', '');
      if (successBox) {
        successBox.removeAttribute('hidden');
      }
    }, 900);
  });

  /* Botón "Enviar otro mensaje" */
  resetBtn?.addEventListener('click', () => {
    form.reset();
    form.querySelectorAll('input, textarea').forEach(el => el.classList.remove('error'));
    form.querySelectorAll('.form-error').forEach(el => el.textContent = '');

    const btn = document.getElementById('submitBtn');
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `<span>Enviar mensaje</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
          <line x1="22" y1="2" x2="11" y2="13"/>
          <polygon points="22 2 15 22 11 13 2 9 22 2"/>
        </svg>`;
    }

    if (successBox) successBox.setAttribute('hidden', '');
    form.removeAttribute('hidden');
  });
}


/* ════════════════════════════════════════════════════════════
   9. SISTEMA DE PARTÍCULAS (Canvas)
════════════════════════════════════════════════════════════ */
function initParticles() {
  const canvas = document.getElementById('particlesCanvas');
  if (!canvas) return;

  /* Reducir carga en móviles */
  const isMobile = window.innerWidth < 768;
  if (isMobile && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ctx = canvas.getContext('2d');

  /* ── Configuración ── */
  const CONFIG = {
    count:          isMobile ? 35 : 60,
    connectRadius:  130,
    speedRange:     0.35,
    minRadius:      1.2,
    maxRadius:      2.8,
    colors:         ['#6c63ff', '#00d9b8', '#9b94ff', '#6ffff0'],
  };

  let W, H, particles;
  let animId;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  /* Crear partícula */
  function Particle() {
    this.x  = Math.random() * W;
    this.y  = Math.random() * H;
    this.vx = (Math.random() - 0.5) * CONFIG.speedRange;
    this.vy = (Math.random() - 0.5) * CONFIG.speedRange;
    this.r  = CONFIG.minRadius + Math.random() * (CONFIG.maxRadius - CONFIG.minRadius);
    this.color = CONFIG.colors[Math.floor(Math.random() * CONFIG.colors.length)];
    this.alpha = 0.4 + Math.random() * 0.5;
  }

  Particle.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    /* Rebotar en bordes */
    if (this.x < 0 || this.x > W) this.vx *= -1;
    if (this.y < 0 || this.y > H) this.vy *= -1;
  };

  Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.alpha;
    ctx.fill();
    ctx.globalAlpha = 1;
  };

  /* Dibujar líneas de conexión */
  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONFIG.connectRadius) {
          const opacity = (1 - dist / CONFIG.connectRadius) * 0.25;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = particles[i].color;
          ctx.lineWidth   = 0.8;
          ctx.globalAlpha = opacity;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }
  }

  function init() {
    resize();
    particles = Array.from({ length: CONFIG.count }, () => new Particle());
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    drawConnections();
    particles.forEach(p => { p.update(); p.draw(); });
    animId = requestAnimationFrame(loop);
  }

  /* Pausar cuando la pestaña no está visible (performance) */
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animId);
    } else {
      loop();
    }
  });

  /* Resize con debounce */
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resize();
      particles = Array.from({ length: CONFIG.count }, () => new Particle());
    }, 200);
  });

  init();
  loop();
}


/* ════════════════════════════════════════════════════════════
   10. SMOOTH SCROLL para links de anclaje internos
════════════════════════════════════════════════════════════ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const id  = anchor.getAttribute('href');
      const el  = document.querySelector(id);
      if (!el) return;

      e.preventDefault();
      const navH   = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-h')) || 70;
      const top    = el.getBoundingClientRect().top + window.scrollY - navH;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}


/* ════════════════════════════════════════════════════════════
   ARRANQUE PRINCIPAL
════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initScrollProgress();
  initNavbar();
  initMobileMenu();
  initTypingEffect();
  initBackToTop();
  initContactForm();
  initParticles();
  initSmoothScroll();
});
