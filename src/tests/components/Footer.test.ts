import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import Footer from "../../components/layout/Footer.astro";

describe("Footer", () => {
  it("renders a <footer> element with contentinfo role", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Footer);
    expect(html).toContain("<footer");
    expect(html).toContain('role="contentinfo"');
  });

  it("renders the LinkedIn social link", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Footer);
    expect(html).toContain("LinkedIn");
    expect(html).toContain("linkedin.com");
  });

  it("renders the GitHub social link", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Footer);
    expect(html).toContain("GitHub");
    expect(html).toContain("github.com");
  });

  it("renders the Email social link", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Footer);
    expect(html).toContain("Email");
    expect(html).toContain("mailto:");
  });

  it("renders the current copyright year", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Footer);
    expect(html).toContain(new Date().getFullYear().toString());
  });

  it("external links have rel='noopener noreferrer'", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Footer);
    expect(html).toContain('rel="noopener noreferrer"');
  });

  it("renders the footer social nav landmark", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Footer);
    expect(html).toContain('aria-label="Footer social links"');
  });
});
