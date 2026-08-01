/**
 * Catalan translations — flat Record<key, string>.
 * Keys use dot notation mirroring the cv.json structure + a "ui." namespace for static strings.
 * Loaded client-side by LanguageToggle.astro and applied to [data-i18n] elements.
 */
import type { I18nKey } from "./en";

export const CA: Record<I18nKey, string> = {
  // ── Navigation ────────────────────────────────────────────────────────────
  "ui.nav.about": "Sobre mi",
  "ui.nav.projects": "Projectes",
  "ui.nav.work": "Experiència",
  "ui.nav.contact": "Contacte",

  // ── Home page ─────────────────────────────────────────────────────────────
  "ui.home.greeting": "Hola, sóc en",
  "ui.home.cta": "Contacta'm",
  "ui.home.cta.work": "Explora els meus projectes",
  "ui.home.typewriter.0": "DESENVOLUPADOR FRONTEND",
  "ui.home.typewriter.1": "ENGINYER DE SOFTWARE",
  "ui.home.typewriter.2": "ESPECIALISTA EN REACT",
  "ui.home.typewriter.3": "CLARINETISTA",
  "ui.home.typewriter.4": "AMANT DE LA MUNTANYA",
  "ui.nextup": "Explora també",
  "ui.nextup.aria": "Pàgines relacionades",
  "ui.nextup.about": "Sobre mi",
  "ui.nextup.work": "La meva experiència",
  "ui.nextup.projects": "Els meus projectes",
  "ui.nextup.contact": "Contacte",

  // ── Page headings ─────────────────────────────────────────────────────────
  "ui.page.about": "Sobre mi",
  "ui.page.work": "Experiència",
  "ui.page.projects": "Projectes",
  "ui.page.contact": "Contacte",

  // ── SEO meta (SSR default locale strings for <title> / description) ───────
  "ui.meta.portfolio": "Portafoli",
  "ui.meta.defaultDescription":
    "Portafoli personal de David Gimeno Mañé — Desenvolupador Frontend a Barcelona.",
  "ui.meta.about.description":
    "Sobre David Gimeno Mañé — Desenvolupador Frontend a Barcelona. Descobreix la meva història, habilitats i trajectòria professional.",
  "ui.meta.work.description":
    "Experiència professional de David Gimeno Mañé — Desenvolupador Frontend a Barcelona.",
  "ui.meta.projects.description":
    "Portafoli de projectes de desenvolupament web de David Gimeno Mañé — Desenvolupador Frontend a Barcelona.",
  "ui.meta.projects.listName": "Portafoli de projectes",
  "ui.meta.contact.description":
    "Contacta amb David Gimeno Mañé — Desenvolupador Frontend a Barcelona. Treballem junts.",
  "ui.meta.404.title": "404 — Pàgina no trobada",

  // ── Projects categories ─────────────────────────────────────────────────────
  "ui.projects.category.professional": "Professional",
  "ui.projects.category.personal": "Personal",
  "ui.projects.category.academic": "Acadèmic",
  "ui.projects.back": "Tots els projectes",
  "ui.projects.visit": "Visita el projecte",
  "ui.projects.github": "Veure a GitHub",
  "ui.projects.tech": "Tecnologies",
  "ui.projects.highlights": "Destacats",
  "ui.projects.prev": "Anterior",
  "ui.projects.next": "Següent",
  "ui.a11y.projectNav": "Navegació entre projectes",

  // ── About section headings ────────────────────────────────────────────────
  "ui.about.summary": "Resum",
  "ui.about.skills": "Habilitats",
  "ui.about.languages": "Idiomes",
  "ui.about.education": "Formació",
  "ui.about.certificates": "Certificats",
  "ui.about.printcv": "Imprimir CV",
  "ui.about.experience": "Experiència", // print-only

  // ── Cookie consent ──────────────────────────────────────────────────────────
  "ui.cookies.message":
    "Aquest lloc utilitza analítiques anònimes per millorar l'experiència.",
  "ui.cookies.learnmore": "Més informació",
  "ui.cookies.accept": "Acceptar",
  "ui.cookies.reject": "Rebutjar",

  // ── Accessibility ──────────────────────────────────────────────────────────
  "ui.a11y.opensNewTab": "(s'obre en una pestanya nova)",
  "ui.a11y.cookieNotice": "Avís de cookies",
  "ui.a11y.skipToContent": "Salta al contingut principal",
  "ui.a11y.portraitOf": "Retrat de",
  "ui.a11y.theme.toDark": "Canviar al mode fosc",
  "ui.a11y.theme.toLight": "Canviar al mode clar",
  "ui.a11y.nav.main": "Navegació principal",
  "ui.a11y.nav.home": "Inici",
  "ui.a11y.nav.openMenu": "Obrir menú de navegació",
  "ui.a11y.nav.closeMenu": "Tancar menú de navegació",
  "ui.a11y.nav.mobileMenu": "Menú de navegació",
  "ui.a11y.lang.select": "Seleccionar idioma",
  "ui.a11y.lang.listbox": "Idioma",
  "ui.a11y.footer.social": "Enllaços socials del peu",

  // ── Footer ───────────────────────────────────────────────────────────────────
  "ui.footer.privacy": "Privacitat",
  "ui.footer.builtWith": "Fet amb",
  "ui.footer.cycle.0": "amor ♥",
  "ui.footer.cycle.1": "Astro 🚀",
  "ui.footer.cycle.2": "IA ✦",
  "ui.footer.network.email": "C. electrònic",
  // ── Dates ──────────────────────────────────────────────────────────────────
  "ui.date.present": "Actualitat",
  // ── Privacy page ─────────────────────────────────────────────────────────────
  "ui.page.privacy": "Privacitat",
  "ui.privacy.intro.before": "Aquest lloc utilitza ",
  "ui.privacy.intro.after":
    ", una eina d'analítica de codi obert i respectuosa amb la privacitat. No s'utilitzen galetes i no es recullen dades personals.",
  "ui.privacy.collected.title": "Què recopilem",
  "ui.privacy.collected.0": "Pàgines visitades i rutes de navegació",
  "ui.privacy.collected.1": "URL de referència (d'on véns)",
  "ui.privacy.collected.2": "Navegador i sistema operatiu (genèric)",
  "ui.privacy.collected.3":
    "Tipus de dispositiu (escriptori / mòbil / tauleta)",
  "ui.privacy.collected.4": "País (aproximat, basat en IP anonimitzada)",
  "ui.privacy.collected.5":
    "Idioma preferit del lloc i tema de color (en la visita i quan es canvia)",
  "ui.privacy.notcollected.title": "Què NO recopilem",
  "ui.privacy.notcollected.0": "Sense galetes ni identificadors persistents",
  "ui.privacy.notcollected.1": "Sense dades personals (nom, correu, etc.)",
  "ui.privacy.notcollected.2": "Sense emmagatzematge d'adreça IP",
  "ui.privacy.notcollected.3": "Sense seguiment entre llocs",
  "ui.privacy.notcollected.4": "Sense venda de dades a tercers",
  "ui.privacy.moreinfo": "Més detalls a",
  "ui.privacy.consent":
    "Les analítiques només es carreguen si acceptes el bàner. Si les rebutges, el lloc funciona igual sense carregar Umami.",

  // ── Contact ───────────────────────────────────────────────────────────────
  "ui.contact.intro":
    "Obert a nous projectes i col·laboracions. Escriu-me quan vulguis — normalment responc en menys de 24 hores.",
  "ui.contact.network.email": "Correu electrònic",
  "ui.contact.network.linkedin": "LinkedIn",
  "ui.contact.network.github": "GitHub",

  // ── Basics ───────────────────────────────────────────────────────────────
  "basics.label": "Desenvolupador Frontend",
  "basics.location": "Barcelona · Catalunya",
  "basics.summary.0":
    "Desenvolupador frontend especialitzat en construir interfícies netes i cuidades — des de components reutilitzables fins als detalls que l'usuari percep. M'importa que les experiències funcionin bé i siguin un plaer d'utilitzar.",
  "basics.summary.1":
    "M'adapto de pressa i mantinc la curiositat: segueixo les tendències del sector, les noves eines i com la IA està canviant la manera de desenvolupar.",
  "basics.summary.2":
    "A banda del frontend, treballo amb Unity en projectes interactius i aporto coneixements de modelat 3D — una visió més àmplia que ajuda en productes digitals multidisciplinaris.",

  // ── Work experience ───────────────────────────────────────────────────────
  "work.0.position": "Lead Engineer",
  "work.0.highlights.0":
    "Nou producte Role-Play integrant SCAI (WebSockets) i AI Factory (LLMs de puntuació).",
  "work.0.highlights.1":
    "Components i widgets per a Syntphony Learning Tech (PHP, Moodle, HTML, JavaScript).",
  "work.0.highlights.2":
    "Funcionalitats al portal d'administració de Syntphony Immersive Experiences, incloent login OTP.",
  "work.0.highlights.3":
    "Versió web de Syntphony Immersive Experiences amb WebGL i Unity.",
  "work.0.highlights.4":
    "Documentació de Syntphony Immersive Experiences (Nextra, MD/MDX).",
  "work.0.highlights.5":
    "Migració del design system del portal Syntphony Immersive Experiences.",
  "work.0.highlights.6":
    "Manteniment i optimització de pipelines CI/CD de frontend: tests E2E, tests unitaris i rendiment de build.",

  "work.1.position": "Engineer",
  "work.1.highlights.0":
    "Noves funcionalitats per a l'app mòbil eCliente d'Allianz.",
  "work.1.highlights.1":
    "Curs de fonaments d'Angular per als equips d'Allianz.",
  "work.1.highlights.2":
    "Fluxos d'assegurances XL amb Angular 12, correcció d'errors i refactorització de components (MAPFRE).",
  "work.1.highlights.3":
    "Migració d'estils i funcionalitats del portal Servihabitat amb Liferay (CaixaBank).",
  "work.1.highlights.4":
    "Widget de calendari com a portlet Liferay (Educaixa/CaixaBank).",
  "work.1.highlights.5":
    "SPAs per a llocs Ready-for-Proposal (RFP) amb demos d'alt impacte en Angular 9 (SEAT i Orange).",
  "work.1.highlights.6": "Design system amb Storybook i Stencil.",
  "work.1.highlights.7":
    "Prova de concepte: exportació de design tokens de Figma a un design system.",

  "work.2.position": "Junior Engineer",
  "work.2.highlights.0":
    "Components web reutilitzables amb Angular 8 (Allianz).",
  "work.2.highlights.1":
    "Investigació i proves de concepte per al departament Phygital.",
  "work.2.highlights.2":
    "Apps de formació en VR amb Unity per al projecte USIX 2.0 al sector industrial.",
  "work.2.highlights.3":
    "Configurador de cotxes Casa SEAT amb Adobe Experience Manager (SEAT: CODE).",

  "work.3.position": "Docent",
  "work.3.summary":
    "Docència d'Introducció a Unreal Engine al Màster en Desenvolupament Avançat de Videojocs de La Salle Campus Barcelona.",

  "work.4.position": "Pràctiques",
  "work.4.summary":
    "App de VR (PhygitApp) per mostrar experiències phygital en banca i atenció al client.",

  "work.5.position": "Programador Multimèdia",
  "work.5.summary":
    "Simulació del HUD i les pantalles de cockpit digital d'un nou vehicle SEAT.",

  "work.6.position": "IT Helpdesk",
  "work.6.highlights.0":
    "Resolució d'incidències informàtiques a les oficines de Wanup.",
  "work.6.highlights.1": "Documentació per als equips de Sistemes i Helpdesk.",
  "work.6.highlights.2":
    "Gestió de l'inventari i els subministraments de maquinari d'oficina.",

  "work.7.position": "Pràctiques",
  "work.7.highlights.0": "Nous exercicis d'aprenentatge per als estudiants.",
  "work.7.highlights.1": "Suport a la docència de l'assignatura d'Animació 1.",
  "work.7.highlights.2":
    "Suport a jornades de portes obertes: visites als laboratoris, Q&A i informació per a futurs estudiants.",
  "work.7.highlights.3": "Gestió del material i la logística dels laboratoris.",

  // ── Projects ──────────────────────────────────────────────────────────────
  "projects.0.description": "Web per a un estudi de moviment Seitai i katsugen",
  "projects.0.longDescription":
    "Web de màrqueting per a Estudi Seitai, una pràctica de moviment Seitai i katsugen a Catalunya. Feta com a lloc estàtic ràpid amb Astro, TypeScript i Tailwind, presenta la pràctica, els estudis i el contacte en català, amb un to editorial calmat adequat a la marca.",
  "projects.1.description":
    "App de lectura ràpida amb la tècnica Spritz (desenvolupament guiat per especificacions)",
  "projects.1.longDescription":
    "App de lectura ràpida al navegador basada en la tècnica Spritz (RSVP): les paraules apareixen d'una en una al voltant d'un punt fix perquè es pugui pujar la velocitat sense desplaçar la mirada. Feta amb React, Vite, TypeScript i Tailwind seguint un flux guiat per especificacions, amb canvi d'idioma i velocitats ajustables.",
  "projects.2.description":
    "Pàgina interactiva amb tres minijocs en Canvas (SEAT)",
  "projects.2.longDescription":
    "Experiència interactiva d'RFP per a SEAT amb Angular i Canvas. Els visitants exploren una narrativa de marca a través de tres minijocs que presenten idees de proposta en un format jugable orientat al client, en lloc d'un deck estàtic.",
  "projects.3.description": "Landing page amb un minijoc de cartes (Orange)",
  "projects.3.longDescription":
    "Landing per a Orange amb un minijoc de cartes. Feta amb Angular, TypeScript i animacions Lottie per convertir un pitch d'RFP en una història interactiva sobre serveis centrats en l'usuari.",
  "projects.4.description":
    "Pàgina interactiva amb una cronologia de marca (SEAT)",
  "projects.4.longDescription":
    "Cronologia interactiva de marca per a SEAT que convida a viatjar per cotxes icònics i moments històrics. Una interfície Angular + TypeScript presenta la línia temporal com a narrativa guiada, no com un arxiu estàtic.",
  "projects.5.description":
    "App de recomanació de TV per a Samsung Smart TV (Tizen Studio)",
  "projects.5.longDescription":
    "Experiència de recomanació pensada per a Samsung Smart TV (Tizen). Una interfície JavaScript amicable amb el comandament ajuda a navegar col·leccions de pel·lícules i sèries pensades per al sofà.",
  "projects.6.description":
    "Prototip de videojoc desenvolupat amb Unreal Engine 4",
  "projects.6.longDescription":
    "Prototip acadèmic de curses amb Unreal Engine 4 i sistemes de gameplay en C++. Es centra en el feeling del vehicle, el flux de la pista i el HUD en un entorn de canyó sci-fi — un tall vertical, no un llançament comercial complet.",
  "projects.7.description": "Joc de paraules inspirat en el Paraulògic",
  "projects.7.longDescription":
    "Minijoc de paraules al navegador inspirat en el Paraulògic. Els jugadors formen paraules en català a partir d'un joc hexagonal de lletres, amb barreja, esborrat i puntuació, fet amb HTML, CSS i JavaScript.",
  "projects.8.description":
    "Versió anterior del portfolio desenvolupada amb Angular",
  "projects.8.longDescription":
    "Primer portfolio personal de llarga durada, fet amb Angular, TypeScript i SCSS. Va establir el sistema de marca DGM i els patrons de narració de projectes que després s'han refinat a l'actual lloc en Astro.",
  "projects.9.description":
    "Minijoc hipercasual de minigolf desenvolupat amb Unity",
  "projects.9.longDescription":
    "Minijoc hipercasual de minigolf fet amb Unity, C# i HLSL. Nivells mínims, trets amb clic i arrossegament i una estètica low-poly vivaç — publicat a itch.io com a sessió curta i accessible.",
  "projects.10.description":
    "Web per descobrir famílies d'instruments, desenvolupada amb Angular",
  "projects.10.longDescription":
    "Catàleg en català per explorar famílies d'instruments musicals. Un frontend Angular mostra cartes d'instruments amb panells de detall expansibles per a descripcions, enllaços i mitjans.",
  "projects.11.description":
    "Graella filtrable d'elements amb Isotope (Endesa)",
  "projects.11.longDescription":
    "Graella filtrable d'elements per a Endesa amb Isotope, jQuery i Handlebars. Els visitants ordenen i exploren valors codificats per color en un tauler interactiu dens pensat per a demos de client.",
  "projects.12.description":
    "Efectes de postprocessat en temps real amb fragment shaders i ImGui",
  "projects.12.longDescription":
    "Laboratori de postprocessat en temps real amb C++ i GLSL i controls ImGui. Permet activar efectes com correcció de color, posterització, dithering i pixelització sobre una escena 3D per estudiar pipelines d'efectes d'imatge.",
  "projects.0.highlights.0":
    "Web de màrqueting per a un estudi de moviment Seitai i katsugen",
  "projects.0.highlights.1":
    "Lloc estàtic fet amb Astro, TypeScript i Tailwind CSS",
  "projects.0.highlights.2": "En producció a estudiseitai.cat",
  "projects.1.highlights.0":
    "App web de lectura ràpida basada en la tècnica Spritz (RSVP)",
  "projects.1.highlights.1":
    "Desenvolupada amb un flux de treball guiat per especificacions",
  "projects.1.highlights.2": "React + Vite + TypeScript + Tailwind CSS",
  "projects.2.highlights.0":
    "Pàgina interactiva de proposta amb tres minijocs en Canvas per a SEAT",
  "projects.2.highlights.1": "Frontend amb Angular i TypeScript",
  "projects.2.highlights.2": "Demo orientada al client per a un RFP",
  "projects.3.highlights.0":
    "Experiència de landing amb un minijoc de cartes per a Orange",
  "projects.3.highlights.1": "Angular i TypeScript amb animacions Lottie",
  "projects.3.highlights.2": "Demo orientada al client per a un RFP",
  "projects.4.highlights.0": "Cronologia interactiva de marca per a SEAT",
  "projects.4.highlights.1": "Interfície amb Angular i TypeScript",
  "projects.4.highlights.2":
    "Navegació narrativa de moments històrics de la marca",
  "projects.5.highlights.0":
    "App de recomanació de TV per a Samsung Smart TV (Tizen)",
  "projects.5.highlights.1": "Feta amb JavaScript, HTML i CSS",
  "projects.5.highlights.2":
    "Projecte acadèmic centrat en l'experiència de saló",
  "projects.6.highlights.0":
    "Prototip de videojoc de curses amb Unreal Engine 4",
  "projects.6.highlights.1": "Gameplay i sistemes en C++",
  "projects.6.highlights.2":
    "Prototip acadèmic per explorar sensació de vehicle i ritme de pista",
  "projects.7.highlights.0": "Joc de paraules inspirat en el Paraulògic",
  "projects.7.highlights.1":
    "Implementació lleugera amb HTML, CSS i JavaScript",
  "projects.7.highlights.2": "Minijoc jugable al navegador",
  "projects.8.highlights.0":
    "Versió anterior del portfolio personal feta amb Angular",
  "projects.8.highlights.1": "Arquitectura de components amb TypeScript i SCSS",
  "projects.8.highlights.2": "Substituïda per l'actual lloc en Astro",
  "projects.9.highlights.0": "Minijoc hipercasual de minigolf amb Unity",
  "projects.9.highlights.1": "Gameplay i shaders amb C# i HLSL",
  "projects.9.highlights.2": "Publicat a itch.io",
  "projects.10.highlights.0": "Catàleg navegable de famílies d'instruments",
  "projects.10.highlights.1": "Frontend amb Angular i TypeScript",
  "projects.10.highlights.2":
    "Interfície exploratòria per a una taxonomia d'instruments",
  "projects.11.highlights.0":
    "Graella filtrable de productes/elements per a Endesa",
  "projects.11.highlights.1": "Layout amb Isotope, jQuery i Handlebars",
  "projects.11.highlights.2":
    "Entrega de client centrada en la navegació i el filtratge",
  "projects.12.highlights.0":
    "Efectes de postprocessat en temps real amb fragment shaders",
  "projects.12.highlights.1": "C++ i GLSL amb controls ImGui",
  "projects.12.highlights.2":
    "Exploració acadèmica de pipelines d'efectes d'imatge",

  // ── Education ─────────────────────────────────────────────────────────────
  "education.0.studyType": "Màster en Desenvolupament Avançat de Videojocs",
  "education.0.area": "Desenvolupament de Videojocs",
  "education.1.studyType": "Grau en Enginyeria Multimèdia",
  "education.1.area": "Enginyeria Multimèdia",
  "education.2.studyType": "CFGS en Realització en So",
  "education.2.area": "Enginyeria de So",

  // ── Skills ────────────────────────────────────────────────────────────────
  "skills.0.name": "Desenvolupament Web",
  "skills.0.level": "Expert",
  "skills.1.name": "Frameworks",
  "skills.1.level": "Expert",
  "skills.2.name": "Eines i DevOps",
  "skills.2.level": "Avançat",
  "skills.3.name": "3D i Interactius",
  "skills.3.level": "Avançat",
  "skills.4.name": "Integració d'IA",
  "skills.4.level": "Intermedi",

  // ── Languages ─────────────────────────────────────────────────────────────
  "languages.0.language": "Català",
  "languages.0.fluency": "Llengua materna",
  "languages.1.language": "Castellà",
  "languages.1.fluency": "Llengua materna",
  "languages.2.language": "Anglès",
  "languages.2.fluency": "Competència professional",

  // ── Certificates ──────────────────────────────────────────────────────────
  "certificates.0.name": "Certificat Cambridge d'anglès avançat (CAE)",
  "certificates.1.name": "CCNA Routing and Switching: Introducció a les xarxes",
  "certificates.2.name": "ATC (3Ds Max)",

  // ── 404 page ───────────────────────────────────────────────────────────────
  "ui.404.message": "Pàgina no trobada",
  "ui.404.nav.aria": "Navegació ràpida",
  "ui.404.back": "← Tornar a l'inici",
};
