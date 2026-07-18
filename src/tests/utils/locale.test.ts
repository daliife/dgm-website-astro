import { describe, it, expect } from "vitest";
import { CA } from "../../i18n/ca";
import { EN } from "../../i18n/en";
import { ES } from "../../i18n/es";
import { PRESENT_LABEL } from "../../utils/locale";

describe("PRESENT_LABEL", () => {
  it("matches ui.date.present in each locale file", () => {
    expect(PRESENT_LABEL.ca).toBe(CA["ui.date.present"]);
    expect(PRESENT_LABEL.en).toBe(EN["ui.date.present"]);
    expect(PRESENT_LABEL.es).toBe(ES["ui.date.present"]);
  });
});
