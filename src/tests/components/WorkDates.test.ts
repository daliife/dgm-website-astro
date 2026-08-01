import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import WorkDates from "../../components/sections/WorkDates.astro";

describe("WorkDates", () => {
  it("renders a localized date range with data attributes", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(WorkDates, {
      props: {
        startDate: "2023-03-01",
        endDate: "2024-01-01",
        className: "dates",
      },
    });

    expect(html).toContain('data-date-start="2023-03-01"');
    expect(html).toContain('data-date-end="2024-01-01"');
    expect(html).toContain("març del 2023");
    expect(html).toContain("gen. del 2024");
  });

  it("uses present label when endDate is omitted", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(WorkDates, {
      props: {
        startDate: "2023-03-01",
        className: "dates",
      },
    });

    expect(html).toMatch(/data-date-end(?:=""|\b)/);
    expect(html).toContain("Actualitat");
  });
});
