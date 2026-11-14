import { describe, it, expect } from "vitest";
import { STACK_ICONS } from "../../utils/stackIcons";

describe("STACK_ICONS", () => {
  it("has unique names and non-empty SVG paths", () => {
    const names = STACK_ICONS.map((icon) => icon.name);
    expect(new Set(names).size).toBe(names.length);
    for (const icon of STACK_ICONS) {
      expect(icon.path).toMatch(/^[Mm]/);
    }
  });
});
