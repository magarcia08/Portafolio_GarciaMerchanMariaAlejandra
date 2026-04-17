/* ═══════════════════════════════════════════════════════════════
   projects.js  —  Datos de proyectos, renderizado y filtrado
   Portafolio: María Alejandra García Merchán
═══════════════════════════════════════════════════════════════ */

/* ── Datos de proyectos ──────────────────────────────────── */
const PROJECTS = [
  {
    id: 'talentx',
    emoji: '👥',
    title: 'TalentX',
    subtitle: 'Sistema de Gestión de RRHH',
    period: 'Mar – Abr 2025',
    role: 'Desarrolladora Full Stack',
    category: 'backend',          // categoría principal para filtro
    stack: [
      { label: 'Node.js',      type: 'backend'   },
      { label: 'Express',      type: 'backend'   },
      { label: 'Spring Boot',  type: 'backend'   },
      { label: 'Java 17',      type: 'backend'   },
      { label: 'MySQL',        type: 'backend'   },
      { label: 'Bootstrap',    type: 'frontend'  },
    ],
    description: 'Sistema integral de RRHH con backend dual, autenticación por roles y 5 módulos CRUD completos.',
    bullets: [
      'Backend dual con Node.js/Express y Spring Boot conectados a MySQL 8',
      'Autenticación con roles Admin/Empleado y cifrado bcrypt',
      '5 módulos CRUD: empleados, departamentos, asistencias, nómina, usuarios',
    ],
    github: null,
    demo: null,
  },
  {
    id: 'bibliotrack',
    emoji: '📚',
    title: 'BiblioTrack',
    subtitle: 'Gestor de Biblioteca',
    period: 'Feb – Abr 2025',
    role: 'Desarrolladora',
    category: 'backend',
    stack: [
      { label: 'JavaScript', type: 'frontend'  },
      { label: 'MySQL',      type: 'backend'   },
      { label: 'Bootstrap',  type: 'frontend'  },
    ],
    description: 'Aplicación para gestión bibliotecaria con esquema relacional, API RESTful y CRUD completo.',
    bullets: [
      'Esquema relacional de 6 tablas con migraciones en MySQL',
      'API RESTful para CRUD de libros, usuarios y préstamos',
      'Validaciones robustas de disponibilidad y fechas de devolución',
    ],
    github: null,
    demo: null,
  },
  {
    id: 'hotel',
    emoji: '🏨',
    title: 'Hotel El Rincón del Carmen',
    subtitle: 'Plataforma de Reservas',
    period: '2025',
    role: 'Desarrolladora Frontend',
    category: 'frontend',
    stack: [
      { label: 'HTML/CSS',    type: 'frontend'  },
      { label: 'Bootstrap 5', type: 'frontend'  },
      { label: 'JavaScript',  type: 'frontend'  },
      { label: 'LocalStorage',type: 'frontend'  },
      { label: 'Netlify',     type: 'frontend'  },
    ],
    description: 'Plataforma de reservas hoteleras desplegada en Netlify con autenticación, panel admin y búsqueda dinámica.',
    bullets: [
      'Sistema de reservas con autenticación y roles cliente/admin',
      'Búsqueda dinámica por fechas y huéspedes con validación de disponibilidad',
      'Desplegado en Netlify con panel de administración completo',
    ],
    github: 'https://github.com/magarcia08/Examen_Js_GarciaMariaAleja',
    demo: 'https://regal-frangollo-0f728a.netlify.app/',
  },
  {
    id: 'fakestore',
    emoji: '🛍️',
    title: 'FakeStore',
    subtitle: 'Tienda Virtual',
    period: '2025',
    role: 'Desarrolladora Frontend',
    category: 'frontend',
    stack: [
      { label: 'HTML',       type: 'frontend'  },
      { label: 'CSS',        type: 'frontend'  },
      { label: 'JavaScript', type: 'frontend'  },
      { label: 'REST API',   type: 'backend'   },
      { label: 'LocalStorage',type: 'frontend' },
    ],
    description: 'Tienda virtual que consume API pública con carrito de compras persistente, filtros y búsqueda en tiempo real.',
    bullets: [
      'Consumo de API pública con fetch/async para catálogo dinámico',
      'Carrito de compras persistente en LocalStorage con actualización reactiva',
      'Filtros por categoría y búsqueda en tiempo real de productos',
    ],
    github: 'https://github.com/magarcia08/examen-JavaScript_C4',
    demo: null,
  },
  {
    id: 'torneo',
    emoji: '⚽',
    title: 'Gestor de Torneo de Fútbol',
    subtitle: 'Sistema CLI en Python',
    period: '2025',
    role: 'Desarrolladora Backend',
    category: 'python',
    stack: [
      { label: 'Python 3',   type: 'python'    },
      { label: 'JSON',       type: 'backend'   },
      { label: 'CLI',        type: 'python'    },
    ],
    description: 'Sistema modular en CLI para gestión completa de torneos: equipos, jugadores, partidos y estadísticas.',
    bullets: [
      'Arquitectura modular con CRUD para 8 entidades, persistencia en JSON',
      'Módulo de transferencias de jugadores y generación de estadísticas',
      'Interfaz CLI interactiva con menús anidados y validaciones completas',
    ],
    github: null,
    demo: null,
  },
  {
    id: 'helpdeskbot',
    emoji: '🤖',
    title: 'HelpDeskBot',
    subtitle: 'Asistente Automatizado de Soporte',
    period: '2025',
    role: 'Desarrolladora',
    category: 'automatización',
    stack: [
      { label: 'n8n',          type: 'automation' },
      { label: 'Telegram Bot', type: 'automation' },
      { label: 'Google Sheets',type: 'backend'    },
    ],
    description: 'Bot conversacional en Telegram con flujos wizard para gestión de tickets de soporte y notificaciones automáticas.',
    bullets: [
      'Bot conversacional en Telegram con flujos tipo wizard',
      'Registro automático de tickets, cambio de estado y notificaciones',
      'Modelo de datos en Google Sheets: SOLICITUDES, USUARIOS, LOGS',
      'Validaciones completas: campos, prioridad y usuario activo',
    ],
    github: 'https://github.com/magarcia08/proyecto_ia_garcia_maria_c4',
    demo: null,
  },
];

/* ── Mapa de tipo de tag → clase CSS ─────────────────────── */
const TAG_CLASS = {
  backend:    'tag-backend',
  frontend:   'tag-frontend',
  python:     'tag-python',
  automation: 'tag-automation',
};

/* ── Generar HTML de una tarjeta de proyecto ─────────────── */
function createProjectCard(project) {
  const card = document.createElement('article');
  card.className = 'project-card reveal-up';
  card.dataset.category = project.category;
  card.setAttribute('aria-label', `Proyecto: ${project.title}`);

  /* Tags de stack */
  const tagsHTML = project.stack
    .map(t => `<span class="tag ${TAG_CLASS[t.type] || 'tag-neutral'}">${t.label}</span>`)
    .join('');

  /* Bullets del detalle */
  const bulletsHTML = project.bullets
    .map(b => `<li>${b}</li>`)
    .join('');

  /* Links (GitHub / Demo) */
  let linksHTML = '';
  if (project.github) {
    linksHTML += `
      <a href="${project.github}" target="_blank" rel="noopener noreferrer"
         class="card-link" aria-label="Ver código fuente en GitHub de ${project.title}">
        <i class="devicon-github-original" aria-hidden="true"></i> GitHub
      </a>`;
  }
  if (project.demo) {
    linksHTML += `
      <a href="${project.demo}" target="_blank" rel="noopener noreferrer"
         class="card-link demo-link" aria-label="Ver demo de ${project.title}">
        <!-- Icono externo -->
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        Demo en vivo
      </a>`;
  }
  const hasLinks = project.github || project.demo;

  card.innerHTML = `
    <div class="card-header">
      <span class="card-emoji" aria-hidden="true">${project.emoji}</span>
      <div class="card-title-wrap">
        <h3 class="card-title">${project.title}</h3>
        <p class="card-meta">${project.period} &middot; ${project.role}</p>
      </div>
    </div>

    <div class="card-tags" role="list" aria-label="Tecnologías usadas">
      ${tagsHTML}
    </div>

    <p class="card-description">${project.description}</p>

    <!-- Detalles expandibles -->
    <div class="card-details" id="details-${project.id}" aria-hidden="true">
      <ul class="card-bullets">${bulletsHTML}</ul>
      ${hasLinks ? `<div class="card-links">${linksHTML}</div>` : ''}
    </div>

    <div class="card-footer">
      <button
        class="btn-expand"
        aria-expanded="false"
        aria-controls="details-${project.id}"
        data-id="${project.id}"
      >
        Ver más
        <svg class="expand-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
    </div>
  `;

  return card;
}

/* ── Renderizar todos los proyectos ──────────────────────── */
function renderProjects(filter = 'all') {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  /* Filtrar lista */
  const filtered = filter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === filter);

  /* Animación de salida */
  const existing = Array.from(grid.querySelectorAll('.project-card'));
  existing.forEach(c => {
    c.style.opacity = '0';
    c.style.transform = 'scale(0.95)';
  });

  /* Pequeño delay y luego reemplazar */
  setTimeout(() => {
    grid.innerHTML = '';
    filtered.forEach((project, i) => {
      const card = createProjectCard(project);
      card.style.animationDelay = `${i * 0.07}s`;
      grid.appendChild(card);
    });

    /* Disparar scroll-reveal en las nuevas cards */
    if (typeof initScrollReveal === 'function') {
      initScrollReveal();
    }

    /* Forzar visible (ya están en viewport) */
    requestAnimationFrame(() => {
      grid.querySelectorAll('.reveal-up').forEach(el => el.classList.add('visible'));
    });
  }, existing.length ? 150 : 0);
}

/* ── Lógica de filtros ───────────────────────────────────── */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      /* Actualizar estado activo */
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      renderProjects(filter);
    });
  });
}

/* ── Delegación de eventos: expand/collapse ──────────────── */
function initExpandCards() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  grid.addEventListener('click', e => {
    const btn = e.target.closest('.btn-expand');
    if (!btn) return;

    const id      = btn.dataset.id;
    const details = document.getElementById(`details-${id}`);
    const isOpen  = btn.getAttribute('aria-expanded') === 'true';

    if (!details) return;

    if (isOpen) {
      details.classList.remove('expanded');
      details.setAttribute('aria-hidden', 'true');
      btn.setAttribute('aria-expanded', 'false');
      btn.classList.remove('open');
      btn.innerHTML = `Ver más <svg class="expand-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>`;
    } else {
      details.classList.add('expanded');
      details.setAttribute('aria-hidden', 'false');
      btn.setAttribute('aria-expanded', 'true');
      btn.classList.add('open');
      btn.innerHTML = `Ver menos <svg class="expand-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>`;
    }
  });
}

/* ── Inicialización ──────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderProjects('all');
  initProjectFilters();
  initExpandCards();
});
