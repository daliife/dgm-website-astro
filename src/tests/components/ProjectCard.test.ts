import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import ProjectCard from "../../components/sections/ProjectCard.astro";
import type { ProjectEntry } from "../../types/ui";

const baseProject: ProjectEntry = {
  name: "My Project",
  description: "A test project description.",
  url: "https://example.com",
  technologies: ["TypeScript", "Astro"],
};

describe("ProjectCard", () => {
  it("renders project name and description", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ProjectCard, {
      props: { project: baseProject, projectIndex: 0, slug: "my-project" },
    });

    expect(html).toContain("My Project");
    expect(html).toContain('data-i18n="projects.0.description"');
  });

  it("links to the internal project detail page", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ProjectCard, {
      props: { project: baseProject, projectIndex: 0, slug: "my-project" },
    });

    expect(html).toContain('href="/projects/my-project"');
    expect(html).not.toContain('target="_blank"');
    expect(html).not.toContain("https://example.com");
  });

  it("renders technologies", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ProjectCard, {
      props: { project: baseProject, projectIndex: 0, slug: "my-project" },
    });

    expect(html).toContain("TypeScript");
    expect(html).toContain("Astro");
  });

  it("shows placeholder SVG when no image is provided", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ProjectCard, {
      props: {
        project: { ...baseProject, image: undefined },
        projectIndex: 0,
        slug: "my-project",
      },
    });

    expect(html).toContain("<svg");
    expect(html).not.toContain("<img");
  });

  it("renders image tag when image is provided", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ProjectCard, {
      props: {
        project: {
          ...baseProject,
          image: "/images/project.png",
        },
        projectIndex: 0,
        slug: "my-project",
      },
    });

    expect(html).toContain("<img");
    expect(html).toContain('src="/images/project.png"');
    expect(html).toContain('alt="My Project"');
    expect(html).toContain("data-use-fallback");
  });

  it("uses eager loading and fetchpriority when priority is true", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ProjectCard, {
      props: {
        project: { ...baseProject, image: "/projects/test.webp" },
        projectIndex: 0,
        slug: "my-project",
        priority: true,
      },
    });

    expect(html).toContain('loading="eager"');
    expect(html).toContain('fetchpriority="high"');
  });

  it("labels each project article with its title heading", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ProjectCard, {
      props: {
        project: baseProject,
        projectIndex: 2,
        slug: "my-project",
      },
    });

    expect(html).toContain('aria-labelledby="project-2-title"');
    expect(html).toContain('id="project-2-title"');
  });

  it("renders formatted dates when startDate is provided", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ProjectCard, {
      props: {
        project: {
          ...baseProject,
          startDate: "2020-10-26",
          endDate: "2020-11-12",
        },
        projectIndex: 0,
        slug: "my-project",
      },
    });

    expect(html).toContain('data-date-start="2020-10-26"');
    expect(html).toContain('data-date-end="2020-11-12"');
  });

  it("omits dates when startDate is missing", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ProjectCard, {
      props: {
        project: baseProject,
        projectIndex: 0,
        slug: "my-project",
      },
    });

    expect(html).not.toContain("data-date-start");
  });
});
