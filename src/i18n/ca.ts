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
  "ui.nav.experience": "Experiència",
  "ui.nav.contact": "Contacte",

  // ── Home page ─────────────────────────────────────────────────────────────
  "ui.home.cta": "Contacta'm",
  "ui.home.cta.work": "Explora els meus projectes",
  "ui.home.typewriter.0": "Desenvolupador frontend",
  "ui.home.typewriter.1": "Enginyer de software",
  "ui.home.typewriter.2": "Clarinetista",
  "ui.home.typewriter.3": "Amant de la muntanya",
  "ui.nextup": "Explora també",
  "ui.nextup.aria": "Pàgines relacionades",
  "ui.nextup.about": "Sobre mi",
  "ui.nextup.experience": "La meva experiència",
  "ui.nextup.projects": "Els meus projectes",
  "ui.nextup.contact": "Contacte",

  // ── Page headings ─────────────────────────────────────────────────────────
  "ui.page.about": "Sobre mi",
  "ui.page.experience": "Experiència",
  "ui.page.projects": "Projectes",
  "ui.page.contact": "Contacte",

  // ── SEO meta (SSR default locale strings for <title> / description) ───────
  "ui.meta.portfolio": "Portfoli",
  "ui.meta.defaultDescription":
    "Portfoli personal de David Gimeno Mañé — Desenvolupador Frontend a Barcelona.",
  "ui.meta.about.description":
    "Sobre David Gimeno Mañé — Desenvolupador Frontend a Barcelona. Trajectòria, habilitats i experiència.",
  "ui.meta.experience.description":
    "Experiència professional de David Gimeno Mañé — Desenvolupador Frontend a Barcelona.",
  "ui.meta.projects.description":
    "Projectes web de David Gimeno Mañé — Desenvolupador Frontend a Barcelona.",
  "ui.meta.projects.listName": "Projectes",
  "ui.meta.contact.description":
    "Contacta amb David Gimeno Mañé — Desenvolupador Frontend a Barcelona.",
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
  "ui.a11y.breadcrumb": "Fil d'Ariadna",

  // ── About section headings ────────────────────────────────────────────────
  "ui.about.summary": "Resum",
  "ui.about.skills": "Habilitats",
  "ui.about.languages": "Idiomes",
  "ui.about.education": "Formació",
  "ui.about.certificates": "Certificats",
  "ui.about.printcv": "Imprimir CV",
  "ui.about.stats": "En xifres",
  "ui.about.stats.years": "Anys d'experiència",
  "ui.about.stats.projects": "Projectes",
  "ui.about.stats.technologies": "Tecnologies",
  "ui.about.experience": "Experiència", // print-only

  // ── Cookie consent ──────────────────────────────────────────────────────────
  "ui.cookies.message":
    "Aquest lloc recull estadístiques anònimes per millorar l'experiència.",
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
  "ui.footer.network.email": "Correu",
  // ── Dates ──────────────────────────────────────────────────────────────────
  "ui.date.present": "Actualitat",
  // ── Privacy page ─────────────────────────────────────────────────────────────
  "ui.page.privacy": "Privacitat",
  "ui.privacy.intro.before": "Aquest lloc utilitza ",
  "ui.privacy.intro.after":
    ", una eina d'estadístiques de codi obert que respecta la privacitat. No fa servir galetes ni recull dades personals.",
  "ui.privacy.collected.title": "Què recopilem",
  "ui.privacy.collected.0": "Pàgines vistes i recorregut pel web",
  "ui.privacy.collected.1": "Pàgina de procedència",
  "ui.privacy.collected.2": "Navegador i sistema operatiu, sense detall",
  "ui.privacy.collected.3":
    "Tipus de dispositiu (escriptori / mòbil / tauleta)",
  "ui.privacy.collected.4": "País (aproximat, basat en IP anonimitzada)",
  "ui.privacy.collected.5":
    "Idioma del web i mode clar o fosc (en entrar i quan es canvia)",
  "ui.privacy.notcollected.title": "Què NO recopilem",
  "ui.privacy.notcollected.0": "Sense galetes ni identificadors persistents",
  "ui.privacy.notcollected.1": "Sense dades personals (nom, correu, etc.)",
  "ui.privacy.notcollected.2": "Sense emmagatzematge d'adreça IP",
  "ui.privacy.notcollected.3": "Sense rastreig entre webs",
  "ui.privacy.notcollected.4": "Sense venda de dades a tercers",
  "ui.privacy.moreinfo": "Més detalls a",
  "ui.privacy.consent":
    "Les estadístiques només es carreguen si acceptes l'avís. Si el rebutges, el web funciona igual i no carrega Umami.",

  // ── Contact ───────────────────────────────────────────────────────────────
  "ui.contact.intro":
    "Estic obert a projectes i col·laboracions. Escriu-me quan vulguis: normalment responc en menys de 24 hores.",
  "ui.contact.network.email": "Correu electrònic",
  "ui.contact.network.linkedin": "LinkedIn",
  "ui.contact.network.github": "GitHub",
  "ui.contact.copy": "Copia el correu",
  "ui.contact.copied": "Copiat",

  // ── Basics ───────────────────────────────────────────────────────────────
  "basics.label": "Desenvolupador Frontend",
  "basics.location": "Barcelona · Catalunya",
  "basics.summary.0":
    "Desenvolupador frontend. Faig interfícies netes i cuidades, dels components que es reutilitzen als detalls que es noten. M'importa que funcionin bé i que agradi fer-les servir.",
  "basics.summary.1":
    "M'adapto de pressa i mantinc la curiositat: segueixo les novetats del sector, les eines noves i com la IA està canviant la manera de programar.",
  "basics.summary.2":
    "A més del frontend, treballo amb Unity en projectes interactius i sé modelar en 3D. Aquesta mirada més àmplia ajuda quan un producte barreja disciplines.",

  // ── Work experience ───────────────────────────────────────────────────────
  "work.0.position": "Lead Engineer",
  "work.0.highlights.0":
    "Nou producte Role-Play que integra SCAI (WebSockets) i AI Factory (models de llenguatge per puntuar).",
  "work.0.highlights.1":
    "Components i widgets per a Syntphony Learning Tech (PHP, Moodle, HTML, JavaScript).",
  "work.0.highlights.2":
    "Funcionalitats al portal d'administració de Syntphony Immersive Experiences, amb inici de sessió per OTP.",
  "work.0.highlights.3":
    "Versió web de Syntphony Immersive Experiences amb WebGL i Unity.",
  "work.0.highlights.4":
    "Documentació de Syntphony Immersive Experiences (Nextra, MD/MDX).",
  "work.0.highlights.5":
    "Migració del design system del portal Syntphony Immersive Experiences.",
  "work.0.highlights.6":
    "Manteniment i optimització dels pipelines CI/CD de frontend: tests E2E, tests unitaris i temps de compilació.",

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
    "Aplicacions per a propostes comercials (RFP), amb demos potents en Angular 9 (SEAT i Orange).",
  "work.1.highlights.6": "Design system amb Storybook i Stencil.",
  "work.1.highlights.7":
    "Prova de concepte: exportació de design tokens de Figma a un design system.",

  "work.2.position": "Junior Engineer",
  "work.2.highlights.0":
    "Components web reutilitzables amb Angular 8 (Allianz).",
  "work.2.highlights.1":
    "Investigació i proves de concepte per al departament Phygital.",
  "work.2.highlights.2":
    "Aplicacions de formació en RV amb Unity per al projecte USIX 2.0 al sector industrial.",
  "work.2.highlights.3":
    "Configurador de cotxes Casa SEAT amb Adobe Experience Manager (SEAT: CODE).",

  "work.3.position": "Docent",
  "work.3.summary":
    "Docència d'Introducció a Unreal Engine al Màster en Desenvolupament Avançat de Videojocs de La Salle Campus Barcelona.",

  "work.4.position": "Pràctiques",
  "work.4.summary":
    "App de RV (PhygitApp) per mostrar experiències phygital en banca i atenció al client.",

  "work.5.position": "Programador Multimèdia",
  "work.5.summary":
    "Simulació del HUD i les pantalles de la cabina digital d'un vehicle nou de SEAT.",

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
    "Suport a les jornades de portes obertes: visites als laboratoris, preguntes i informació per a futurs estudiants.",
  "work.7.highlights.3": "Gestió del material i la logística dels laboratoris.",

  // ── Projects ──────────────────────────────────────────────────────────────
  "projects.0.description":
    "Consola meteorològica LCARS (TNG) per a una estació a Cabacés",
  "projects.0.longDescription":
    "El temps d'una estació meteorològica de pati a Cabacés (Priorat), amb l'aspecte d'una consola d'operacions LCARS de Star Trek TNG a pantalla completa. Condicions en directe, previsió i històric de Weather Underground (amb alternativa a Open-Meteo), textos en català, castellà i anglès, i unitats mètriques o imperials. Lloc estàtic amb Astro, TypeScript i una interfície LCARS feta a mida. És un projecte de fan, sense cap vincle amb Paramount ni Weather Underground.",
  "projects.1.description":
    "Visualitzador 3D interactiu d'eclipsis solars i lunars",
  "projects.1.longDescription":
    "Visualitzador 3D interactiu d'eclipsis solars i lunars. Les distàncies i les mides surten a escala d'aula perquè es vegi la inclinació orbital de 5° de la Lluna, amb una opció per passar a l'escala real. Fet amb React, TypeScript, Three.js i React Three Fiber. S'obre aturat a l'eclipsi solar total del 12 d'agost de 2026, amb la interfície en anglès i català.",
  "projects.2.description": "Web per a un estudi de moviment Seitai i katsugen",
  "projects.2.longDescription":
    "Web de màrqueting per a Estudi Seitai, un estudi de moviment Seitai i katsugen a Catalunya. Lloc estàtic i ràpid amb Astro, TypeScript i Tailwind. Explica la pràctica, els espais i el contacte en català, amb un to tranquil que encaixa amb la marca.",
  "projects.3.description":
    "App estàtica pensada per al mòbil per trobar objectes de casa amb espais marcats amb QR",
  "projects.3.longDescription":
    "App web estàtica, pensada per al mòbil, per trobar on tens guardades les coses de casa. Enganxes un QR als armaris i les calaixeres, l'escanejes i cerques per paraula, amb una cerca aproximada que es fa al navegador. Feta amb Next.js, TypeScript i Tailwind CSS, amb l'inventari en català i la interfície en català, castellà i anglès. Publicada com a PWA estàtica a GitHub Pages.",
  "projects.4.description":
    "App de lectura ràpida amb la tècnica Spritz, feta a partir d'especificacions",
  "projects.4.longDescription":
    "App de lectura ràpida al navegador amb la tècnica Spritz (RSVP): les paraules surten d'una en una al voltant d'un punt fix, per llegir més de pressa sense moure els ulls. Feta amb React, Vite, TypeScript i Tailwind a partir d'especificacions, amb canvi d'idioma i velocitat ajustable.",
  "projects.5.description":
    "Pàgina interactiva amb tres minijocs en Canvas (SEAT)",
  "projects.5.longDescription":
    "Proposta interactiva per a SEAT amb Angular i Canvas. Qui la visita recorre la marca amb tres minijocs, en comptes d'una presentació estàtica.",
  "projects.6.description":
    "Pàgina interactiva amb una cronologia de marca (SEAT)",
  "projects.6.longDescription":
    "Cronologia de marca per a SEAT per recórrer cotxes icònics i moments de la història. La interfície, en Angular i TypeScript, explica la línia del temps pas a pas, no com un arxiu quiet.",
  "projects.7.description":
    "Pàgina promocional amb un minijoc de cartes (Orange)",
  "projects.7.longDescription":
    "Pàgina promocional per a Orange amb un minijoc de cartes. Feta amb Angular, TypeScript i animacions Lottie, converteix una proposta comercial en una història interactiva sobre serveis pensats per a qui els fa servir.",
  "projects.8.description":
    "App de recomanació de TV per a Samsung Smart TV (Tizen Studio)",
  "projects.8.longDescription":
    "Recomanador pensat per a Samsung Smart TV (Tizen). La interfície, en JavaScript i còmoda amb el comandament, serveix per triar pel·lícules i sèries des del sofà.",
  "projects.9.description":
    "Prototip de videojoc desenvolupat amb Unreal Engine 4",
  "projects.9.longDescription":
    "Prototip acadèmic de curses amb Unreal Engine 4 i la lògica de joc en C++. Treballa com se sent el vehicle, el ritme del circuit i el HUD en un canyó de ciència-ficció. És una mostra jugable, no un joc comercial acabat.",
  "projects.10.description": "Joc de paraules inspirat en el Paraulògic",
  "projects.10.longDescription":
    "Minijoc de paraules al navegador inspirat en el Paraulògic. Es formen paraules en català a partir d'un hexàgon de lletres, amb opció de barrejar, esborrar i puntuar. Fet amb HTML, CSS i JavaScript.",
  "projects.11.description": "Versió anterior del portfoli, feta amb Angular",
  "projects.11.longDescription":
    "Primer portfoli personal que va durar, fet amb Angular, TypeScript i SCSS. Hi va quedar fixada la marca DGM i la manera d'explicar els projectes, després refinada al web actual en Astro.",
  "projects.12.description": "Minijoc senzill de minigolf fet amb Unity",
  "projects.12.longDescription":
    "Minijoc senzill de minigolf fet amb Unity, C# i HLSL. Nivells curts, tirs arrossegant el ratolí i un estil low-poly alegre. Publicat a itch.io per fer una partida ràpida.",
  "projects.13.description":
    "Web per descobrir famílies d'instruments, desenvolupada amb Angular",
  "projects.13.longDescription":
    "Catàleg en català per explorar famílies d'instruments. El frontend, en Angular, mostra fitxes que s'obren amb la descripció, els enllaços i els mitjans.",
  "projects.14.description":
    "Graella filtrable d'elements amb Isotope (Endesa)",
  "projects.14.longDescription":
    "Graella filtrable per a Endesa amb Isotope, jQuery i Handlebars. Es poden ordenar i explorar valors marcats per colors en un tauler pensat per ensenyar-lo al client.",
  "projects.15.description":
    "Efectes de postprocessat en temps real amb fragment shaders i ImGui",
  "projects.15.longDescription":
    "Laboratori d'efectes d'imatge en temps real amb C++ i GLSL, i controls amb ImGui. S'hi poden activar correcció de color, posterització, dithering i pixelat sobre una escena 3D per veure com s'encadenen.",
  "projects.0.highlights.0":
    "Consola LCARS TNG a pantalla completa per al temps de Cabacés",
  "projects.0.highlights.1":
    "Astro i TypeScript amb una interfície LCARS a mida",
  "projects.0.highlights.2":
    "Captures en directe amb CA / ES / EN i unitats mètriques o imperials",
  "projects.1.highlights.0":
    "Visualitzador 3D interactiu d'eclipsis solars i lunars",
  "projects.1.highlights.1":
    "Escala d'aula vs escala real, amb controls d'òrbita i càmera",
  "projects.1.highlights.2":
    "React + TypeScript + Three.js (React Three Fiber)",
  "projects.2.highlights.0":
    "Web de màrqueting per a un estudi de moviment Seitai i katsugen",
  "projects.2.highlights.1":
    "Lloc estàtic fet amb Astro, TypeScript i Tailwind CSS",
  "projects.2.highlights.2": "En producció a estudiseitai.cat",
  "projects.3.highlights.0":
    "App estàtica, pensada per al mòbil, per trobar objectes de casa",
  "projects.3.highlights.1":
    "Codis QR als espais i cerca aproximada al navegador",
  "projects.3.highlights.2": "Next.js + TypeScript, desplegada a GitHub Pages",
  "projects.4.highlights.0":
    "App web de lectura ràpida basada en la tècnica Spritz (RSVP)",
  "projects.4.highlights.1": "Feta a partir d'especificacions",
  "projects.4.highlights.2": "React + Vite + TypeScript + Tailwind CSS",
  "projects.5.highlights.0":
    "Pàgina interactiva de proposta amb tres minijocs en Canvas per a SEAT",
  "projects.5.highlights.1": "Frontend amb Angular i TypeScript",
  "projects.5.highlights.2": "Demo per ensenyar una proposta al client",
  "projects.6.highlights.0": "Cronologia interactiva de marca per a SEAT",
  "projects.6.highlights.1": "Interfície amb Angular i TypeScript",
  "projects.6.highlights.2":
    "Navegació narrativa de moments històrics de la marca",
  "projects.7.highlights.0":
    "Pàgina promocional amb un minijoc de cartes per a Orange",
  "projects.7.highlights.1": "Angular i TypeScript amb animacions Lottie",
  "projects.7.highlights.2": "Demo per ensenyar una proposta al client",
  "projects.8.highlights.0":
    "App de recomanació de TV per a Samsung Smart TV (Tizen)",
  "projects.8.highlights.1": "Feta amb JavaScript, HTML i CSS",
  "projects.8.highlights.2":
    "Projecte acadèmic pensat per veure'l des del sofà",
  "projects.9.highlights.0":
    "Prototip de videojoc de curses amb Unreal Engine 4",
  "projects.9.highlights.1": "Mecàniques de joc i sistemes en C++",
  "projects.9.highlights.2":
    "Prototip acadèmic per provar com se sent el cotxe i el ritme del circuit",
  "projects.10.highlights.0": "Joc de paraules inspirat en el Paraulògic",
  "projects.10.highlights.1":
    "Implementació lleugera amb HTML, CSS i JavaScript",
  "projects.10.highlights.2": "Minijoc jugable al navegador",
  "projects.11.highlights.0":
    "Versió anterior del portfoli personal, feta amb Angular",
  "projects.11.highlights.1":
    "Arquitectura de components amb TypeScript i SCSS",
  "projects.11.highlights.2": "Substituïda per l'actual lloc en Astro",
  "projects.12.highlights.0": "Minijoc senzill de minigolf amb Unity",
  "projects.12.highlights.1": "Gameplay i shaders amb C# i HLSL",
  "projects.12.highlights.2": "Publicat a itch.io",
  "projects.13.highlights.0": "Catàleg navegable de famílies d'instruments",
  "projects.13.highlights.1": "Frontend amb Angular i TypeScript",
  "projects.13.highlights.2":
    "Interfície per explorar les famílies d'instruments",
  "projects.14.highlights.0":
    "Graella filtrable de productes/elements per a Endesa",
  "projects.14.highlights.1": "Layout amb Isotope, jQuery i Handlebars",
  "projects.14.highlights.2":
    "Encarregat pel client, pensat per navegar i filtrar",
  "projects.15.highlights.0":
    "Efectes de postprocessat en temps real amb fragment shaders",
  "projects.15.highlights.1": "C++ i GLSL amb controls ImGui",
  "projects.15.highlights.2":
    "Estudi acadèmic de com s'encadenen els efectes d'imatge",

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
  "certificates.2.name": "ATC (3ds Max)",

  // ── 404 page ───────────────────────────────────────────────────────────────
  "ui.404.message": "Pàgina no trobada",
  "ui.404.nav.aria": "Navegació ràpida",
  "ui.404.back": "← Tornar a l'inici",
  "ui.404.hint": "Juga amb el 404",
};
