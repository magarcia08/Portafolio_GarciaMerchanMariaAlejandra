# 🌐 Portafolio — María Alejandra García Merchán

> Portafolio web profesional de una desarrolladora Full Stack Junior con enfoque en Java, JavaScript, Spring Boot, Python, Node.js y automatización con IA. Construido con HTML5, CSS3 puro y JavaScript vanilla — sin frameworks, sin librerías de UI, listo para deploy.

[![Deploy en Netlify](https://img.shields.io/badge/Deploy-Netlify-00d9b8?style=flat-square&logo=netlify)](https://app.netlify.com)
[![Hecho con](https://img.shields.io/badge/Hecho%20con-HTML%20%7C%20CSS%20%7C%20JS-6c63ff?style=flat-square)](#)
[![Licencia](https://img.shields.io/badge/Licencia-MIT-f7c948?style=flat-square)](#)

---

## ✨ Vista previa

| Dark mode | Light mode |
|-----------|------------|
| Fondo `#0f0f1a` · acento violeta `#6c63ff` | Fondo `#f4f4fb` · mismos acentos |

---

## 📁 Estructura del proyecto

```
Portafolio_GarciaMerchanMaria/
├── index.html              # HTML5 semántico — estructura completa
├── css/
│   ├── styles.css          # Variables CSS, reset, tema dark/light, botones, tags
│   ├── components.css      # Navbar, Hero, About, Skills, Projects, Contact, Footer
│   └── animations.css      # Keyframes, scroll reveal, glassmorphism
├── js/
│   ├── projects.js         # Datos de proyectos, renderizado y filtrado
│   ├── animations.js       # Intersection Observer (reveal + skill bars + parallax)
│   └── main.js             # Cursor, partículas canvas, typing, tema, formulario
└── assets/
    ├── favicon.svg         # Ícono de pestaña con iniciales MG
    └── cv/
        └── MariaGarcia_CV.pdf  # ← Añadir CV aquí
```

---

## 🚀 Funcionalidades

| Característica | Detalle |
|---|---|
| 🌙 Dark / Light mode | Toggle con persistencia en `localStorage` |
| 🖱️ Cursor personalizado | Dot + ring con efecto lag via `requestAnimationFrame` |
| ✨ Partículas canvas | Sistema propio sin librerías — puntos conectados animados |
| ⌨️ Typing effect | Roles rotativos con efecto typewriter puro en JS |
| 📊 Skill bars | Animadas con `IntersectionObserver` al entrar al viewport |
| 🗂️ Filtro de proyectos | Por categoría con animación fade + scale |
| 📂 Expand de cards | Detalles inline sin modales, transición suave por `max-height` |
| 📬 Formulario de contacto | Validación JS con feedback visual y mensaje de éxito animado |
| 📈 Barra de scroll | Progreso de lectura en la parte superior |
| ♿ Accesibilidad | ARIA roles, contraste AA, focus visible, `prefers-reduced-motion` |
| 📱 Responsive | Mobile first — breakpoints: 480 · 768 · 1024 · 1280px |

---

## 🛠️ Stack del portafolio

- **HTML5** semántico (`header`, `main`, `section`, `article`, `footer`)
- **CSS3** puro — custom properties, glassmorphism, grid, flexbox
- **JavaScript** vanilla — sin jQuery, sin frameworks, sin librerías de animación
- **Google Fonts** — Inter · Poppins · Fira Code
- **Devicons CDN** — íconos de tecnologías

---

## 🗂️ Secciones

1. **Navbar** — fija, activa por sección al hacer scroll, menú hamburguesa en móvil
2. **Hero** — typing effect, partículas canvas, scroll indicator
3. **Sobre mí** — perfil profesional, datos rápidos, competencias blandas
4. **Skills** — Backend · Frontend · IA & Automatización · Herramientas & BD
5. **Proyectos** — 6 proyectos con filtro por categoría y cards expandibles
6. **Contacto** — formulario con validación y links a redes sociales
7. **Footer** — créditos y redes sociales

---

## 📂 Proyectos incluidos

| Proyecto | Stack principal | Categoría |
|---|---|---|
| TalentX — RRHH | Node.js · Spring Boot · MySQL | Backend |
| BiblioTrack | JavaScript · MySQL | Backend |
| Hotel El Rincón del Carmen | HTML/CSS · JS · Netlify | Frontend |
| FakeStore | JavaScript · REST API | Frontend |
| Gestor de Torneo de Fútbol | Python · JSON · CLI | Python |
| HelpDeskBot | n8n · Telegram Bot · Google Sheets | Automatización |

---

## ⚡ Deploy

### Netlify (recomendado)

1. Arrastra la carpeta del proyecto a [app.netlify.com/drop](https://app.netlify.com/drop)
2. ¡Listo! No requiere build step.

### GitHub Pages

```bash
git add .
git commit -m "deploy portafolio"
git push origin main
```
Luego en el repositorio: **Settings → Pages → Branch: main → / (root) → Save**

---

## 🖥️ Uso local

```bash
# Clonar el repositorio
git clone https://github.com/magarcia08/Portafolio_GarciaMerchanMaria.git

# Abrir directamente en el navegador
# (no requiere servidor — es HTML/CSS/JS puro)
open index.html
```

> **Recomendado:** usar la extensión **Live Server** de VS Code para recarga en caliente.

---

## 📌 Pendiente

- [ ] Añadir `assets/cv/MariaGarcia_CV.pdf`
- [ ] Conectar formulario de contacto a un servicio real (Formspree, EmailJS, etc.)
- [ ] Configurar dominio personalizado en Netlify

---

## 👩‍💻 Autora

**María Alejandra García Merchán**
Desarrolladora Full Stack Junior · Bucaramanga, Colombia 🇨🇴

[![GitHub](https://img.shields.io/badge/GitHub-magarcia08-6c63ff?style=flat-square&logo=github)](https://github.com/magarcia08)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-maria--garcia--mm-0a66c2?style=flat-square&logo=linkedin)](https://linkedin.com/in/maria-garcia-mm)
[![Email](https://img.shields.io/badge/Email-mariagarcia36508%40gmail.com-00d9b8?style=flat-square&logo=gmail)](mailto:mariagarcia36508@gmail.com)

---

*Hecho con 💜 · 2026*
