import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import {
  NAV_SCROLLED_THRESHOLD_PX,
  setNavScrolledState,
} from "../../utils/navScroll";

class FakeNav {
  private attrs = new Set<string>();

  toggleAttribute(name: string, force?: boolean) {
    const shouldHave = force ?? !this.attrs.has(name);
    if (shouldHave) this.attrs.add(name);
    else this.attrs.delete(name);
    return shouldHave;
  }

  hasAttribute(name: string) {
    return this.attrs.has(name);
  }
}

describe("setNavScrolledState", () => {
  it("does not mark the nav as scrolled at or below the threshold", () => {
    const nav = new FakeNav();

    setNavScrolledState(nav, 0);
    expect(nav.hasAttribute("data-scrolled")).toBe(false);

    setNavScrolledState(nav, NAV_SCROLLED_THRESHOLD_PX);
    expect(nav.hasAttribute("data-scrolled")).toBe(false);
  });

  it("marks the nav as scrolled past the threshold and clears it on return", () => {
    const nav = new FakeNav();

    setNavScrolledState(nav, NAV_SCROLLED_THRESHOLD_PX + 1);
    expect(nav.hasAttribute("data-scrolled")).toBe(true);

    setNavScrolledState(nav, 0);
    expect(nav.hasAttribute("data-scrolled")).toBe(false);
  });

  it("is wired from the Header client script", () => {
    const header = readFileSync(
      join(
        dirname(fileURLToPath(import.meta.url)),
        "../../components/layout/Header.astro",
      ),
      "utf-8",
    );

    expect(header).toContain("setNavScrolledState");
    expect(header).toContain("../../utils/navScroll");
  });
});
