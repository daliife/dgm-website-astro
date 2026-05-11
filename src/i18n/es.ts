/**
 * Spanish translations — flat Record<key, string>.
 * Keys use dot notation mirroring the cv.json structure + a "ui." namespace for static strings.
 * Loaded client-side by LanguageToggle.astro and applied to [data-i18n] elements.
 */
export const ES: Record<string, string> = {
  // ── Navigation ────────────────────────────────────────────────────────────
  "ui.nav.about": "Sobre mí",
  "ui.nav.projects": "Proyectos",
  "ui.nav.work": "Experiencia",
  "ui.nav.contact": "Contacto",

  // ── Home page ─────────────────────────────────────────────────────────────
  "ui.home.greeting": "Hola, soy",
  "ui.home.cta": "Contáctame",
  "ui.home.cta.work": "Explora mis proyectos",
  "ui.nextup": "Explora también",
  "ui.nextup.about": "Sobre mí",
  "ui.nextup.work": "Mi experiencia laboral",
  "ui.nextup.projects": "Mis proyectos",
  "ui.nextup.contact": "Contacto",

  // ── Page headings ─────────────────────────────────────────────────────────
  "ui.page.about": "Sobre mí",
  "ui.page.work": "Experiencia",
  "ui.page.projects": "Proyectos",
  "ui.page.contact": "Contacto",

  // ── About section headings ────────────────────────────────────────────────
  "ui.about.summary": "Resumen",
  "ui.about.skills": "Habilidades",
  "ui.about.languages": "Idiomas",
  "ui.about.education": "Formación",
  "ui.about.certificates": "Certificados",
  "ui.about.printcv": "Imprimir CV",
  "ui.about.experience": "Experiencia", // print-only

  // ── Cookie consent ──────────────────────────────────────────────────────────
  "ui.cookies.message":
    "Este sitio utiliza analíticas anónimas para mejorar la experiencia.",
  "ui.cookies.learnmore": "Más información",
  "ui.cookies.dismiss": "Entendido",

  // ── Footer ───────────────────────────────────────────────────────────────────
  "ui.footer.privacy": "Privacidad",
  // ── Dates ──────────────────────────────────────────────────────────────────
  "ui.date.present": "Actualidad",
  // ── Privacy page ─────────────────────────────────────────────────────────────
  "ui.page.privacy": "Privacidad",
  "ui.privacy.intro.before": "Este sitio utiliza ",
  "ui.privacy.intro.after":
    ", una herramienta de analítica de código abierto y respetuosa con la privacidad. No se usan cookies y no se recopilan datos personales.",
  "ui.privacy.collected.title": "Qué recopilamos",
  "ui.privacy.collected.0": "Páginas visitadas y rutas de navegación",
  "ui.privacy.collected.1": "URL de referencia (de dónde vienes)",
  "ui.privacy.collected.2": "Navegador y sistema operativo (genérico)",
  "ui.privacy.collected.3":
    "Tipo de dispositivo (escritorio / móvil / tableta)",
  "ui.privacy.collected.4": "País (aproximado, basado en IP anonimizada)",
  "ui.privacy.notcollected.title": "Qué NO recopilamos",
  "ui.privacy.notcollected.0": "Sin cookies ni identificadores persistentes",
  "ui.privacy.notcollected.1": "Sin datos personales (nombre, correo, etc.)",
  "ui.privacy.notcollected.2": "Sin almacenamiento de dirección IP",
  "ui.privacy.notcollected.3": "Sin seguimiento entre sitios",
  "ui.privacy.notcollected.4": "Sin venta de datos a terceros",
  "ui.privacy.moreinfo": "Más detalles en",

  // ── Contact ───────────────────────────────────────────────────────────────
  "ui.contact.intro":
    "Disponible para nuevos proyectos y oportunidades. Escríbeme cuando quieras — suelo responder en menos de 24h.",

  // ── Basics ───────────────────────────────────────────────────────────────
  "basics.label": "Desarrollador Frontend",
  "basics.location": "Barcelona · Cataluña",
  "basics.summary.0":
    "Desarrollador Frontend enfocado en construir interfaces limpias, claras y bien elaboradas. Me preocupo por crear experiencias que no solo funcionen bien, sino que también tengan buen aspecto. Experiencia creando componentes reutilizables y trabajando con tecnologías web.",
  "basics.summary.1":
    "Me adapto rápidamente a nuevos entornos y me distingue mi curiosidad y aprendizaje continuo, manteniéndome al día con nuevas tecnologías, herramientas y el impacto de la IA.",
  "basics.summary.2":
    "También trabajo con Unity en proyectos interactivos, complementado con habilidades de modelado 3D para aportar una perspectiva más allá del frontend.",

  // ── Work experience ───────────────────────────────────────────────────────
  "work.0.position": "Lead Engineer",
  "work.0.highlights.0":
    "Desarrollo de un nuevo producto de Role-Plays, integrando SCAI (WebSockets) y AI Factory (LLMs de puntuación).",
  "work.0.highlights.1":
    "Creación de componentes y widgets para Syntphony Learning Tech (PHP, Moodle, HTML, JavaScript).",
  "work.0.highlights.2":
    "Implementación de funcionalidades en el portal de administración de Syntphony Immersive Experiences, incluyendo login OTP.",
  "work.0.highlights.3":
    "Desarrollo de una versión web de Syntphony Immersive Experiences con WebGL y Unity.",
  "work.0.highlights.4":
    "Mantenimiento de la documentación de Syntphony Immersive Experiences (Nextra, MD/MDX).",
  "work.0.highlights.5":
    "Migración del Design System del portal Syntphony Immersive Experiences.",
  "work.0.highlights.6":
    "Mantenimiento y optimización de pipelines CI/CD de frontend: e2e tests, tests unitarios y optimización de build.",

  "work.1.position": "Engineer",
  "work.1.highlights.0":
    "Desarrollo de nuevas funcionalidades para la app móvil 'eCliente' para Allianz.",
  "work.1.highlights.1":
    "Impartición del curso 'Angular basics' para los empleados de Allianz.",
  "work.1.highlights.2":
    "Implementación del negocio de seguros XL con Angular 12, correcciones de errores y refactorización de componentes (MAPFRE).",
  "work.1.highlights.3":
    "Migración de estilos y funcionalidades del portal Servihabitat con Liferay (Caixabank).",
  "work.1.highlights.4":
    "Creación de un widget de calendario en un portlet Liferay (Educaixa/Caixabank).",
  "work.1.highlights.5":
    "Creación de diversas SPAs para sitios web de tipo RFP con alto 'efecto wow' en Angular 9 (SEAT y Orange).",
  "work.1.highlights.6":
    "Creación de un Design System usando Storybooks y Stencil.",
  "work.1.highlights.7":
    "PoC: exportación de design tokens con Figma a un Design System.",

  "work.2.position": "Junior Engineer",
  "work.2.highlights.0":
    "Creación de building blocks (componentes web) con Angular 8 (Allianz).",
  "work.2.highlights.1":
    "Aprendizaje y creación de PoC para el departamento Phygital.",
  "work.2.highlights.2":
    "Desarrollo de aplicaciones VR con Unity para el proyecto USIX2.0, una app de formación para el sector industrial.",
  "work.2.highlights.3":
    "Desarrollo web con Adobe Experience Manager para el proyecto CasaSeat Retail Car Configurator (SEAT: CODE).",

  "work.3.position": "Docente",
  "work.3.summary":
    "Profesor de la asignatura 'Introducción a Unreal Engine' en el Máster en Desarrollo Avanzado de Videojuegos de La Salle Campus BCN.",

  "work.4.position": "Prácticas",
  "work.4.summary":
    "Creación de una aplicación de VR (PhygitApp) para mostrar el potencial de las experiencias Phygital en el mundo de la banca y la atención al cliente.",

  "work.5.position": "Programador Multimedia",
  "work.5.summary":
    "Simulación del HUD y las pantallas de cockpit digital de un nuevo coche para el cliente SEAT.",

  "work.6.position": "IT Helpdesk",
  "work.6.highlights.0":
    "Resolución de problemas informáticos en las oficinas de Wanup.",
  "work.6.highlights.1":
    "Creación de documentación relacionada con los departamentos de Sistemas y Helpdesk.",
  "work.6.highlights.2":
    "Control y verificación del material de hardware de la oficina.",

  "work.7.position": "Prácticas",
  "work.7.highlights.0":
    "Creación de nuevos ejercicios didácticos para los estudiantes.",
  "work.7.highlights.1":
    "Apoyo al profesor en la enseñanza parcial de la asignatura de Animación 1.",
  "work.7.highlights.2":
    "En las jornadas de puertas abiertas, daba apoyo ofreciendo información, mostrando los laboratorios y respondiendo preguntas de futuros estudiantes.",
  "work.7.highlights.3": "Control de material y logística de los laboratorios.",

  // ── Projects ──────────────────────────────────────────────────────────────
  "projects.0.description":
    "Proyecto personal — web para un estudio de movimiento Seitai y katsugen",
  "projects.1.description":
    "Proyecto profesional — página web interactiva con 3 minijuegos en Canvas (SEAT)",
  "projects.2.description":
    "Proyecto profesional — página de presentación con un minijuego de cartas (Orange)",
  "projects.3.description":
    "Proyecto profesional — página web interactiva con un timeline de cronología (SEAT)",
  "projects.4.description":
    "Proyecto universitario — app recomendadora de TV para Samsung Smart TV con Tizen Studio",
  "projects.5.description":
    "Proyecto de máster — prototipo de videojuego desarrollado con Unreal Engine 4",
  "projects.6.description":
    "Proyecto personal — adaptación del juego de palabras 'Paraulògic'",
  "projects.7.description":
    "Proyecto personal — versión anterior de mi portfolio desarrollada con Angular",
  "projects.8.description":
    "Proyecto de máster — videojuego hipercasual de minigolf desarrollado con Unity",
  "projects.9.description":
    "Proyecto personal — web para descubrir familias de instrumentos, desarrollada con Angular",
  "projects.10.description":
    "Proyecto profesional — cuadrícula filtrable de elementos con Isotope (Endesa)",
  "projects.11.description":
    "Proyecto de máster — efectos de postprocesado en tiempo real con fragment shaders e ImGui",

  // ── Education ─────────────────────────────────────────────────────────────
  "education.0.studyType": "Máster en Desarrollo Avanzado de Videojuegos",
  "education.0.area": "Desarrollo de Videojuegos",
  "education.1.studyType": "Grado en Ingeniería Multimedia",
  "education.1.area": "Ingeniería Multimedia",
  "education.2.studyType": "CFGS en Realización en Sonido",
  "education.2.area": "Ingeniería de Sonido",

  // ── Skills ────────────────────────────────────────────────────────────────
  "skills.0.name": "Desarrollo Web",
  "skills.0.level": "Experto",
  "skills.1.name": "Frameworks",
  "skills.1.level": "Experto",
  "skills.2.name": "Herramientas y DevOps",
  "skills.2.level": "Avanzado",
  "skills.3.name": "3D e Interactivos",
  "skills.3.level": "Avanzado",
  "skills.4.name": "Integración de IA",
  "skills.4.level": "Intermedio",

  // ── Languages ─────────────────────────────────────────────────────────────
  "languages.0.fluency": "Lengua materna",
  "languages.1.fluency": "Lengua materna",
  "languages.2.fluency": "Competencia profesional",
};
