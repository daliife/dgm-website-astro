/**
 * Catalan translations — flat Record<key, string>.
 * Keys use dot notation mirroring the cv.json structure + a "ui." namespace for static strings.
 * Loaded client-side by LanguageToggle.astro and applied to [data-i18n] elements.
 */
export const CA: Record<string, string> = {
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

  // ── Page headings ─────────────────────────────────────────────────────────
  "ui.page.about": "Sobre mi",
  "ui.page.work": "Experiència",
  "ui.page.projects": "Projectes",
  "ui.page.contact": "Contacte",

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

  // ── Privacy page ─────────────────────────────────────────────────────────────
  "ui.page.privacy": "Privacitat",
  "ui.privacy.intro":
    "Aquest lloc utilitza Umami, una eina d'analítica de codi obert i respectuosa amb la privacitat. No s'utilitzen galetes i no es recullen dades personals.",
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
    "T'interessa col·laborar? No dubtis a contactar-me a través de qualsevol dels canals següents.",

  // ── Basics ───────────────────────────────────────────────────────────────
  "basics.label": "Desenvolupador Frontend",
  "basics.location": "Barcelona · Catalunya",
  "basics.summary.0":
    "Sóc Desenvolupador Frontend especialitzat en construir interfícies netes, accessibles i cuidades al detall. M'importa que les experiències no només funcionin bé, sinó que siguin un gust de fer servir — des de l'arquitectura de components fins a l'últim píxel.",
  "basics.summary.1":
    "Aprenc de pressa i m'agrada estar al dia: segueixo de prop les tendències del sector, les noves eines i com la intel·ligència artificial està canviant la manera de desenvolupar.",
  "basics.summary.2":
    "Més enllà del frontend, treballo amb Unity en projectes interactius i tinc coneixements de modelat 3D, cosa que em permet aportar una visió més àmplia a qualsevol producte digital.",

  // ── Work experience ───────────────────────────────────────────────────────
  "work.0.position": "Lead Engineer",
  "work.0.highlights.0":
    "Desenvolupament d'un nou producte de Role-Plays, integrant SCAI (WebSockets) i AI Factory (LLMs de puntuació).",
  "work.0.highlights.1":
    "Creació de components i widgets per a Syntphony Learning Tech (PHP, Moodle, HTML, JavaScript).",
  "work.0.highlights.2":
    "Implementació de funcionalitats al portal d'administració de Syntphony Immersive Experiences, incloent login OTP.",
  "work.0.highlights.3":
    "Desenvolupament d'una versió web de Syntphony Immersive Experiences amb WebGL i Unity.",
  "work.0.highlights.4":
    "Manteniment de la documentació de Syntphony Immersive Experiences (Nextra, MD/MDX).",
  "work.0.highlights.5":
    "Migració del Design System del portal Syntphony Immersive Experiences.",
  "work.0.highlights.6":
    "Manteniment i optimització de pipelines CI/CD de frontend: e2e tests, tests unitaris i optimització de build.",

  "work.1.position": "Engineer",
  "work.1.highlights.0":
    "Desenvolupament de noves funcionalitats per a l'app mòbil 'eCliente' per a Allianz.",
  "work.1.highlights.1":
    "Impartició del curs 'Angular basics' per als treballadors d'Allianz.",
  "work.1.highlights.2":
    "Implementació del negoci d'assegurances XL amb Angular 12, correccions d'errors i refactorització de components (MAPFRE).",
  "work.1.highlights.3":
    "Migració d'estils i funcionalitats del portal Servihabitat amb Liferay (Caixabank).",
  "work.1.highlights.4":
    "Creació d'un widget de calendari en un portlet Liferay (Educaixa/Caixabank).",
  "work.1.highlights.5":
    "Creació de diverses SPAs per a llocs web de tipus RFP amb un alt 'efecte wow' en Angular 9 (SEAT i Orange).",
  "work.1.highlights.6":
    "Creació d'un Design System usant Storybooks i Stencil.",
  "work.1.highlights.7":
    "PoC: exportació de design tokens amb Figma a un Design System.",

  "work.2.position": "Junior Engineer",
  "work.2.highlights.0":
    "Creació de blocs de construcció (components web) amb Angular 8 (Allianz).",
  "work.2.highlights.1":
    "Aprenentatge i creació de PoC per al departament Phygital.",
  "work.2.highlights.2":
    "Desenvolupament d'aplicacions VR amb Unity per al projecte USIX2.0, una app de formació per al sector industrial.",
  "work.2.highlights.3":
    "Desenvolupament web amb Adobe Experience Manager per al projecte CasaSeat Retail Car Configurator (SEAT: CODE).",

  "work.3.position": "Docent",
  "work.3.summary":
    "Professor de l'assignatura 'Introducció a Unreal Engine' al Màster en Desenvolupament Avançat de Videojocs de La Salle Campus BCN.",

  "work.4.position": "Pràctiques",
  "work.4.summary":
    "Creació d'una aplicació de VR (PhygitApp) per mostrar el potencial de les experiències Phygital en el món de la banca i l'atenció al client.",

  "work.5.position": "Programador Multimèdia",
  "work.5.summary":
    "Simulació del HUD i les pantalles de cockpit digital d'un nou cotxe per al client SEAT.",

  "work.6.position": "IT Helpdesk",
  "work.6.highlights.0":
    "Resolució de problemes informàtics a les oficines de Wanup.",
  "work.6.highlights.1":
    "Creació de documentació relacionada amb els departaments de Sistemes i Helpdesk.",
  "work.6.highlights.2":
    "Control i verificació del material de maquinari de l'oficina.",

  "work.7.position": "Pràctiques",
  "work.7.highlights.0":
    "Creació de nous exercicis didàctics per als estudiants.",
  "work.7.highlights.1":
    "Suport al professor en l'ensenyament parcial de l'assignatura d'Animació 1.",
  "work.7.highlights.2":
    "A les jornades de portes obertes, donava suport oferint informació, mostrant els laboratoris i responent preguntes de futurs estudiants.",
  "work.7.highlights.3": "Control de material i logística dels laboratoris.",

  // ── Projects ──────────────────────────────────────────────────────────────
  "projects.0.description":
    "Projecte professional (NTT Data · SEAT) — pàgina web interactiva amb 3 minijocs en Canvas",
  "projects.1.description":
    "Projecte professional (NTT Data · Orange) — pàgina de presentació amb un minijoc de cartes",
  "projects.2.description":
    "Projecte professional (NTT Data · SEAT) — pàgina web interactiva amb un timeline de cronologia",
  "projects.3.description":
    "Projecte universitari — app recomanadora de TV per a Samsung Smart TV amb Tizen Studio",
  "projects.4.description":
    "Projecte de màster — prototip de videojoc desenvolupat amb Unreal Engine 4",
  "projects.5.description":
    "Projecte personal — adaptació del joc de paraules 'Paraulògic'",
  "projects.6.description":
    "Projecte personal — versió anterior del meu portfolio desenvolupada amb Angular",
  "projects.7.description":
    "Projecte de màster — videojoc hipercasual de minigolf desenvolupat amb Unity",
  "projects.8.description":
    "Projecte personal — web per descobrir famílies d'instruments, desenvolupada amb Angular",
  "projects.9.description":
    "Projecte professional (NTT Data · Endesa) — graella filtrable d'elements amb Isotope",
  "projects.10.description":
    "Projecte de màster — efectes de postprocessat en temps real amb fragment shaders i ImGui",

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
};
