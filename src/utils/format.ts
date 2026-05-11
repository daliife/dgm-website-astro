export const LOCALE_MAP: Record<string, string> = {
  en: "en-US",
  ca: "ca-ES",
  es: "es-ES",
};

export function formatDate(dateStr?: string, locale = "en-US"): string {
  if (!dateStr) return "Present";
  const d = new Date(dateStr);
  return d.toLocaleDateString(locale, { month: "short", year: "numeric" });
}

export function stripProtocol(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, "");
}
