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
  "ui.nav.experience": "Experiencia",
  "ui.nav.contact": "Contacto",

  // ── Home page ─────────────────────────────────────────────────────────────
  "ui.home.cta": "Contáctame",
  "ui.home.cta.work": "Explora mis proyectos",
  "ui.home.typewriter.0": "Desarrollador frontend",
  "ui.home.typewriter.1": "Ingeniero de software",
  "ui.home.typewriter.2": "Clarinetista",
  "ui.home.typewriter.3": "Amante de la montaña",
  "ui.nextup": "Explora también",
  "ui.nextup.aria": "Páginas relacionadas",
  "ui.nextup.about": "Sobre mí",
  "ui.nextup.experience": "Mi experiencia",
  "ui.nextup.projects": "Mis proyectos",
  "ui.nextup.contact": "Contacto",

  // ── Page headings ─────────────────────────────────────────────────────────
  "ui.page.about": "Sobre mí",
  "ui.page.experience": "Experiencia",
  "ui.page.projects": "Proyectos",
  "ui.page.contact": "Contacto",

  // ── SEO meta (SSR default locale strings for <title> / description) ───────
  "ui.meta.portfolio": "Portafolio",
  "ui.meta.defaultDescription":
    "Portafolio personal de David Gimeno Mañé — Desarrollador Frontend en Barcelona.",
  "ui.meta.about.description":
    "Sobre David Gimeno Mañé — Desarrollador Frontend en Barcelona. Trayectoria, habilidades y experiencia.",
  "ui.meta.experience.description":
    "Experiencia profesional de David Gimeno Mañé — Desarrollador Frontend en Barcelona.",
  "ui.meta.projects.description":
    "Proyectos web de David Gimeno Mañé — Desarrollador Frontend en Barcelona.",
  "ui.meta.projects.listName": "Proyectos",
  "ui.meta.contact.description":
    "Contacta con David Gimeno Mañé — Desarrollador Frontend en Barcelona.",
  "ui.meta.404.title": "404 — Página no encontrada",

  // ── Projects categories ─────────────────────────────────────────────────────
  "ui.projects.category.professional": "Profesional",
  "ui.projects.category.personal": "Personal",
  "ui.projects.category.academic": "Académico",
  "ui.projects.back": "Todos los proyectos",
  "ui.projects.visit": "Visita el proyecto",
  "ui.projects.github": "Ver en GitHub",
  "ui.projects.tech": "Tecnologías",
  "ui.projects.highlights": "Destacados",
  "ui.projects.prev": "Anterior",
  "ui.projects.next": "Siguiente",
  "ui.a11y.projectNav": "Navegación entre proyectos",
  "ui.a11y.breadcrumb": "Miga de pan",

  // ── About section headings ────────────────────────────────────────────────
  "ui.about.summary": "Resumen",
  "ui.about.skills": "Habilidades",
  "ui.about.languages": "Idiomas",
  "ui.about.education": "Formación",
  "ui.about.certificates": "Certificados",
  "ui.about.printcv": "Imprimir CV",
  "ui.about.stats": "En cifras",
  "ui.about.stats.years": "Años de experiencia",
  "ui.about.stats.projects": "Proyectos",
  "ui.about.stats.technologies": "Tecnologías",
  "ui.about.experience": "Experiencia", // print-only

  // ── Cookie consent ──────────────────────────────────────────────────────────
  "ui.cookies.message":
    "Este sitio recoge estadísticas anónimas para mejorar la experiencia.",
  "ui.cookies.learnmore": "Más información",
  "ui.cookies.accept": "Aceptar",
  "ui.cookies.reject": "Rechazar",

  // ── Accessibility ──────────────────────────────────────────────────────────
  "ui.a11y.opensNewTab": "(se abre en una pestaña nueva)",
  "ui.a11y.cookieNotice": "Aviso de cookies",
  "ui.a11y.skipToContent": "Saltar al contenido principal",
  "ui.a11y.portraitOf": "Retrato de",
  "ui.a11y.theme.toDark": "Cambiar al modo oscuro",
  "ui.a11y.theme.toLight": "Cambiar al modo claro",
  "ui.a11y.nav.main": "Navegación principal",
  "ui.a11y.nav.home": "Inicio",
  "ui.a11y.nav.openMenu": "Abrir menú de navegación",
  "ui.a11y.nav.closeMenu": "Cerrar menú de navegación",
  "ui.a11y.nav.mobileMenu": "Menú de navegación",
  "ui.a11y.lang.select": "Seleccionar idioma",
  "ui.a11y.lang.listbox": "Idioma",
  "ui.a11y.footer.social": "Enlaces sociales del pie",

  // ── Footer ───────────────────────────────────────────────────────────────────
  "ui.footer.privacy": "Privacidad",
  "ui.footer.builtWith": "Hecho con",
  "ui.footer.cycle.0": "amor ♥",
  "ui.footer.cycle.1": "Astro 🚀",
  "ui.footer.cycle.2": "IA ✦",
  "ui.footer.network.email": "Correo",
  // ── Dates ──────────────────────────────────────────────────────────────────
  "ui.date.present": "Actualidad",
  // ── Privacy page ─────────────────────────────────────────────────────────────
  "ui.page.privacy": "Privacidad",
  "ui.privacy.intro.before": "Este sitio utiliza ",
  "ui.privacy.intro.after":
    ", una herramienta de estadísticas de código abierto que respeta la privacidad. No usa cookies ni recoge datos personales.",
  "ui.privacy.collected.title": "Qué recopilamos",
  "ui.privacy.collected.0": "Páginas vistas y recorrido por la web",
  "ui.privacy.collected.1": "Página de procedencia",
  "ui.privacy.collected.2": "Navegador y sistema operativo, sin detalle",
  "ui.privacy.collected.3":
    "Tipo de dispositivo (escritorio / móvil / tableta)",
  "ui.privacy.collected.4": "País (aproximado, basado en IP anonimizada)",
  "ui.privacy.collected.5":
    "Idioma de la web y modo claro u oscuro (al entrar y al cambiarlo)",
  "ui.privacy.notcollected.title": "Qué NO recopilamos",
  "ui.privacy.notcollected.0": "Sin cookies ni identificadores persistentes",
  "ui.privacy.notcollected.1": "Sin datos personales (nombre, correo, etc.)",
  "ui.privacy.notcollected.2": "Sin almacenamiento de dirección IP",
  "ui.privacy.notcollected.3": "Sin rastreo entre webs",
  "ui.privacy.notcollected.4": "Sin venta de datos a terceros",
  "ui.privacy.moreinfo": "Más detalles en",
  "ui.privacy.consent":
    "Las estadísticas solo se cargan si aceptas el aviso. Si lo rechazas, la web funciona igual y no carga Umami.",

  // ── Contact ───────────────────────────────────────────────────────────────
  "ui.contact.intro":
    "Estoy abierto a proyectos y colaboraciones. Escríbeme cuando quieras: normalmente respondo en menos de 24 horas.",
  "ui.contact.network.email": "Correo electrónico",
  "ui.contact.network.linkedin": "LinkedIn",
  "ui.contact.network.github": "GitHub",
  "ui.contact.copy": "Copiar correo",
  "ui.contact.copied": "Copiado",

  // ── Basics ───────────────────────────────────────────────────────────────
  "basics.label": "Desarrollador Frontend",
  "basics.location": "Barcelona · Cataluña",
  "basics.summary.0":
    "Desarrollador frontend. Hago interfaces limpias y cuidadas, de los componentes que se reutilizan a los detalles que se notan. Me importa que funcionen bien y que apetezca usarlas.",
  "basics.summary.1":
    "Me adapto rápido y mantengo la curiosidad: sigo las novedades del sector, las herramientas nuevas y cómo la IA está cambiando la forma de programar.",
  "basics.summary.2":
    "Además del frontend, trabajo con Unity en proyectos interactivos y sé modelar en 3D. Esa mirada más amplia ayuda cuando un producto mezcla disciplinas.",

  // ── Work experience ───────────────────────────────────────────────────────
  "work.0.position": "Lead Engineer",
  "work.0.highlights.0":
    "Nuevo producto Role-Play que integra SCAI (WebSockets) y AI Factory (modelos de lenguaje para puntuar).",
  "work.0.highlights.1":
    "Componentes y widgets para Syntphony Learning Tech (PHP, Moodle, HTML, JavaScript).",
  "work.0.highlights.2":
    "Funcionalidades en el portal de administración de Syntphony Immersive Experiences, con inicio de sesión por OTP.",
  "work.0.highlights.3":
    "Versión web de Syntphony Immersive Experiences con WebGL y Unity.",
  "work.0.highlights.4":
    "Documentación de Syntphony Immersive Experiences (Nextra, MD/MDX).",
  "work.0.highlights.5":
    "Migración del design system del portal Syntphony Immersive Experiences.",
  "work.0.highlights.6":
    "Mantenimiento y optimización de los pipelines CI/CD de frontend: tests E2E, tests unitarios y tiempo de compilación.",

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
    "Aplicaciones para propuestas comerciales (RFP), con demos potentes en Angular 9 (SEAT y Orange).",
  "work.1.highlights.6": "Design system con Storybook y Stencil.",
  "work.1.highlights.7":
    "Prueba de concepto: exportación de design tokens de Figma a un design system.",

  "work.2.position": "Junior Engineer",
  "work.2.highlights.0":
    "Componentes web reutilizables con Angular 8 (Allianz).",
  "work.2.highlights.1":
    "Investigación y pruebas de concepto para el departamento Phygital.",
  "work.2.highlights.2":
    "Aplicaciones de formación en RV con Unity para el proyecto USIX 2.0 en el sector industrial.",
  "work.2.highlights.3":
    "Configurador de coches Casa SEAT con Adobe Experience Manager (SEAT: CODE).",

  "work.3.position": "Docente",
  "work.3.summary":
    "Docencia de Introducción a Unreal Engine en el Máster en Desarrollo Avanzado de Videojuegos de La Salle Campus Barcelona.",

  "work.4.position": "Prácticas",
  "work.4.summary":
    "App de RV (PhygitApp) para mostrar experiencias phygital en banca y atención al cliente.",

  "work.5.position": "Programador Multimedia",
  "work.5.summary":
    "Simulación del HUD y las pantallas de la cabina digital de un vehículo nuevo de SEAT.",

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
    "Apoyo en las jornadas de puertas abiertas: visitas a los laboratorios, preguntas e información para futuros estudiantes.",
  "work.7.highlights.3":
    "Gestión del material y la logística de los laboratorios.",

  // ── Projects ──────────────────────────────────────────────────────────────
  "projects.0.description":
    "Consola meteorológica LCARS (TNG) para una estación en Cabacés",
  "projects.0.longDescription":
    "El tiempo de una estación meteorológica de patio en Cabacés (Priorat), con el aspecto de una consola de operaciones LCARS de Star Trek TNG a pantalla completa. Condiciones en directo, previsión e histórico de Weather Underground (con alternativa a Open-Meteo), textos en catalán, castellano e inglés, y unidades métricas o imperiales. Sitio estático con Astro, TypeScript y una interfaz LCARS hecha a medida. Es un proyecto de fan, sin relación con Paramount ni Weather Underground.",
  "projects.1.description":
    "Visualizador 3D interactivo de eclipses solares y lunares",
  "projects.1.longDescription":
    "Visualizador 3D interactivo de eclipses solares y lunares. Las distancias y los tamaños salen a escala de aula para que se vea la inclinación orbital de 5° de la Luna, con una opción para pasar a la escala real. Hecho con React, TypeScript, Three.js y React Three Fiber. Se abre parado en el eclipse solar total del 12 de agosto de 2026, con la interfaz en inglés y catalán.",
  "projects.2.description":
    "Web para un estudio de movimiento Seitai y katsugen",
  "projects.2.longDescription":
    "Web de marketing para Estudi Seitai, un estudio de movimiento Seitai y katsugen en Cataluña. Sitio estático y rápido con Astro, TypeScript y Tailwind. Explica la práctica, los espacios y el contacto en catalán, con un tono tranquilo que encaja con la marca.",
  "projects.3.description":
    "App estática pensada para el móvil para encontrar objetos de casa con espacios marcados con QR",
  "projects.3.longDescription":
    "App web estática, pensada para el móvil, para encontrar dónde tienes guardadas las cosas de casa. Pegas un QR en armarios y cajoneras, lo escaneas y buscas por palabra, con una búsqueda aproximada que se hace en el navegador. Hecha con Next.js, TypeScript y Tailwind CSS, con el inventario en catalán y la interfaz en catalán, castellano e inglés. Publicada como PWA estática en GitHub Pages.",
  "projects.4.description":
    "App de lectura rápida con la técnica Spritz, hecha a partir de especificaciones",
  "projects.4.longDescription":
    "App de lectura rápida en el navegador con la técnica Spritz (RSVP): las palabras salen de una en una alrededor de un punto fijo, para leer más deprisa sin mover los ojos. Hecha con React, Vite, TypeScript y Tailwind a partir de especificaciones, con cambio de idioma y velocidad ajustable.",
  "projects.5.description":
    "Página interactiva con tres minijuegos en Canvas (SEAT)",
  "projects.5.longDescription":
    "Propuesta interactiva para SEAT con Angular y Canvas. Quien la visita recorre la marca con tres minijuegos, en vez de una presentación estática.",
  "projects.6.description":
    "Página interactiva con una cronología de marca (SEAT)",
  "projects.6.longDescription":
    "Cronología de marca para SEAT para recorrer coches icónicos y momentos de la historia. La interfaz, en Angular y TypeScript, explica la línea de tiempo paso a paso, no como un archivo quieto.",
  "projects.7.description":
    "Página promocional con un minijuego de cartas (Orange)",
  "projects.7.longDescription":
    "Página promocional para Orange con un minijuego de cartas. Hecha con Angular, TypeScript y animaciones Lottie, convierte una propuesta comercial en una historia interactiva sobre servicios pensados para quien los usa.",
  "projects.8.description":
    "App de recomendación de TV para Samsung Smart TV (Tizen Studio)",
  "projects.8.longDescription":
    "Recomendador pensado para Samsung Smart TV (Tizen). La interfaz, en JavaScript y cómoda con el mando, sirve para elegir películas y series desde el sofá.",
  "projects.9.description":
    "Prototipo de videojuego desarrollado con Unreal Engine 4",
  "projects.9.longDescription":
    "Prototipo académico de carreras con Unreal Engine 4 y la lógica de juego en C++. Trabaja cómo se siente el vehículo, el ritmo del circuito y el HUD en un cañón de ciencia ficción. Es una muestra jugable, no un juego comercial terminado.",
  "projects.10.description": "Juego de palabras inspirado en el Paraulògic",
  "projects.10.longDescription":
    "Minijuego de palabras en el navegador inspirado en el Paraulògic. Se forman palabras en catalán a partir de un hexágono de letras, con opción de mezclar, borrar y puntuar. Hecho con HTML, CSS y JavaScript.",
  "projects.11.description":
    "Versión anterior del portafolio desarrollada con Angular",
  "projects.11.longDescription":
    "Primer portafolio personal que duró, hecho con Angular, TypeScript y SCSS. Ahí quedó fijada la marca DGM y la forma de contar los proyectos, luego refinada en la web actual en Astro.",
  "projects.12.description": "Minijuego sencillo de minigolf hecho con Unity",
  "projects.12.longDescription":
    "Minijuego sencillo de minigolf hecho con Unity, C# y HLSL. Niveles cortos, tiros arrastrando el ratón y un estilo low-poly alegre. Publicado en itch.io para echar una partida rápida.",
  "projects.13.description":
    "Web para descubrir familias de instrumentos, desarrollada con Angular",
  "projects.13.longDescription":
    "Catálogo en catalán para explorar familias de instrumentos. El frontend, en Angular, muestra fichas que se abren con la descripción, los enlaces y los medios.",
  "projects.14.description":
    "Cuadrícula filtrable de elementos con Isotope (Endesa)",
  "projects.14.longDescription":
    "Cuadrícula filtrable para Endesa con Isotope, jQuery y Handlebars. Se pueden ordenar y explorar valores marcados con colores en un tablero pensado para enseñárselo al cliente.",
  "projects.15.description":
    "Efectos de postprocesado en tiempo real con fragment shaders e ImGui",
  "projects.15.longDescription":
    "Laboratorio de efectos de imagen en tiempo real con C++ y GLSL, y controles con ImGui. Se pueden activar corrección de color, posterización, dithering y pixelado sobre una escena 3D para ver cómo se encadenan.",
  "projects.0.highlights.0":
    "Consola LCARS TNG a pantalla completa para el tiempo de Cabacés",
  "projects.0.highlights.1":
    "Astro y TypeScript con una interfaz LCARS a medida",
  "projects.0.highlights.2":
    "Capturas en directo con CA / ES / EN y unidades métricas o imperiales",
  "projects.1.highlights.0":
    "Visualizador 3D interactivo de eclipses solares y lunares",
  "projects.1.highlights.1":
    "Escala de aula vs escala real, con controles de órbita y cámara",
  "projects.1.highlights.2":
    "React + TypeScript + Three.js (React Three Fiber)",
  "projects.2.highlights.0":
    "Web de marketing para un estudio de movimiento Seitai y katsugen",
  "projects.2.highlights.1":
    "Sitio estático hecho con Astro, TypeScript y Tailwind CSS",
  "projects.2.highlights.2": "En producción en estudiseitai.cat",
  "projects.3.highlights.0":
    "App estática, pensada para el móvil, para encontrar objetos de casa",
  "projects.3.highlights.1":
    "Códigos QR en los espacios y búsqueda aproximada en el navegador",
  "projects.3.highlights.2": "Next.js + TypeScript, desplegada en GitHub Pages",
  "projects.4.highlights.0":
    "App web de lectura rápida basada en la técnica Spritz (RSVP)",
  "projects.4.highlights.1": "Hecha a partir de especificaciones",
  "projects.4.highlights.2": "React + Vite + TypeScript + Tailwind CSS",
  "projects.5.highlights.0":
    "Página interactiva de propuesta con tres minijuegos en Canvas para SEAT",
  "projects.5.highlights.1": "Frontend con Angular y TypeScript",
  "projects.5.highlights.2": "Demo para enseñar una propuesta al cliente",
  "projects.6.highlights.0": "Cronología interactiva de marca para SEAT",
  "projects.6.highlights.1": "Interfaz con Angular y TypeScript",
  "projects.6.highlights.2":
    "Navegación narrativa de momentos históricos de la marca",
  "projects.7.highlights.0":
    "Página promocional con un minijuego de cartas para Orange",
  "projects.7.highlights.1": "Angular y TypeScript con animaciones Lottie",
  "projects.7.highlights.2": "Demo para enseñar una propuesta al cliente",
  "projects.8.highlights.0":
    "App de recomendación de TV para Samsung Smart TV (Tizen)",
  "projects.8.highlights.1": "Hecha con JavaScript, HTML y CSS",
  "projects.8.highlights.2":
    "Proyecto académico pensado para verlo desde el sofá",
  "projects.9.highlights.0":
    "Prototipo de videojuego de carreras con Unreal Engine 4",
  "projects.9.highlights.1": "Mecánicas de juego y sistemas en C++",
  "projects.9.highlights.2":
    "Prototipo académico para probar cómo se siente el coche y el ritmo del circuito",
  "projects.10.highlights.0": "Juego de palabras inspirado en el Paraulògic",
  "projects.10.highlights.1":
    "Implementación ligera con HTML, CSS y JavaScript",
  "projects.10.highlights.2": "Minijuego jugable en el navegador",
  "projects.11.highlights.0":
    "Versión anterior del portafolio personal hecha con Angular",
  "projects.11.highlights.1":
    "Arquitectura de componentes con TypeScript y SCSS",
  "projects.11.highlights.2": "Sustituida por el sitio actual en Astro",
  "projects.12.highlights.0": "Minijuego sencillo de minigolf con Unity",
  "projects.12.highlights.1": "Gameplay y shaders con C# y HLSL",
  "projects.12.highlights.2": "Publicado en itch.io",
  "projects.13.highlights.0": "Catálogo navegable de familias de instrumentos",
  "projects.13.highlights.1": "Frontend con Angular y TypeScript",
  "projects.13.highlights.2":
    "Interfaz para explorar las familias de instrumentos",
  "projects.14.highlights.0":
    "Cuadrícula filtrable de productos/elementos para Endesa",
  "projects.14.highlights.1": "Layout con Isotope, jQuery y Handlebars",
  "projects.14.highlights.2":
    "Encargo para el cliente, pensado para navegar y filtrar",
  "projects.15.highlights.0":
    "Efectos de postprocesado en tiempo real con fragment shaders",
  "projects.15.highlights.1": "C++ y GLSL con controles ImGui",
  "projects.15.highlights.2":
    "Estudio académico de cómo se encadenan los efectos de imagen",

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
  "languages.0.language": "Catalán",
  "languages.0.fluency": "Lengua materna",
  "languages.1.language": "Castellano",
  "languages.1.fluency": "Lengua materna",
  "languages.2.language": "Inglés",
  "languages.2.fluency": "Competencia profesional",

  // ── Certificates ──────────────────────────────────────────────────────────
  "certificates.0.name": "Certificado Cambridge de inglés avanzado (CAE)",
  "certificates.1.name": "CCNA Routing and Switching: Introducción a las redes",
  "certificates.2.name": "ATC (3ds Max)",

  // ── 404 page ───────────────────────────────────────────────────────────────
  "ui.404.message": "Página no encontrada",
  "ui.404.nav.aria": "Navegación rápida",
  "ui.404.back": "← Volver al inicio",
  "ui.404.hint": "Juega con el 404",
};
