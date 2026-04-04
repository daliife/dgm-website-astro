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
      props: { project: baseProject },
    });

    expect(html).toContain("My Project");
    expect(html).toContain("A test project description.");
  });

  it("renders project URL as link", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ProjectCard, {
      props: { project: baseProject },
    });

    expect(html).toContain('href="https://example.com"');
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
  });

  it("renders technologies", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ProjectCard, {
      props: { project: baseProject },
    });

    expect(html).toContain("TypeScript");
    expect(html).toContain("Astro");
  });

  it("shows placeholder SVG when no image is provided", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ProjectCard, {
      props: { project: { ...baseProject, image: undefined } },
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
      },
    });

    expect(html).toContain("<img");
    expect(html).toContain('src="/images/project.png"');
    expect(html).toContain('alt="My Project"');
    expect(html).toContain("data-use-fallback");
  });
});
