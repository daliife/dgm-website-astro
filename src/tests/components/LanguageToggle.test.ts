import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import LanguageToggle from "../../components/brand/LanguageToggle.astro";

describe("LanguageToggle", () => {
  it("renders a toggle button", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(LanguageToggle);

    expect(html).toContain("<button");
    expect(html).toContain('aria-label="Select language"');
  });

  it("has aria-haspopup and aria-expanded on toggle button", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(LanguageToggle);

    expect(html).toContain('aria-haspopup="listbox"');
    expect(html).toContain('aria-expanded="false"');
  });

  it("renders the language dropdown with listbox role", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(LanguageToggle);

    expect(html).toContain('role="listbox"');
    expect(html).toContain("data-lang-dropdown");
  });

  it("renders EN option as selected by default", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(LanguageToggle);

    expect(html).toContain('data-lang-btn="en"');
    expect(html).toContain('aria-selected="true"');
  });

  it("renders CA option", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(LanguageToggle);

    expect(html).toContain('data-lang-btn="ca"');
  });

  it("shows current language indicator", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(LanguageToggle);

    expect(html).toContain("data-lang-current");
  });

  it("wraps in data-lang-switcher container", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(LanguageToggle);

    expect(html).toContain("data-lang-switcher");
  });
});
