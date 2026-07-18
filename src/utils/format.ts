import { DEFAULT_LANG, type LangCode } from "./i18n";
import { getDateLocale, getPresentLabel } from "./locale";

export function formatDate(
  dateStr?: string,
  lang: LangCode = DEFAULT_LANG as LangCode,
): string {
  if (!dateStr) return getPresentLabel(lang);
  const d = new Date(dateStr);
  return d.toLocaleDateString(getDateLocale(lang), {
    month: "short",
    year: "numeric",
  });
}

export function stripProtocol(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, "");
}
