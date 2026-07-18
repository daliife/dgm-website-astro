import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import NextUpNav from "../../components/layout/NextUpNav.astro";

describe("NextUpNav", () => {
  it("renders related pages nav with links", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(NextUpNav, {
      props: {
        links: [
          { href: "/work", labelKey: "ui.nextup.work" },
          { href: "/projects", labelKey: "ui.nextup.projects" },
        ],
      },
    });

    expect(html).toContain('aria-label="Pàgines relacionades"');
    expect(html).toContain('href="/work"');
    expect(html).toContain('href="/projects"');
    expect(html).toContain('data-i18n="ui.nextup.work"');
    expect(html).toContain('data-i18n="ui.nextup.projects"');
  });
});
