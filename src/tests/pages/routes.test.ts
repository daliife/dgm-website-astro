import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import IndexPage from "../../pages/index.astro";
import AboutPage from "../../pages/about.astro";
import ProjectsPage from "../../pages/projects.astro";
import WorkPage from "../../pages/work.astro";
import ContactPage from "../../pages/contact.astro";
import NotFoundPage from "../../pages/404.astro";

const pages = [
  { name: "/", component: IndexPage },
  { name: "/about", component: AboutPage },
  { name: "/projects", component: ProjectsPage },
  { name: "/work", component: WorkPage },
  { name: "/contact", component: ContactPage },
  { name: "/404", component: NotFoundPage },
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
