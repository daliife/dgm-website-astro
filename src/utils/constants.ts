export const TITLE_PAGE_PREFIX = " — David Gimeno Mañé | Frontend Developer";
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

// Used by Section.astro
export const SPACING = {
  SECTION: {
    MOBILE: "my-6",
    SM: "sm:my-8",
    LG: "lg:my-8",
  },
} as const;

// Used by Typography.astro
export const TYPOGRAPHY = {
  H1: {
    MOBILE: "text-3xl",
    SM: "sm:text-4xl",
    LG: "lg:text-6xl",
    XL: "xl:text-7xl",
  },
  H2: {
    MOBILE: "text-xl",
    SM: "sm:text-2xl",
    LG: "lg:text-3xl",
    XL: "xl:text-4xl",
  },
  H3: {
    MOBILE: "text-lg",
    SM: "sm:text-xl",
    LG: "lg:text-2xl",
    XL: "xl:text-3xl",
  },
  BODY: {
    MOBILE: "text-base",
    SM: "sm:text-lg",
    LG: "lg:text-xl",
    XL: "xl:text-2xl",
  },
  SMALL: {
    MOBILE: "text-sm",
    SM: "sm:text-base",
    LG: "lg:text-lg",
    XL: "xl:text-xl",
  },
} as const;

// Used by Grid.astro
export const GRID_SYSTEMS = {
  projects: {
    MOBILE: "grid-cols-1",
    SM: "sm:grid-cols-1",
    MD: "md:grid-cols-1",
    LG: "lg:grid-cols-2",
    XL: "xl:grid-cols-2",
    "2XL": "2xl:grid-cols-3",
    "3XL": "3xl:grid-cols-3",
  },
  responsive: {
    MOBILE: "grid-cols-1",
    SM: "sm:grid-cols-2",
    MD: "md:grid-cols-3",
    LG: "lg:grid-cols-4",
    XL: "xl:grid-cols-5",
  },
} as const;
