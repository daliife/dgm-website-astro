import { describe, it, expect } from "vitest";
import { HOME_ROLE_KEYS } from "../../utils/typewriter";
import { EN } from "../../i18n/en";
import { CA } from "../../i18n/ca";
import { ES } from "../../i18n/es";

describe("HOME_ROLE_KEYS", () => {
  it("lists the roles under the home name", () => {
    expect(HOME_ROLE_KEYS).toHaveLength(4);
  });

  it.each(["EN", "CA", "ES"] as const)(
    "all keys exist in %s translations",
    (lang) => {
      const dict = lang === "EN" ? EN : lang === "CA" ? CA : ES;
      const missing = HOME_ROLE_KEYS.filter((key) => !(key in dict));
      expect(missing, `Missing ${lang} keys: ${missing.join(", ")}`).toEqual(
        [],
      );
    },
  );
});
