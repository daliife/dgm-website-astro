/** Cleaned base path for building hrefs. Empty string on the root domain, "/sub-path" on GitHub Pages. */
export const SITE_BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

/**
 * Internal page href with a trailing slash.
 * Apache DirectorySlash 301s `/about` → `/about/`; linking with `/` avoids that hit.
 */
export function pageHref(...segments: string[]): string {
  const path = segments.join("/").split("/").filter(Boolean).join("/");

  if (!path) return `${SITE_BASE}/`;
  return `${SITE_BASE}/${path}/`;
}
