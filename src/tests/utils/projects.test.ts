import { describe, it, expect } from "vitest";
import { projects } from "@cv";
import type { ProjectEntry } from "../../types/ui";
import {
  findProjectBySlug,
  getProjectEntries,
  slugifyProjectName,
} from "../../utils/projects";

describe("slugifyProjectName", () => {
  it("slugifies plain names", () => {
    expect(slugifyProjectName("Orange RFP")).toBe("orange-rfp");
    expect(slugifyProjectName("Spritz Reader")).toBe("spritz-reader");
  });

  it("strips punctuation and ampersands", () => {
    expect(slugifyProjectName("Shaders & Postpro")).toBe("shaders-postpro");
    expect(slugifyProjectName("Portfolio v1")).toBe("portfolio-v1");
  });
});

describe("getProjectEntries", () => {
  const entries = getProjectEntries(projects as ProjectEntry[]);

  it("returns one entry per project with unique slugs", () => {
    expect(entries).toHaveLength(projects.length);
    const slugs = entries.map((e) => e.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("preserves cv.json index for i18n keys", () => {
    entries.forEach((entry, i) => {
      expect(entry.index).toBe(i);
      expect(entry.project.name).toBe(projects[i].name);
    });
  });
});

describe("findProjectBySlug", () => {
  it("finds a known project", () => {
    const entry = findProjectBySlug(projects as ProjectEntry[], "orange-rfp");
    expect(entry?.project.name).toBe("Orange RFP");
  });

  it("returns undefined for unknown slug", () => {
    expect(
      findProjectBySlug(projects as ProjectEntry[], "does-not-exist"),
    ).toBeUndefined();
  });
});
