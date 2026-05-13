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

export const SUPPORTED_LANGUAGES = [
  { code: "ca", label: "CA", nativeName: "Català", default: true },
  { code: "en", label: "EN", nativeName: "English", default: false },
  { code: "es", label: "ES", nativeName: "Español", default: false },
] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]["code"];
