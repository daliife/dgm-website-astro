import { CA } from "../i18n/ca";
import { EN } from "../i18n/en";
import { ES } from "../i18n/es";
import { DEFAULT_LANG, type LangCode } from "./i18n";
import { getDateLocale } from "./locale";

const PRESENT_LABEL: Record<LangCode, string> = {
  ca: CA["ui.date.present"],
  en: EN["ui.date.present"],
  es: ES["ui.date.present"],
};

export function formatDate(
  dateStr?: string,
  lang: LangCode = DEFAULT_LANG as LangCode,
): string {
  if (!dateStr) return PRESENT_LABEL[lang] ?? PRESENT_LABEL.ca;
  const d = new Date(dateStr);
  return d.toLocaleDateString(getDateLocale(lang), {
    month: "short",
    year: "numeric",
  });
}

export function stripProtocol(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, "");
}
