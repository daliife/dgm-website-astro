import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import ProjectCategoryFilter from "../../components/sections/ProjectCategoryFilter.astro";

describe("ProjectCategoryFilter", () => {
  it("renders filter controls when multiple categories", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ProjectCategoryFilter, {
      props: {
        categories: ["professional", "personal"],
      },
    });

    expect(html).toContain('id="projects-category-filter"');
    expect(html).toContain('data-project-filter="all"');
    expect(html).toContain('data-project-filter="professional"');
    expect(html).toContain('data-i18n="ui.projects.filter.all"');
  });
});
