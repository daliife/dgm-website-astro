import type { I18nKey } from "../i18n/en";
import type { LangCode } from "./i18n";
import { loadLang } from "./i18n-client";

export const TYPEWRITER_KEYS = [
  "ui.home.typewriter.0",
  "ui.home.typewriter.1",
  "ui.home.typewriter.2",
  "ui.home.typewriter.3",
  "ui.home.typewriter.4",
] as const satisfies readonly I18nKey[];

export async function getTypewriterPhrases(lang: LangCode): Promise<string[]> {
  const translations = await loadLang(lang);
  return TYPEWRITER_KEYS.map((key) => translations[key]);
}
