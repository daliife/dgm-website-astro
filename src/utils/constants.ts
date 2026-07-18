export const TITLE_PAGE_SUFFIX = " — David Gimeno Mañé | Frontend Developer";
export const NAV_LINKS: { href: string; label: string }[] = [
  { href: "about", label: "About" },
  { href: "work", label: "Work" },
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

/** Vertical spacing between about page sections. */
export const ABOUT_SECTION_SPACING_CLASSES = "mt-16 md:mt-20 print:mt-6";

export const NEXTUP_NAV_CLASSES = "reveal border-t border-border-primary pt-8";

export const NEXTUP_LABEL_CLASSES =
  "mb-5 text-xs uppercase tracking-widest text-text-muted";

export const NEXTUP_LINK_CLASSES =
  "w-fit rounded-none border-b border-border-secondary pb-1 text-sm uppercase tracking-widest text-text-primary hover:border-text-primary hover:no-underline";

export const WORK_COMPANY_LINK_CLASSES =
  "text-sm text-text-secondary underline decoration-text-secondary/40 underline-offset-2 transition-all duration-200 hover:text-text-primary hover:decoration-text-primary";

export const WORK_DATES_CLASSES =
  "whitespace-nowrap text-xs uppercase tracking-widest text-text-muted";

export const WORK_DATES_PRINT_CLASSES =
  "print:whitespace-nowrap print:text-[10px] print:text-gray-500";

export const SUPPORTED_LANGUAGES = [
  { code: "ca", label: "CA", nativeName: "Català", default: true },
  { code: "en", label: "EN", nativeName: "English", default: false },
  { code: "es", label: "ES", nativeName: "Español", default: false },
] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]["code"];
