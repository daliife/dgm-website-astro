// SEO Constants
export const TITLE_PAGE_PREFIX = "DGM | ";
export const SITE_NAME = "David Gimeno Portfolio";
export const DEFAULT_DESCRIPTION =
  "Personal portfolio website of David Gimeno - Software Engineer based in Barcelona";

// Navigation
export const NAV_LINKS = ["projects", "work", "about"] as const;

// Social Links
export const SOCIAL_LINKS = {
  GITHUB: "https://github.com/daliife",
  LINKEDIN: "https://www.linkedin.com/in/daliife/",
  EMAIL: "mailto:davidgimenomane@gmail.com",
} as const;

// UI Constants
export const TIMELINE_ITEMS_LIMIT = 2;
export const PROJECT_CARD_DIMENSIONS = {
  width: 224,
  height: 128,
} as const;
export const IMAGE_LOADING = "lazy" as const;

// Responsive Spacing
export const SPACING = {
  // Section spacing
  SECTION: {
    MOBILE: "my-6",
    SM: "sm:my-8",
    LG: "lg:my-8",
  },
} as const;

// Typography Scale
export const TYPOGRAPHY = {
  // Headings
  H1: {
    MOBILE: "text-4xl",
    SM: "sm:text-5xl",
    LG: "lg:text-6xl",
    XL: "xl:text-7xl",
  },
  H2: {
    MOBILE: "text-lg",
    SM: "sm:text-xl",
    LG: "lg:text-2xl",
    XL: "xl:text-3xl",
  },
  H3: {
    MOBILE: "text-lg",
    SM: "sm:text-xl",
    LG: "lg:text-2xl",
    XL: "xl:text-3xl",
  },
  // Body text
  BODY: {
    MOBILE: "text-base",
    SM: "sm:text-lg",
    LG: "lg:text-xl",
    XL: "xl:text-2xl",
  },
  // Small text
  SMALL: {
    MOBILE: "text-sm",
    SM: "sm:text-base",
    LG: "lg:text-lg",
    XL: "xl:text-xl",
  },
} as const;

// Grid Systems
export const GRID_SYSTEMS = {
  // Projects grid - fewer columns for horizontal cards
  projects: {
    MOBILE: "grid-cols-1",
    SM: "sm:grid-cols-1",
    MD: "md:grid-cols-1",
    LG: "lg:grid-cols-2",
    XL: "xl:grid-cols-2",
    "2XL": "2xl:grid-cols-3",
    "3XL": "3xl:grid-cols-3",
  },
  // General responsive grid
  responsive: {
    MOBILE: "grid-cols-1",
    SM: "sm:grid-cols-2",
    MD: "md:grid-cols-3",
    LG: "lg:grid-cols-4",
    XL: "xl:grid-cols-5",
  },
} as const;

// Layout Constants
export const LAYOUT_CONSTANTS = {
  CONTAINER_MAX_WIDTH: "max-w-7xl",
  CONTENT_MAX_WIDTH: {
    NARROW: "max-w-4xl",
    MEDIUM: "max-w-5xl",
    WIDE: "max-w-6xl",
  },
  PADDING: {
    HORIZONTAL: {
      MOBILE: "px-4",
      SM: "sm:px-6",
      LG: "lg:px-8",
    },
    VERTICAL: {
      MOBILE: "py-6",
      SM: "sm:py-8",
      LG: "lg:py-12",
    },
  },
} as const;

// Animation Constants
export const ANIMATIONS = {
  DURATION: {
    FAST: "150ms",
    NORMAL: "300ms",
    SLOW: "500ms",
  },
  EASING: {
    EASE_IN: "ease-in",
    EASE_OUT: "ease-out",
    EASE_IN_OUT: "ease-in-out",
  },
} as const;

// Accessibility Constants
export const A11Y = {
  FOCUS_VISIBLE:
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500",
  SCREEN_READER_ONLY: "sr-only",
  SKIP_LINK: "skip-link",
  CONTENT: "content",
} as const;
