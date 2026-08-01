import { describe, it, expect } from "vitest";
import { CA } from "../../i18n/ca";
import { DEFAULT_LANG, isLangCode, t } from "../../utils/i18n";

describe("DEFAULT_LANG", () => {
  it("is Catalan", () => {
    expect(DEFAULT_LANG).toBe("ca");
  });
});

describe("isLangCode", () => {
  it("accepts supported language codes", () => {
    expect(isLangCode("ca")).toBe(true);
    expect(isLangCode("en")).toBe(true);
    expect(isLangCode("es")).toBe(true);
  });

  it("rejects invalid values", () => {
    expect(isLangCode("fr")).toBe(false);
    expect(isLangCode("")).toBe(false);
    expect(isLangCode(null)).toBe(false);
    expect(isLangCode(undefined)).toBe(false);
  });
});

describe("t", () => {
  it("returns Catalan copy for known keys", () => {
    expect(t("ui.nav.about")).toBe(CA["ui.nav.about"]);
    expect(t("ui.nav.about")).toBe("Sobre mi");
  });

  it("uses fallback when key is missing", () => {
    expect(t("ui.nav.about" as never, "fallback")).toBe(CA["ui.nav.about"]);
    expect(t("does.not.exist" as never, "fallback")).toBe("fallback");
  });
});
