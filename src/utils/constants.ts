export const NAV_LINKS: { href: string; label: string }[] = [
  { href: "about", label: "About" },
  { href: "experience", label: "Experience" },
  { href: "projects", label: "Projects" },
  { href: "contact", label: "Contact" },
];

export const LIVE_URL = "https://davidgimeno.cat";

export const PAGE_CONTAINER_CLASSES =
  "max-w-5xl mx-auto px-6 pt-24 md:pt-32 pb-20";

export const PAGE_HEADING_CLASSES =
  "text-4xl sm:text-5xl font-bold tracking-tight text-text-primary uppercase reveal";

/** Standard page title bottom margin (work, projects, privacy, about). */
export const PAGE_HEADING_MARGIN_CLASSES = "mb-10";

/** Compact title margin when intro copy follows immediately (contact). */
export const PAGE_HEADING_MARGIN_COMPACT_CLASSES = "mb-6";

/** Vertical spacing between about page sections (legacy; prefer ABOUT_MAJOR_SECTION_CLASSES). */
export const ABOUT_SECTION_SPACING_CLASSES = "mt-16 md:mt-20 print:mt-6";

/** About page major blocks: vertical spacing only (no section rules). */
export const ABOUT_MAJOR_SECTION_CLASSES = "reveal mt-16 md:mt-20 print:mt-6";

/** Optional label above section titles (About chapters). */
export const SECTION_LABEL_CLASSES =
  "mb-2 text-xs uppercase tracking-widest text-text-muted print:hidden";

/** Scroll offset for in-page anchors under the fixed header. */
export const SCROLL_ANCHOR_MARGIN_CLASSES = "scroll-mt-28 md:scroll-mt-36";

/** Projects list: jump links to category sections. */
export const PROJECT_CATEGORY_JUMP_LINK_CLASSES =
  "rounded-none border-b border-transparent pb-0.5 text-xs uppercase tracking-widest text-text-muted transition-colors duration-200 hover:border-text-primary hover:text-text-primary hover:no-underline focus-visible:border-text-primary";

/** Project detail breadcrumb link (parent segment). */
export const BREADCRUMB_LINK_CLASSES =
  "rounded-none border-b border-border-muted pb-0.5 text-xs uppercase tracking-widest text-text-muted transition-colors duration-200 hover:border-text-primary hover:text-text-primary hover:no-underline";

/** About page section titles (below page H1 in visual weight). */
export const ABOUT_SECTION_HEADING_CLASSES =
  "mb-10 text-2xl font-bold uppercase tracking-tight text-text-primary sm:text-3xl print:mb-1.5 print:border-b print:border-gray-300 print:pb-0.5 print:text-[10px] print:font-medium print:normal-case print:tracking-widest print:text-black";

/** Projects category titles (tighter gap before list). */
export const PROJECTS_CATEGORY_HEADING_CLASSES =
  "mb-6 text-2xl font-bold uppercase tracking-tight text-text-primary sm:text-3xl";

/** Framed media (portrait, screenshots) — matches project thumbnails. */
export const CARD_FRAME_CLASSES =
  "overflow-hidden border border-border-secondary bg-bg-muted";

/** Home hero primary CTA (projects). */
export const HOME_CTA_PRIMARY_CLASSES =
  "gap-2 rounded-none border-b border-text-primary pb-1 text-sm font-medium uppercase tracking-widest text-text-primary transition-colors duration-200 hover:border-text-primary hover:no-underline";

/** Home hero secondary CTA (contact). */
export const HOME_CTA_SECONDARY_CLASSES =
  "gap-2 rounded-none border-b border-border-muted pb-1 text-sm uppercase tracking-widest text-text-muted transition-colors duration-200 hover:border-text-primary hover:text-text-primary hover:no-underline";

export const NEXTUP_NAV_CLASSES = "reveal border-t border-border-primary pt-8";

export const NEXTUP_LABEL_CLASSES =
  "mb-5 text-xs uppercase tracking-widest text-text-muted";

export const NEXTUP_LINK_CLASSES =
  "w-fit rounded-none border-b border-border-secondary pb-1 text-sm uppercase tracking-widest text-text-primary hover:border-text-primary hover:no-underline";

export const WORK_COMPANY_LINK_CLASSES =
  "link-underline-hover w-fit text-sm text-text-secondary transition-colors duration-200 hover:text-text-primary";

export const WORK_DATES_CLASSES =
  "whitespace-nowrap text-xs uppercase tracking-widest text-text-muted";

export const WORK_DATES_PRINT_CLASSES =
  "print:whitespace-nowrap print:text-[10px] print:text-gray-500";

export const SUPPORTED_LANGUAGES = [
  { code: "ca", label: "CA", nativeName: "Català", default: true },
  { code: "en", label: "EN", nativeName: "English", default: false },
  { code: "es", label: "ES", nativeName: "Español", default: false },
] as const;
