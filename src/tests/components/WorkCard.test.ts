import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import WorkCard from "../../components/sections/WorkCard.astro";
import type { WorkEntry } from "../../types/ui";

const baseJob: WorkEntry = {
  company: "Acme Corp",
  position: "Frontend Developer",
  url: "https://acme.com",
  startDate: "2022-01-01",
  endDate: "2024-06-01",
  summary: "Built and maintained the main web platform.",
  highlights: ["Reduced bundle size by 40%", "Led design system migration"],
};

describe("WorkCard", () => {
  it("renders position and company", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(WorkCard, {
      props: { job: baseJob },
    });

    expect(html).toContain("Frontend Developer");
    expect(html).toContain("Acme Corp");
  });

  it("renders company as a link", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(WorkCard, {
      props: { job: baseJob },
    });

    expect(html).toContain('href="https://acme.com"');
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
  });

  it("renders formatted dates", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(WorkCard, {
      props: { job: baseJob },
    });

    expect(html).toContain("Jan 2022");
    expect(html).toContain("Jun 2024");
  });

  it("shows Present when endDate is not provided", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(WorkCard, {
      props: { job: { ...baseJob, endDate: undefined } },
    });

    expect(html).toContain("Present");
  });

  it("renders summary when provided", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(WorkCard, {
      props: { job: baseJob },
    });

    expect(html).toContain("Built and maintained the main web platform.");
  });

  it("does not render summary section when not provided", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(WorkCard, {
      props: { job: { ...baseJob, summary: undefined } },
    });

    expect(html).not.toContain("Built and maintained");
  });

  it("renders highlights list", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(WorkCard, {
      props: { job: baseJob },
    });

    expect(html).toContain("Reduced bundle size by 40%");
    expect(html).toContain("Led design system migration");
  });

  it("does not render highlights when list is empty", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(WorkCard, {
      props: { job: { ...baseJob, highlights: [] } },
    });

    expect(html).not.toContain("<ul");
  });
});
