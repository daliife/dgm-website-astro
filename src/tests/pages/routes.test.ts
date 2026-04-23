import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import IndexPage from "../../pages/index.astro";
import AboutPage from "../../pages/about.astro";
import ProjectsPage from "../../pages/projects.astro";
import WorkPage from "../../pages/work.astro";
import ContactPage from "../../pages/contact.astro";
import NotFoundPage from "../../pages/404.astro";
import PrivacyPage from "../../pages/privacy.astro";

const pages = [
  { name: "/", component: IndexPage },
  { name: "/about", component: AboutPage },
  { name: "/projects", component: ProjectsPage },
  { name: "/work", component: WorkPage },
  { name: "/contact", component: ContactPage },
  { name: "/404", component: NotFoundPage },
  { name: "/privacy", component: PrivacyPage },
];

describe("Pages — render without errors", () => {
  for (const { name, component } of pages) {
    it(`renders ${name}`, async () => {
      const container = await AstroContainer.create();
      const html = await container.renderToString(component);

      expect(html).toBeTruthy();
      expect(html.length).toBeGreaterThan(100);
    });
  }
});

describe("Pages — i18n", () => {
  it("nav links have data-i18n keys for all routes", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(IndexPage);

    expect(html).toContain('data-i18n="ui.nav.about"');
    expect(html).toContain('data-i18n="ui.nav.projects"');
    expect(html).toContain('data-i18n="ui.nav.work"');
    expect(html).toContain('data-i18n="ui.nav.contact"');
  });

  it("/about page heading has data-i18n key", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(AboutPage);

    expect(html).toContain("data-i18n");
  });

  it("/contact page intro has data-i18n key", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ContactPage);

    expect(html).toContain("data-i18n");
  });
});

describe("Pages — basic HTML structure", () => {
  it("/ contains name heading", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(IndexPage);

    expect(html).toContain("<h1");
  });

  it("/about contains a <main> or content section", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(AboutPage);

    expect(html).toMatch(/<(main|section|article)/);
  });

  it("/projects contains project cards", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ProjectsPage);

    expect(html).toContain("<article");
  });

  it("/work contains work cards", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(WorkPage);

    expect(html).toContain("<article");
  });

  it("/contact contains a contact email or link", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ContactPage);

    expect(html).toMatch(/href="mailto:|href="https:\/\/(linkedin|github)/);
  });

  it("/404 contains a 404 message", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(NotFoundPage);

    expect(html).toMatch(/404|not found|no trobat/i);
  });
});

describe("Pages — semantic HTML structure", () => {
  it.each(pages)("$name has exactly one <h1>", async ({ component }) => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(component);
    const h1matches = html.match(/<h1[\s>]/g) ?? [];
    expect(h1matches).toHaveLength(1);
  });

  it.each(pages)("$name has no images without alt", async ({ component }) => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(component);
    // Match <img> tags that have no alt attribute at all
    const imgWithoutAlt = html.match(/<img(?![^>]*\balt\s*=)[^>]*>/g) ?? [];
    expect(imgWithoutAlt).toHaveLength(0);
  });

  it.each(pages)("$name nav has aria-label", async ({ component }) => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(component);
    // Every <nav> must have aria-label or aria-labelledby
    const navTags = [...html.matchAll(/<nav\b([^>]*)>/g)];
    for (const [, attrs] of navTags) {
      expect(attrs).toMatch(/aria-label(ledby)?/);
    }
  });

  it("/about has correct heading order (h1 before h2)", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(AboutPage);
    const h1pos = html.indexOf("<h1");
    const h2pos = html.indexOf("<h2");
    expect(h1pos).toBeGreaterThan(-1);
    if (h2pos !== -1) expect(h1pos).toBeLessThan(h2pos);
  });

  it("/work has correct heading order (h1 before h2)", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(WorkPage);
    const h1pos = html.indexOf("<h1");
    const h2pos = html.indexOf("<h2");
    expect(h1pos).toBeGreaterThan(-1);
    if (h2pos !== -1) expect(h1pos).toBeLessThan(h2pos);
  });
});
