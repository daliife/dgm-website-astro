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

// Theme - Accessible Dark Blue Palette
export const THEME_COLORS = {
  // Dark Blue Shades - High Contrast
  DARK_BLUE_50: "#f0f4ff", // Very light dark blue
  DARK_BLUE_100: "#e0e7ff", // Light dark blue
  DARK_BLUE_200: "#c7d2fe", // Lighter dark blue
  DARK_BLUE_300: "#a5b4fc", // Light dark blue
  DARK_BLUE_400: "#818cf8", // Medium light dark blue
  DARK_BLUE_500: "#6366f1", // Base dark blue
  DARK_BLUE_600: "#4f46e5", // Medium dark blue
  DARK_BLUE_700: "#4338ca", // Dark blue
  DARK_BLUE_800: "#3730a3", // Darker blue
  DARK_BLUE_900: "#312e81", // Very dark blue
  DARK_BLUE_950: "#1e1b4b", // Darkest blue

  // Midnight Blue Shades - Deeper tones
  MIDNIGHT_50: "#f0f4ff", // Very light midnight
  MIDNIGHT_100: "#e0e7ff", // Light midnight
  MIDNIGHT_200: "#c7d2fe", // Lighter midnight
  MIDNIGHT_300: "#a5b4fc", // Light midnight
  MIDNIGHT_400: "#818cf8", // Medium light midnight
  MIDNIGHT_500: "#6366f1", // Base midnight
  MIDNIGHT_600: "#4f46e5", // Medium midnight
  MIDNIGHT_700: "#4338ca", // Dark midnight
  MIDNIGHT_800: "#3730a3", // Darker midnight
  MIDNIGHT_900: "#312e81", // Very dark midnight
  MIDNIGHT_950: "#1e1b4b", // Darkest midnight

  // Deep Blue Accent Colors - High contrast
  DEEP_BLUE_300: "#93c5fd", // Light deep blue
  DEEP_BLUE_400: "#60a5fa", // Medium deep blue
  DEEP_BLUE_500: "#3b82f6", // Base deep blue
  DEEP_BLUE_600: "#2563eb", // Dark deep blue
  DEEP_BLUE_700: "#1d4ed8", // Darker deep blue
  DEEP_BLUE_800: "#1e40af", // Very dark deep blue
  DEEP_BLUE_900: "#1e3a8a", // Darkest deep blue

  // Ocean Blue Colors - Complementary
  OCEAN_400: "#38bdf8", // Light ocean
  OCEAN_500: "#0ea5e9", // Base ocean
  OCEAN_600: "#0284c7", // Dark ocean
  OCEAN_700: "#0369a1", // Darker ocean
  OCEAN_800: "#075985", // Very dark ocean

  // Steel Blue Colors - Neutral tones
  STEEL_400: "#60a5fa", // Light steel
  STEEL_500: "#3b82f6", // Base steel
  STEEL_600: "#2563eb", // Dark steel
  STEEL_700: "#1d4ed8", // Darker steel
  STEEL_800: "#1e40af", // Very dark steel

  // Background Colors - High contrast
  LIGHT: "#f8fafc", // Light background
  DARK: "#0f172a", // Dark background
  DARKER: "#020617", // Darker background

  // Accessible Text Colors - WCAG AA compliant
  TEXT_PRIMARY_LIGHT: "#0f172a", // High contrast on light (21:1)
  TEXT_SECONDARY_LIGHT: "#1e293b", // Good contrast on light (12:1)
  TEXT_MUTED_LIGHT: "#475569", // Sufficient contrast on light (7:1)
  TEXT_PRIMARY_DARK: "#f8fafc", // High contrast on dark (21:1)
  TEXT_SECONDARY_DARK: "#e2e8f0", // Good contrast on dark (12:1)
  TEXT_MUTED_DARK: "#94a3b8", // Sufficient contrast on dark (7:1)

  // Accessible Background Colors
  BG_LIGHT: "#ffffff", // Pure white
  BG_LIGHT_ALT: "#f8fafc", // Light gray
  BG_DARK: "#0f172a", // Dark navy
  BG_DARK_ALT: "#1e293b", // Darker navy

  // Accessible Border Colors
  BORDER_LIGHT: "#e2e8f0", // Light border
  BORDER_DARK: "#334155", // Dark border
  BORDER_ACCENT_LIGHT: "#3b82f6", // Accent border light
  BORDER_ACCENT_DARK: "#60a5fa", // Accent border dark

  // Gradient Colors - Accessible combinations
  GRADIENTS: {
    PRIMARY: "from-dark-blue-600 via-dark-blue-700 to-dark-blue-800",
    SECONDARY: "from-ocean-500 via-deep-blue-600 to-steel-600",
    ACCENT: "from-deep-blue-500 via-ocean-500 to-steel-500",
    DARK: "from-midnight-900 via-dark-blue-900 to-midnight-950",
    LIGHT: "from-bg-light via-dark-blue-50 to-ocean-50",
    OCEAN: "from-ocean-400 via-ocean-500 to-ocean-600",
    DEEP: "from-deep-blue-500 via-deep-blue-600 to-deep-blue-700",
  },

  // Shadow Colors - Accessible opacity
  SHADOWS: {
    DARK_BLUE: "shadow-dark-blue-500/20",
    DEEP_BLUE: "shadow-deep-blue-500/20",
    OCEAN: "shadow-ocean-500/20",
    STEEL: "shadow-steel-500/20",
  },
} as const;

// Performance
export const IMAGE_LOADING = {
  EAGER: "eager" as const,
  LAZY: "lazy" as const,
} as const;

// Layout Constants
export const LAYOUT_CONSTANTS = {
  // Container max widths
  CONTAINER_MAX_WIDTH: "max-w-7xl",
  CONTENT_MAX_WIDTH: {
    NARROW: "max-w-4xl", // About, Work
    MEDIUM: "max-w-5xl", // Home
    WIDE: "max-w-6xl", // Projects
  },

  // Spacing
  PADDING: {
    HORIZONTAL: "px-4 sm:px-6 lg:px-8",
    VERTICAL: "py-8 sm:py-12 lg:py-16",
  },

  // Page types
  PAGE_TYPES: {
    HOME: "home",
    CONTENT: "content",
  },
} as const;
