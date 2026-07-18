/**
 * Spanish translations — flat Record<key, string>.
 * Keys use dot notation mirroring the cv.json structure + a "ui." namespace for static strings.
 * Loaded client-side by LanguageToggle.astro and applied to [data-i18n] elements.
 */
import type { I18nKey } from "./en";

export const ES: Record<I18nKey, string> = {
  // ── Navigation ────────────────────────────────────────────────────────────
  "ui.nav.about": "Sobre mí",
  "ui.nav.projects": "Proyectos",
  "ui.nav.work": "Experiencia",
  "ui.nav.contact": "Contacto",

  // ── Home page ─────────────────────────────────────────────────────────────
  "ui.home.greeting": "Hola, soy",
  "ui.home.cta": "Contáctame",
  "ui.home.cta.work": "Explora mis proyectos",
  "ui.home.typewriter.0": "DESARROLLADOR FRONTEND",
  "ui.home.typewriter.1": "INGENIERO DE SOFTWARE",
  "ui.home.typewriter.2": "ESPECIALISTA EN REACT",
  "ui.home.typewriter.3": "CLARINETISTA",
  "ui.home.typewriter.4": "AMANTE DE LA MONTAÑA",
  "ui.nextup": "Explora también",
  "ui.nextup.aria": "Páginas relacionadas",
  "ui.nextup.about": "Sobre mí",
  "ui.nextup.work": "Mi experiencia",
  "ui.nextup.projects": "Mis proyectos",
  "ui.nextup.contact": "Contacto",

  // ── Page headings ─────────────────────────────────────────────────────────
  "ui.page.about": "Sobre mí",
  "ui.page.work": "Experiencia",
  "ui.page.projects": "Proyectos",
  "ui.page.contact": "Contacto",

  // ── Projects categories ─────────────────────────────────────────────────────
  "ui.projects.category.professional": "Profesional",
  "ui.projects.category.personal": "Personal",
  "ui.projects.category.academic": "Académico",

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

  // ── Accessibility ──────────────────────────────────────────────────────────
  "ui.a11y.opensNewTab": "(se abre en una pestaña nueva)",
  "ui.a11y.cookieNotice": "Aviso de cookies",
  "ui.a11y.theme.toDark": "Cambiar al modo oscuro",
  "ui.a11y.theme.toLight": "Cambiar al modo claro",

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
    "Abierto a nuevos proyectos y colaboraciones. Escríbeme cuando quieras — normalmente respondo en menos de 24 horas.",
  "ui.contact.network.email": "Correo electrónico",
  "ui.contact.network.linkedin": "LinkedIn",
  "ui.contact.network.github": "GitHub",

  // ── Basics ───────────────────────────────────────────────────────────────
  "basics.label": "Desarrollador Frontend",
  "basics.location": "Barcelona · Cataluña",
  "basics.summary.0":
    "Desarrollador frontend especializado en construir interfaces limpias y cuidadas — desde componentes reutilizables hasta los detalles que percibe el usuario. Me importa que las experiencias funcionen bien y sean un placer de usar.",
  "basics.summary.1":
    "Me adapto con rapidez y mantengo la curiosidad: sigo las tendencias del sector, las nuevas herramientas y cómo la IA está cambiando la forma de desarrollar.",
  "basics.summary.2":
    "Además del frontend, trabajo con Unity en proyectos interactivos y aporto conocimientos de modelado 3D — una visión más amplia que ayuda en productos digitales multidisciplinares.",

  // ── Work experience ───────────────────────────────────────────────────────
  "work.0.position": "Lead Engineer",
  "work.0.highlights.0":
    "Nuevo producto Role-Play integrando SCAI (WebSockets) y AI Factory (LLMs de puntuación).",
  "work.0.highlights.1":
    "Componentes y widgets para Syntphony Learning Tech (PHP, Moodle, HTML, JavaScript).",
  "work.0.highlights.2":
    "Funcionalidades en el portal de administración de Syntphony Immersive Experiences, incluyendo login OTP.",
  "work.0.highlights.3":
    "Versión web de Syntphony Immersive Experiences con WebGL y Unity.",
  "work.0.highlights.4":
    "Documentación de Syntphony Immersive Experiences (Nextra, MD/MDX).",
  "work.0.highlights.5":
    "Migración del design system del portal Syntphony Immersive Experiences.",
  "work.0.highlights.6":
    "Mantenimiento y optimización de pipelines CI/CD de frontend: tests E2E, tests unitarios y rendimiento de build.",

  "work.1.position": "Engineer",
  "work.1.highlights.0":
    "Nuevas funcionalidades para la app móvil eCliente de Allianz.",
  "work.1.highlights.1":
    "Curso de fundamentos de Angular para los equipos de Allianz.",
  "work.1.highlights.2":
    "Flujos de seguros XL con Angular 12, corrección de errores y refactorización de componentes (MAPFRE).",
  "work.1.highlights.3":
    "Migración de estilos y funcionalidades del portal Servihabitat con Liferay (CaixaBank).",
  "work.1.highlights.4":
    "Widget de calendario como portlet Liferay (Educaixa/CaixaBank).",
  "work.1.highlights.5":
    "SPAs para sitios Ready-for-Proposal (RFP) con demos de alto impacto en Angular 9 (SEAT y Orange).",
  "work.1.highlights.6": "Design system con Storybook y Stencil.",
  "work.1.highlights.7":
    "Prueba de concepto: exportación de design tokens de Figma a un design system.",

  "work.2.position": "Junior Engineer",
  "work.2.highlights.0":
    "Componentes web reutilizables con Angular 8 (Allianz).",
  "work.2.highlights.1":
    "Investigación y pruebas de concepto para el departamento Phygital.",
  "work.2.highlights.2":
    "Apps de formación en VR con Unity para el proyecto USIX 2.0 en el sector industrial.",
  "work.2.highlights.3":
    "Configurador de coches Casa SEAT con Adobe Experience Manager (SEAT: CODE).",

  "work.3.position": "Docente",
  "work.3.summary":
    "Docencia de Introducción a Unreal Engine en el Máster en Desarrollo Avanzado de Videojuegos de La Salle Campus Barcelona.",

  "work.4.position": "Prácticas",
  "work.4.summary":
    "App de VR (PhygitApp) para mostrar experiencias phygital en banca y atención al cliente.",

  "work.5.position": "Programador Multimedia",
  "work.5.summary":
    "Simulación del HUD y las pantallas de cockpit digital de un nuevo vehículo SEAT.",

  "work.6.position": "IT Helpdesk",
  "work.6.highlights.0":
    "Resolución de incidencias informáticas en las oficinas de Wanup.",
  "work.6.highlights.1":
    "Documentación para los equipos de Sistemas y Helpdesk.",
  "work.6.highlights.2":
    "Gestión del inventario y los suministros de hardware de oficina.",

  "work.7.position": "Prácticas",
  "work.7.highlights.0":
    "Nuevos ejercicios de aprendizaje para los estudiantes.",
  "work.7.highlights.1": "Apoyo a la docencia de la asignatura de Animación 1.",
  "work.7.highlights.2":
    "Apoyo en jornadas de puertas abiertas: visitas a laboratorios, Q&A e información para futuros estudiantes.",
  "work.7.highlights.3":
    "Gestión del material y la logística de los laboratorios.",

  // ── Projects ──────────────────────────────────────────────────────────────
  "projects.0.description":
    "Web para un estudio de movimiento Seitai y katsugen",
  "projects.1.description":
    "App de lectura rápida con la técnica Spritz (desarrollo guiado por especificaciones)",
  "projects.2.description":
    "Página interactiva con tres minijuegos en Canvas (SEAT)",
  "projects.3.description": "Landing page con un minijuego de cartas (Orange)",
  "projects.4.description":
    "Página interactiva con una cronología de marca (SEAT)",
  "projects.5.description":
    "App de recomendación de TV para Samsung Smart TV (Tizen Studio)",
  "projects.6.description":
    "Prototipo de videojuego desarrollado con Unreal Engine 4",
  "projects.7.description": "Juego de palabras inspirado en Paraulògic",
  "projects.8.description":
    "Versión anterior del portfolio desarrollada con Angular",
  "projects.9.description":
    "Minijuego hipercasual de minigolf desarrollado con Unity",
  "projects.10.description":
    "Web para descubrir familias de instrumentos, desarrollada con Angular",
  "projects.11.description":
    "Cuadrícula filtrable de elementos con Isotope (Endesa)",
  "projects.12.description":
    "Efectos de postprocesado en tiempo real con fragment shaders e ImGui",

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

  // ── 404 page ───────────────────────────────────────────────────────────────
  "ui.404.message": "Página no encontrada",
  "ui.404.back": "← Volver al inicio",
};
