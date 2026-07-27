import { describe, it, expect, vi, afterEach } from "vitest";
import {
  getFullName,
  getPageTitle,
  getPageTitleFromKey,
  getCanonicalUrl,
} from "../../utils/seo";
import { t } from "../../utils/i18n";
import { LIVE_URL } from "../../utils/constants";

describe("seo helpers", () => {
  it("builds full name from cv basics", () => {
    expect(getFullName()).toContain("David");
  });

  it("builds page titles with localized label", () => {
    const title = getPageTitle("Projectes");
    expect(title).toContain("Projectes");
    expect(title).toContain(getFullName());
    expect(title).toContain(t("basics.label"));
  });

  it("resolves title from i18n page key", () => {
    expect(getPageTitleFromKey("ui.page.work")).toContain(t("ui.page.work"));
  });
});

describe("getCanonicalUrl", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it("maps production paths to davidgimeno.cat", () => {
    expect(getCanonicalUrl(`${LIVE_URL}/`)).toBe(`${LIVE_URL}/`);
    expect(getCanonicalUrl(`${LIVE_URL}/about/`)).toBe(`${LIVE_URL}/about/`);
    expect(getCanonicalUrl(`${LIVE_URL}/projects/orange-rfp`)).toBe(
      `${LIVE_URL}/projects/orange-rfp/`,
    );
  });

  it("strips GitHub Pages host and base path when SITE_BASE is set", async () => {
    vi.resetModules();
    vi.doMock("../../utils/url", () => ({
      SITE_BASE: "/dgm-website-astro",
    }));
    const { getCanonicalUrl: canonicalWithBase } =
      await import("../../utils/seo");

    expect(
      canonicalWithBase("https://daliife.github.io/dgm-website-astro/"),
    ).toBe(`${LIVE_URL}/`);
    expect(
      canonicalWithBase("https://daliife.github.io/dgm-website-astro/about/"),
    ).toBe(`${LIVE_URL}/about/`);
    expect(
      canonicalWithBase(
        "https://daliife.github.io/dgm-website-astro/projects/orange-rfp/",
      ),
    ).toBe(`${LIVE_URL}/projects/orange-rfp/`);
  });
});
