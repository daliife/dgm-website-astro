import { describe, it, expect } from "vitest";
import { CA } from "../../i18n/ca";
import { EN } from "../../i18n/en";
import { ES } from "../../i18n/es";
import {
  getDateLocale,
  getOgLocale,
  getPresentLabel,
  PRESENT_LABEL,
} from "../../utils/locale";

describe("PRESENT_LABEL", () => {
  it("matches ui.date.present in each locale file", () => {
    expect(PRESENT_LABEL.ca).toBe(CA["ui.date.present"]);
    expect(PRESENT_LABEL.en).toBe(EN["ui.date.present"]);
    expect(PRESENT_LABEL.es).toBe(ES["ui.date.present"]);
  });
});

describe("locale helpers", () => {
  it("maps date locales", () => {
    expect(getDateLocale("ca")).toBe("ca-ES");
    expect(getDateLocale("en")).toBe("en-US");
    expect(getDateLocale("es")).toBe("es-ES");
  });

  it("maps Open Graph locales", () => {
    expect(getOgLocale("ca")).toBe("ca_ES");
    expect(getOgLocale("en")).toBe("en_GB");
    expect(getOgLocale("es")).toBe("es_ES");
  });

  it("returns present labels per language", () => {
    expect(getPresentLabel("ca")).toBe("Actualitat");
    expect(getPresentLabel("en")).toBe("Present");
    expect(getPresentLabel("es")).toBe("Actualidad");
  });
});
