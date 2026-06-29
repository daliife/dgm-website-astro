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
  "ui.nextup": "Explora també",
  "ui.nextup.about": "Sobre mi",
  "ui.nextup.work": "La meva experiència",
  "ui.nextup.projects": "Els meus projectes",
  "ui.nextup.contact": "Contacte",

  // ── Page headings ─────────────────────────────────────────────────────────
  "ui.page.about": "Sobre mi",
  "ui.page.work": "Experiència",
  "ui.page.projects": "Projectes",
  "ui.page.contact": "Contacte",

  // ── Projects categories ─────────────────────────────────────────────────────
  "ui.projects.category.professional": "Professional",
  "ui.projects.category.personal": "Personal",
  "ui.projects.category.academic": "Acadèmic",

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
  "ui.cookies.dismiss": "Entès",

  // ── Footer ───────────────────────────────────────────────────────────────────
  "ui.footer.privacy": "Privacitat",
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
  "ui.privacy.notcollected.title": "Què NO recopilem",
  "ui.privacy.notcollected.0": "Sense galetes ni identificadors persistents",
  "ui.privacy.notcollected.1": "Sense dades personals (nom, correu, etc.)",
  "ui.privacy.notcollected.2": "Sense emmagatzematge d'adreça IP",
  "ui.privacy.notcollected.3": "Sense seguiment entre llocs",
  "ui.privacy.notcollected.4": "Sense venda de dades a tercers",
  "ui.privacy.moreinfo": "Més detalls a",

  // ── Contact ───────────────────────────────────────────────────────────────
  "ui.contact.intro":
    "Obert a nous projectes i col·laboracions. Escriu-me quan vulguis — sol respondre en menys de 24 hores.",

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
  "projects.1.description":
    "App de lectura ràpida amb la tècnica Spritz (desenvolupament guiat per especificacions)",
  "projects.2.description":
    "Pàgina interactiva amb tres minijocs en Canvas (SEAT)",
  "projects.3.description": "Landing page amb un minijoc de cartes (Orange)",
  "projects.4.description":
    "Pàgina interactiva amb una cronologia de marca (SEAT)",
  "projects.5.description":
    "App de recomanació de TV per a Samsung Smart TV (Tizen Studio)",
  "projects.6.description":
    "Prototip de videojoc desenvolupat amb Unreal Engine 4",
  "projects.7.description": "Joc de paraules inspirat en el Paraulògic",
  "projects.8.description":
    "Versió anterior del portfolio desenvolupada amb Angular",
  "projects.9.description":
    "Minijoc hipercasual de minigolf desenvolupat amb Unity",
  "projects.10.description":
    "Web per descobrir famílies d'instruments, desenvolupada amb Angular",
  "projects.11.description":
    "Graella filtrable d'elements amb Isotope (Endesa)",
  "projects.12.description":
    "Efectes de postprocessat en temps real amb fragment shaders i ImGui",

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
  "languages.0.fluency": "Llengua materna",
  "languages.1.fluency": "Llengua materna",
  "languages.2.fluency": "Competència professional",

  // ── 404 page ───────────────────────────────────────────────────────────────
  "ui.404.message": "Pàgina no trobada",
  "ui.404.back": "← Tornar a l'inici",
};
