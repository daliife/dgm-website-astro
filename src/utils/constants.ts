// SEO Constants
export const TITLE_PAGE_PREFIX = "DGM | ";
export const SITE_NAME = "David Gimeno Portfolio";
export const DEFAULT_DESCRIPTION =
  "Personal portfolio website of David Gimeno - Software Engineer based in Barcelona";

// Navigation
export const NAV_LINKS = ["home", "projects", "work", "about"] as const;

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

// Theme
export const THEME_COLORS = {
  LIGHT: "#f8fafc",
  DARK: "#1a202c",
} as const;

// Performance
export const IMAGE_LOADING = {
  EAGER: "eager" as const,
  LAZY: "lazy" as const,
} as const;
