import type { LangCode } from "./i18n";

/** BCP 47 tags for `Intl` / `toLocaleDateString`. */
export const DATE_LOCALE_MAP: Record<LangCode, string> = {
  ca: "ca-ES",
  en: "en-US",
  es: "es-ES",
};

/** Open Graph locale tags (`og:locale`). */
export const OG_LOCALE_MAP: Record<LangCode, string> = {
  ca: "ca_ES",
  en: "en_GB",
  es: "es_ES",
};

export function getDateLocale(lang: LangCode): string {
  return DATE_LOCALE_MAP[lang] ?? DATE_LOCALE_MAP.ca;
}

export function getOgLocale(lang: LangCode): string {
  return OG_LOCALE_MAP[lang] ?? OG_LOCALE_MAP.ca;
}

/** Mirrors `ui.date.present` in each locale file — keep in sync. */
export const PRESENT_LABEL: Record<LangCode, string> = {
  ca: "Actualitat",
  en: "Present",
  es: "Actualidad",
};

export function getPresentLabel(lang: LangCode): string {
  return PRESENT_LABEL[lang] ?? PRESENT_LABEL.ca;
}
