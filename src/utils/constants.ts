export const TITLE_PAGE_PREFIX = "David Gimeno Mañé — ";
export const NAV_LINKS = ["about", "projects", "work", "contact"] as const;

export const TIMELINE_ITEMS_LIMIT = 2;
export const PROJECT_CARD_DIMENSIONS = {
  width: 224,
  height: 128,
} as const;
export const IMAGE_LOADING = "lazy" as const;

export const SPACING = {
  SECTION: {
    MOBILE: "my-6",
    SM: "sm:my-8",
    LG: "lg:my-8",
  },
} as const;

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
