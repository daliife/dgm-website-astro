import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import Header from "../../components/layout/Header.astro";

describe("Header", () => {
  it("renders a <header> element", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Header);

    expect(html).toContain("<header");
  });

  it("renders the logo link to home", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Header);

    expect(html).toContain('aria-label="Home"');
  });

  it("renders all nav links", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Header);

    expect(html).toContain('href="/about"');
    expect(html).toContain('href="/projects"');
    expect(html).toContain('href="/work"');
    expect(html).toContain('href="/contact"');
  });

  it("nav links have data-i18n attributes for translation", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Header);

    expect(html).toContain('data-i18n="ui.nav.about"');
    expect(html).toContain('data-i18n="ui.nav.projects"');
    expect(html).toContain('data-i18n="ui.nav.work"');
    expect(html).toContain('data-i18n="ui.nav.contact"');
  });

  it("renders the mobile menu button", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Header);

    expect(html).toContain('id="mobile-menu-btn"');
    expect(html).toContain('aria-expanded="false"');
    expect(html).toContain('aria-controls="mobile-menu"');
  });

  it("renders the mobile menu panel", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Header);

    expect(html).toContain('id="mobile-menu"');
    expect(html).toContain('role="dialog"');
    expect(html).toContain('aria-modal="true"');
  });

  it("renders the LanguageToggle", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Header);

    expect(html).toContain("data-lang-switcher");
    expect(html).toContain('data-lang-btn="en"');
    expect(html).toContain('data-lang-btn="ca"');
  });

  it("renders the ThemeToggle", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Header);

    expect(html).toContain("data-theme-toggle");
  });
});
