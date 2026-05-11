/**
 * English translations — flat Record<key, string>.
 * English is the base language: these strings mirror the hardcoded text in
 * .astro templates. Having them here makes EN a first-class language and
 * allows the i18n key coverage test to validate all three locales.
 */
export const EN: Record<string, string> = {
  // ── Navigation ────────────────────────────────────────────────────────────
  "ui.nav.about": "About",
  "ui.nav.projects": "Projects",
  "ui.nav.work": "Work",
  "ui.nav.contact": "Contact",

  // ── Home page ─────────────────────────────────────────────────────────────
  "ui.home.greeting": "Hello there, it's",
  "ui.home.cta": "Get in touch",
  "ui.home.cta.work": "Explore my projects",
  "ui.nextup": "Also explore",
  "ui.nextup.about": "About me",
  "ui.nextup.work": "My work experience",
  "ui.nextup.projects": "My projects",
  "ui.nextup.contact": "Contact",

  // ── Page headings ─────────────────────────────────────────────────────────
  "ui.page.about": "About",
  "ui.page.work": "Work",
  "ui.page.projects": "Projects",
  "ui.page.contact": "Contact",

  // ── About section headings ────────────────────────────────────────────────
  "ui.about.summary": "Summary",
  "ui.about.skills": "Skills",
  "ui.about.languages": "Languages",
  "ui.about.education": "Education",
  "ui.about.certificates": "Certificates",
  "ui.about.printcv": "Print CV",
  "ui.about.experience": "Experience", // print-only

  // ── Cookie consent ─────────────────────────────────────────────────────────
  "ui.cookies.message":
    "This site uses anonymous analytics to improve the experience.",
  "ui.cookies.learnmore": "Learn more",
  "ui.cookies.dismiss": "OK",

  // ── Footer ─────────────────────────────────────────────────────────────────
  "ui.footer.privacy": "Privacy",

  // ── Privacy page ───────────────────────────────────────────────────────────
  "ui.page.privacy": "Privacy",
  "ui.privacy.intro":
    "This site uses Umami, a privacy-focused open-source analytics tool. No cookies are used and no personal data is collected.",
  "ui.privacy.collected.title": "What we collect",
  "ui.privacy.collected.0": "Page views and navigation paths",
  "ui.privacy.collected.1": "Referrer URL (where you came from)",
  "ui.privacy.collected.2": "Browser and operating system (generic)",
  "ui.privacy.collected.3": "Device type (desktop / mobile / tablet)",
  "ui.privacy.collected.4": "Country (approximate, based on anonymised IP)",
  "ui.privacy.notcollected.title": "What we do NOT collect",
  "ui.privacy.notcollected.0": "No cookies or persistent identifiers",
  "ui.privacy.notcollected.1": "No personal data (name, email, etc.)",
  "ui.privacy.notcollected.2": "No IP address storage",
  "ui.privacy.notcollected.3": "No cross-site tracking",
  "ui.privacy.notcollected.4": "No data sold to third parties",
  "ui.privacy.moreinfo": "More details at",

  // ── Contact ────────────────────────────────────────────────────────────────
  "ui.contact.intro":
    "Interested in working together? Feel free to reach out through any of the channels below.",

  // ── Basics ─────────────────────────────────────────────────────────────────
  "basics.label": "Frontend Developer",
  "basics.location": "Barcelona · Catalonia",
  "basics.summary.0":
    "Frontend Developer focused on building clean, clear, and well-crafted interfaces. I care about creating experiences that not only work well, but also look good. Experience building reusable components and working with web technologies.",
  "basics.summary.1":
    "I adapt quickly to new environments and stand out for my curiosity and continuous learning, keeping up with new technologies, tools, and the impact of AI.",
  "basics.summary.2":
    "I also work with Unity on interactive projects, supported by 3D modeling skills to bring a perspective beyond frontend.",

  // ── Work experience ────────────────────────────────────────────────────────
  "work.0.position": "Lead Engineer",
  "work.0.highlights.0":
    "Development of a new Role-Plays product, integrating SCAI (WebSockets) and AI Factory (LLMs for scoring).",
  "work.0.highlights.1":
    "Creation of components and widgets for Syntphony Learning Tech (PHP, Moodle, HTML, JavaScript).",
  "work.0.highlights.2":
    "Implementation of features in the Syntphony Immersive Experiences admin portal, including OTP login.",
  "work.0.highlights.3":
    "Development of a web version of Syntphony Immersive Experiences with WebGL and Unity.",
  "work.0.highlights.4":
    "Maintenance of Syntphony Immersive Experiences documentation (Nextra, MD/MDX).",
  "work.0.highlights.5":
    "Migration of the Design System for the Syntphony Immersive Experiences portal.",
  "work.0.highlights.6":
    "Maintenance and optimization of frontend CI/CD pipelines: e2e tests, unit tests, and build optimization.",

  "work.1.position": "Engineer",
  "work.1.highlights.0":
    "Development of new features for the mobile app 'eCliente' for Allianz.",
  "work.1.highlights.1":
    "Conduct the 'Angular basics' course for Allianz workers.",
  "work.1.highlights.2":
    "Implementation of the XL insurance business with Angular 12, bug fixes and component refactorization (MAPFRE).",
  "work.1.highlights.3":
    "Migration of styles and functionalities for the Servihabitat portal with Liferay (Caixabank).",
  "work.1.highlights.4":
    "Creation of a calendar widget in a Liferay portlet (Educaixa/Caixabank).",
  "work.1.highlights.5":
    "Creation of different SPAs for RFP type websites with a high 'wow effect' in Angular 9 (SEAT and Orange).",
  "work.1.highlights.6":
    "Creation of a Design System using Storybooks and Stencil.",
  "work.1.highlights.7":
    "PoC: exporting design tokens with Figma towards a Design System.",

  "work.2.position": "Junior Engineer",
  "work.2.highlights.0":
    "Creation of building blocks (web components) with Angular 8 (Allianz).",
  "work.2.highlights.1":
    "Learning and creation of PoC for the Phygital department.",
  "work.2.highlights.2":
    "Development of VR applications with Unity for the USIX2.0 project, a training app for the industrial sector.",
  "work.2.highlights.3":
    "Web Development with Adobe Experience Manager for the CasaSeat Retail Car Configurator project (SEAT: CODE).",

  "work.3.position": "Lecturer",
  "work.3.summary":
    "Professor of the subject 'Introduction to Unreal Engine' at the Masters degree in Advanced Video Game Development at La Salle Campus BCN",

  "work.4.position": "Internship",
  "work.4.summary":
    "Creation of a VR application (PhygitApp) to show the potential of Phygital experiences in the world of banking and customer service.",

  "work.5.position": "Multimedia Programmer",
  "work.5.summary":
    "Simulation of the HUD and Digital cockpit screens of a new car for the SEAT client.",

  "work.6.position": "IT Helpdesk",
  "work.6.highlights.0": "IT problem resolution within the Wanup offices.",
  "work.6.highlights.1":
    "Creation of documentation related to the Systems and Helpdesk department.",
  "work.6.highlights.2": "Control and check of office hardware supplies.",

  "work.7.position": "Internship",
  "work.7.highlights.0": "Creation of new didactic exercises for the students.",
  "work.7.highlights.1":
    "Give support to the teacher in partial teaching of the Animation 1 subject.",
  "work.7.highlights.2":
    "In the open-door sessions I give support by giving information, showing the laboratories, answering questions from future students.",
  "work.7.highlights.3":
    "Control of material and logistics of the laboratories.",

  // ── Projects ───────────────────────────────────────────────────────────────
  "projects.0.description":
    "Personal project — website for a Seitai and katsugen movement studio",
  "projects.1.description":
    "Professional project — interactive webpage with 3 canvas minigames (SEAT)",
  "projects.2.description":
    "Professional project — landing page with a card minigame (Orange)",
  "projects.3.description":
    "Professional project — interactive webpage with a chronology timeline (SEAT)",
  "projects.4.description":
    "University project — TV recommender app for Samsung Smart TV built with Tizen Studio",
  "projects.5.description":
    "Master's degree project — video game prototype built with Unreal Engine 4",
  "projects.6.description":
    "Personal project — adaptation of the word game 'Paraulògic'",
  "projects.7.description":
    "Personal project — previous version of my portfolio built with Angular",
  "projects.8.description":
    "Master's degree project — hypercasual minimal minigolf video game built with Unity",
  "projects.9.description":
    "Personal project — website to discover instrument families, built with Angular",
  "projects.10.description":
    "Professional project — filterable grid of elements using Isotope (Endesa)",
  "projects.11.description":
    "Master's degree project — real-time postprocessing FX using fragment shaders and ImGui",

  // ── Education ──────────────────────────────────────────────────────────────
  "education.0.studyType": "Master's Degree in Advanced Video Game Development",
  "education.0.area": "Game Development",
  "education.1.studyType": "Bachelor's Degree in Multimedia Engineering",
  "education.1.area": "Multimedia Engineering",
  "education.2.studyType": "Higher Vocational Diploma in Sound Engineering",
  "education.2.area": "Sound Engineering",

  // ── Skills ─────────────────────────────────────────────────────────────────
  "skills.0.name": "Web Development",
  "skills.0.level": "Master",
  "skills.1.name": "Frameworks",
  "skills.1.level": "Expert",
  "skills.2.name": "Tools & DevOps",
  "skills.2.level": "Advanced",
  "skills.3.name": "3D & Interactive",
  "skills.3.level": "Advanced",
  "skills.4.name": "AI Integration",
  "skills.4.level": "Intermediate",

  // ── Languages ──────────────────────────────────────────────────────────────
  "languages.0.fluency": "Native speaker",
  "languages.1.fluency": "Native speaker",
  "languages.2.fluency": "Professional working proficiency",
};
