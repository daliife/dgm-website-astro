import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import ThemeToggle from "../../components/brand/ThemeToggle.astro";

describe("ThemeToggle", () => {
  it("renders a button element", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ThemeToggle);
    expect(html).toContain("<button");
  });

  it("has type='button' to prevent form submission", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ThemeToggle);
    expect(html).toContain('type="button"');
  });

  it("has accessible aria-label", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ThemeToggle);
    expect(html).toContain('aria-label="Switch to dark mode"');
  });

  it("has aria-pressed attribute for screen readers", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ThemeToggle);
    expect(html).toContain('aria-pressed="false"');
  });

  it("has data-theme-toggle attribute for JS hook", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ThemeToggle);
    expect(html).toContain("data-theme-toggle");
  });

  it("renders the sun icon (shown in dark mode)", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ThemeToggle);
    expect(html).toContain("hidden dark:block");
  });

  it("renders the moon icon (shown in light mode)", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ThemeToggle);
    expect(html).toContain("block dark:hidden");
  });
});
