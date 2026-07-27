import { basics } from "@cv";
import type { I18nKey } from "../i18n/en";
import { LIVE_URL } from "./constants";
import { t } from "./i18n";
import { SITE_BASE } from "./url";

export function getFullName(): string {
  return `${basics.name} ${basics.lastName}`;
}

/** Document title: "{page} — {name} | {label}" (SSR default locale). */
export function getPageTitle(pageHeading: string): string {
  return `${pageHeading} — ${getFullName()} | ${t("basics.label")}`;
}

export function getPageTitleFromKey(pageHeadingKey: I18nKey): string {
  return getPageTitle(t(pageHeadingKey));
}

/**
 * Canonical / OG URL for SEO — always https://davidgimeno.cat, even when
 * the HTML was built for GitHub Pages (different site + base path).
 */
export function getCanonicalUrl(pageUrl: URL | string): string {
  const url = typeof pageUrl === "string" ? new URL(pageUrl) : pageUrl;
  let path = url.pathname;

  if (SITE_BASE && (path === SITE_BASE || path.startsWith(`${SITE_BASE}/`))) {
    path = path.slice(SITE_BASE.length) || "/";
  }

  if (path.length > 1 && path.endsWith("/")) {
    path = path.slice(0, -1);
  }

  return path === "/" ? `${LIVE_URL}/` : `${LIVE_URL}${path}`;
}
