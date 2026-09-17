import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import NextUpNav from "../../components/layout/NextUpNav.astro";
import { pageHref } from "../../utils/url";

describe("NextUpNav", () => {
  it("renders related pages nav with trailing-slash links", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(NextUpNav, {
      props: {
        links: [
          { href: pageHref("experience"), labelKey: "ui.nextup.experience" },
          { href: pageHref("projects"), labelKey: "ui.nextup.projects" },
        ],
      },
    });

    expect(html).toContain('aria-label="Pàgines relacionades"');
    expect(html).toContain('data-i18n-aria="ui.nextup.aria"');
    expect(html).toContain(`href="${pageHref("experience")}"`);
    expect(html).toContain(`href="${pageHref("projects")}"`);
    expect(html).toContain('data-i18n="ui.nextup.experience"');
    expect(html).toContain('data-i18n="ui.nextup.projects"');
  });
});
