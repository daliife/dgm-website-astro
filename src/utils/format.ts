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

/** Year + month from a `YYYY-MM-DD` (or longer ISO) string — timezone-safe. */
function yearMonth(dateStr: string): { year: number; month: number } | null {
  const match = /^(\d{4})-(\d{2})/.exec(dateStr);
  if (!match) return null;
  return { year: Number(match[1]), month: Number(match[2]) };
}

/** True when both dates fall in the same calendar month and year. */
export function isSameMonthYear(startDate: string, endDate?: string): boolean {
  if (!endDate) return false;
  const start = yearMonth(startDate);
  const end = yearMonth(endDate);
  if (!start || !end) return false;
  return start.year === end.year && start.month === end.month;
}

/**
 * Month/year range for work and projects.
 * Same month+year collapses to a single label (e.g. "oct. del 2020").
 */
export function formatDateRange(
  startDate: string,
  endDate?: string,
  lang: LangCode = DEFAULT_LANG as LangCode,
): string {
  if (isSameMonthYear(startDate, endDate)) {
    return formatDate(startDate, lang);
  }
  return `${formatDate(startDate, lang)} — ${formatDate(endDate, lang)}`;
}

export function stripProtocol(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, "");
}
