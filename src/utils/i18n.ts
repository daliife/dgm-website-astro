import { CA } from "../i18n/ca";
import type { I18nKey } from "../i18n/en";
import { SUPPORTED_LANGUAGES } from "./constants";

export const DEFAULT_LANG = SUPPORTED_LANGUAGES.find((l) => l.default)?.code ?? "ca";

export type LangCode = "ca" | "en" | "es";

/** Server-rendered copy for the default locale (Catalan). */
export function t(key: I18nKey, fallback?: string): string {
  return CA[key] ?? fallback ?? key;
}

export function isLangCode(value: string | null | undefined): value is LangCode {
  return value === "ca" || value === "en" || value === "es";
}
