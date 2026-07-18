import type { I18nKey } from "../i18n/en";
import { DEFAULT_LANG, type LangCode, isLangCode } from "./i18n";
import { formatDate } from "./format";
import { getOgLocale } from "./locale";

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
  if (ogLocale) {
    ogLocale.setAttribute("content", getOgLocale(lang));
  }
}

async function applyDateFormatting(lang: LangCode) {
  document.querySelectorAll<HTMLElement>("[data-date-start]").forEach((el) => {
    const start = el.dataset.dateStart;
    const end = el.dataset.dateEnd || undefined;
    el.textContent = `${formatDate(start, lang)} — ${formatDate(end, lang)}`;
  });
}

function applyAriaLabels(translations: Record<I18nKey, string>) {
  document.querySelectorAll<HTMLElement>("[data-i18n-aria]").forEach((el) => {
    const key = el.dataset.i18nAria as I18nKey | undefined;
    if (!key) return;
    const val = translations[key];
    if (val !== undefined) el.setAttribute("aria-label", val);
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

  const translations = await loadLang(lang);

  if (needsTranslation) {
    document.querySelectorAll<HTMLElement>("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n as I18nKey | undefined;
      if (!key) return;
      const val = translations[key];
      if (val !== undefined) el.textContent = val;
    });
  }

  applyAriaLabels(translations);

  activeLang = lang;
  await applyDateFormatting(lang);
  syncLangChrome(lang);
}

export function preloadStoredLang() {
  loadLang(getStoredLang());
}
