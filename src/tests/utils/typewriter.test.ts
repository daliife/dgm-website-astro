import { describe, it, expect } from "vitest";
import { TYPEWRITER_KEYS, getTypewriterPhrases } from "../../utils/typewriter";
import { EN } from "../../i18n/en";
import { CA } from "../../i18n/ca";
import { ES } from "../../i18n/es";

describe("TYPEWRITER_KEYS", () => {
  it("has five phrase keys", () => {
    expect(TYPEWRITER_KEYS).toHaveLength(5);
  });

  it.each(["EN", "CA", "ES"] as const)(
    "all keys exist in %s translations",
    (lang) => {
      const dict = lang === "EN" ? EN : lang === "CA" ? CA : ES;
      const missing = TYPEWRITER_KEYS.filter((key) => !(key in dict));
      expect(missing, `Missing ${lang} keys: ${missing.join(", ")}`).toEqual(
        [],
      );
    },
  );
});

describe("getTypewriterPhrases", () => {
  it("returns localized phrases for Catalan", async () => {
    const phrases = await getTypewriterPhrases("ca");
    expect(phrases).toHaveLength(5);
    expect(phrases[0]).toBe(CA["ui.home.typewriter.0"]);
  });
});
