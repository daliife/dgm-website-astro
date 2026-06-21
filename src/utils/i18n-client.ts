import type { I18nKey } from "../i18n/en";
import { DEFAULT_LANG, type LangCode, isLangCode } from "./i18n";

const LOADERS: Record<LangCode, () => Promise<Record<I18nKey, string>>> = {
  en: () => import("../i18n/en").then((m) => m.EN),
  ca: () => import("../i18n/ca").then((m) => m.CA),
  es: () => import("../i18n/es").then((m) => m.ES),
};

const cache: Partial<Record<LangCode, Record<I18nKey, string>>> = {};

export async function loadLang(
  lang: LangCode,
): Promise<Record<I18nKey, string>> {
  if (!cache[lang]) {
    cache[lang] = await LOADERS[lang]();
  }
  return cache[lang]!;
}

const LOCALE_MAP: Record<LangCode, string> = {
  en: "en-US",
  ca: "ca-ES",
  es: "es-ES",
};

function formatDateLocale(
  raw: string | undefined,
  locale: string,
  presentLabel: string,
): string {
  if (!raw) return presentLabel;
  const d = new Date(raw);
  return d.toLocaleDateString(locale, { month: "short", year: "numeric" });
}

function syncLangChrome(lang: LangCode) {
  document.documentElement.lang = lang;

  document
    .querySelectorAll<HTMLElement>("[data-lang-current]")
    .forEach((el) => {
      el.textContent = lang.toUpperCase();
    });

  document.querySelectorAll<HTMLElement>("[data-lang-btn]").forEach((btn) => {
    btn.setAttribute("aria-selected", String(btn.dataset.langBtn === lang));
  });

  const ogLocale = document.querySelector("[data-og-locale]");
  const OG_LOCALE_MAP: Record<LangCode, string> = {
    en: "en_GB",
    ca: "ca_ES",
    es: "es_ES",
  };
  if (ogLocale) {
    ogLocale.setAttribute("content", OG_LOCALE_MAP[lang] ?? "ca_ES");
  }
}

async function applyDateFormatting(lang: LangCode) {
  const translations = await loadLang(lang);
  const dateLocale = LOCALE_MAP[lang] ?? "ca-ES";
  const presentLabel = translations["ui.date.present"] ?? "Actualitat";

  document.querySelectorAll<HTMLElement>("[data-date-start]").forEach((el) => {
    const start = el.dataset.dateStart;
    const end = el.dataset.dateEnd || undefined;
    el.textContent = `${formatDateLocale(start, dateLocale, presentLabel)} — ${formatDateLocale(end, dateLocale, presentLabel)}`;
  });
}

async function applyTranslations(lang: LangCode) {
  const translations = await loadLang(lang);

  document.querySelectorAll<HTMLElement>("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n as I18nKey | undefined;
    if (!key) return;
    const val = translations[key];
    if (val !== undefined) el.textContent = val;
  });
}

export function getStoredLang(): LangCode {
  if (typeof localStorage === "undefined") return DEFAULT_LANG as LangCode;
  const stored = localStorage.getItem("lang");
  return isLangCode(stored) ? stored : (DEFAULT_LANG as LangCode);
}

let activeLang: LangCode | null = null;

/** Apply locale. Skips [data-i18n] updates on first paint when SSR default is active. */
export async function applyI18n(lang: LangCode) {
  const needsTranslation =
    lang !== DEFAULT_LANG ||
    (activeLang !== null && activeLang !== DEFAULT_LANG);

  if (needsTranslation) {
    await applyTranslations(lang);
  }

  activeLang = lang;
  await applyDateFormatting(lang);
  syncLangChrome(lang);
}

export function preloadStoredLang() {
  loadLang(getStoredLang());
}
