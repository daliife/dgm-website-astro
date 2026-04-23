import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import Button from "../../components/ui/Button.astro";

describe("Button", () => {
  it("renders as <button> when no href is provided", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Button, {
      props: { variant: "primary" },
      slots: { default: "Click me" },
    });

    expect(html).toContain("<button");
    expect(html).toContain("Click me");
    expect(html).not.toContain("<a ");
  });

  it("renders as <a> when href is provided", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Button, {
      props: { href: "/about", variant: "outline" },
      slots: { default: "Go to about" },
    });

    expect(html).toContain("<a");
    expect(html).toContain('href="/about"');
    expect(html).not.toContain("<button");
  });

  it("applies rel and target to link buttons", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Button, {
      props: {
        href: "https://example.com",
        target: "_blank",
        rel: "noopener noreferrer",
        variant: "ghost",
      },
      slots: { default: "External" },
    });

    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
  });

  it("renders disabled state on button", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Button, {
      props: { disabled: true, variant: "primary" },
      slots: { default: "Disabled" },
    });

    expect(html).toContain("disabled");
  });

  it("applies aria-label when provided", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Button, {
      props: { variant: "icon", "aria-label": "Toggle theme" },
      slots: { default: "☀️" },
    });

    expect(html).toContain('aria-label="Toggle theme"');
  });

  it.each([
    "primary",
    "secondary",
    "outline",
    "ghost",
    "simple",
    "icon",
  ] as const)("renders variant %s without throwing", async variant => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Button, {
      props: { variant },
      slots: { default: variant },
    });

    expect(html).toBeTruthy();
  });

  it.each([
    ["primary", "sm"],
    ["primary", "lg"],
    ["outline", "sm"],
    ["ghost", "md"],
    ["icon", "icon"],
    ["simple", "none"],
  ] as const)(
    "renders variant %s with size %s without throwing",
    async (variant, size) => {
      const container = await AstroContainer.create();
      const html = await container.renderToString(Button, {
        props: { variant, size },
        slots: { default: "test" },
      });

      expect(html).toBeTruthy();
    }
  );

  it("merges custom className with base classes", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Button, {
      props: { variant: "primary", className: "my-custom-class" },
      slots: { default: "styled" },
    });

    expect(html).toContain("my-custom-class");
    expect(html).toContain("inline-flex");
  });

  it("renders loading spinner when loading=true", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Button, {
      props: { variant: "primary", loading: true },
      slots: { default: "Loading..." },
    });

    expect(html).toContain("animate-spin");
  });
});
