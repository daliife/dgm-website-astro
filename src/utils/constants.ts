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

/** About page major blocks: vertical spacing only (no section rules). */
export const ABOUT_MAJOR_SECTION_CLASSES = "reveal mt-16 md:mt-20 print:mt-6";

/** Scroll offset for in-page anchors under the fixed header. */
export const SCROLL_ANCHOR_MARGIN_CLASSES = "scroll-mt-28 md:scroll-mt-36";

/** Shared static underline — always visible; hover darkens border/text. */
const LINK_UNDERLINE_CORE =
  "w-fit rounded-none border-b pb-px transition-colors duration-200 hover:border-text-primary hover:no-underline";

export const LINK_UNDERLINE_CLASSES = `${LINK_UNDERLINE_CORE} border-border-muted`;

export const LINK_UNDERLINE_MUTED_CLASSES = `${LINK_UNDERLINE_CLASSES} text-text-muted hover:text-text-primary`;

/** Wrapped link text — omit w-fit so border-b spans each line, not only the last. */
export const LINK_UNDERLINE_MUTED_WRAP_CLASSES = `${LINK_UNDERLINE_CORE} inline max-w-full border-border-muted text-text-muted hover:text-text-primary`;

export const LINK_UNDERLINE_SECONDARY_CLASSES = `${LINK_UNDERLINE_CLASSES} text-text-secondary hover:text-text-primary`;

/** Uppercase editorial links — same static underline, editorial typography. */
export const EDITORIAL_LINK_SM_CLASSES = `${LINK_UNDERLINE_CLASSES} pb-0.5 text-xs uppercase tracking-widest text-text-muted hover:text-text-primary`;

export const EDITORIAL_LINK_MD_CLASSES = `${LINK_UNDERLINE_CORE} border-border-secondary pb-1 text-sm uppercase tracking-widest text-text-primary`;

export const EDITORIAL_LINK_MD_MUTED_CLASSES = `${LINK_UNDERLINE_CLASSES} pb-1 text-sm uppercase tracking-widest text-text-muted hover:text-text-primary`;

export const BREADCRUMB_LINK_CLASSES = EDITORIAL_LINK_SM_CLASSES;

export const NEXTUP_LINK_CLASSES = EDITORIAL_LINK_MD_CLASSES;

/** About page section titles (below page H1 in visual weight). */
export const ABOUT_SECTION_HEADING_CLASSES =
  "mb-10 text-2xl font-bold uppercase tracking-tight text-text-primary sm:text-3xl print:mb-1.5 print:border-b print:border-gray-300 print:pb-0.5 print:text-[10px] print:font-medium print:normal-case print:tracking-widest print:text-black";

/** Projects category titles (tighter gap before list). */
export const PROJECTS_CATEGORY_HEADING_CLASSES =
  "mb-6 text-2xl font-bold uppercase tracking-tight text-text-primary sm:text-3xl";

/** Framed media (project screenshots). */
export const CARD_FRAME_CLASSES =
  "overflow-hidden border border-border-secondary bg-bg-muted";

/** Shared home hero CTA: animated underline on hover (both actions). */
const HOME_CTA_BASE_CLASSES =
  "gap-2 w-fit rounded-none pb-1 text-sm uppercase tracking-widest link-underline-animate transition-colors duration-200 hover:no-underline";

/** Home hero primary CTA (projects). */
export const HOME_CTA_PRIMARY_CLASSES = `${HOME_CTA_BASE_CLASSES} font-medium text-text-primary`;

/** Home hero secondary CTA (contact). */
export const HOME_CTA_SECONDARY_CLASSES = `${HOME_CTA_BASE_CLASSES} text-text-muted hover:text-text-primary`;

export const PROJECT_DETAIL_CTA_CLASSES = `gap-2 ${EDITORIAL_LINK_MD_CLASSES} hover:!no-underline`;

export const NEXTUP_NAV_CLASSES = "reveal border-t border-border-primary pt-8";

export const NEXTUP_LABEL_CLASSES =
  "mb-5 text-xs uppercase tracking-widest text-text-muted";

export const WORK_COMPANY_LINK_CLASSES = LINK_UNDERLINE_SECONDARY_CLASSES;

export const WORK_DATES_CLASSES =
  "whitespace-nowrap tabular-nums text-xs uppercase tracking-widest text-text-muted";

/** Bulleted body copy (experience, project highlights, etc.). */
export const CONTENT_LIST_CLASSES = "max-w-2xl list-none space-y-2.5";

/** List containers: stagger child entrance when `.is-visible` is set. */
export const REVEAL_STAGGER_LIST_CLASSES = "reveal-stagger list-none";

export const WORK_DATES_PRINT_CLASSES =
  "print:whitespace-nowrap print:text-[10px] print:text-gray-500";

export const SUPPORTED_LANGUAGES = [
  { code: "ca", label: "CA", nativeName: "Català", default: true },
  { code: "en", label: "EN", nativeName: "English", default: false },
  { code: "es", label: "ES", nativeName: "Español", default: false },
] as const;
