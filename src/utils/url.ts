/** Cleaned base path for building hrefs. Empty string on the root domain, "/sub-path" on GitHub Pages. */
export const SITE_BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
