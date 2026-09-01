import { describe, it, expect } from "vitest";
import { projects } from "@cv";
import type { ProjectEntry } from "../../types/ui";
import {
  findProjectBySlug,
  getAdjacentProjects,
  getOrderedProjectEntries,
  getProjectEntries,
  isGitHubRepoUrl,
  slugifyProjectName,
} from "../../utils/projects";

describe("slugifyProjectName", () => {
  it("slugifies plain names", () => {
    expect(slugifyProjectName("Orange RFP")).toBe("orange-rfp");
    expect(slugifyProjectName("Spritz Reader")).toBe("spritz-reader");
    expect(slugifyProjectName("Eclipse Viewer")).toBe("eclipse-viewer");
    expect(slugifyProjectName("Stashly")).toBe("stashly");
    expect(slugifyProjectName("LCARS Weather Console")).toBe(
      "lcars-weather-console",
    );
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

describe("getAdjacentProjects", () => {
  it("uses list order (professional → personal → academic), not cv.json order", () => {
    const { prev, next } = getAdjacentProjects(
      projects as ProjectEntry[],
      "seat-rfp",
    );
    // First professional item — no previous in list order
    expect(prev).toBeUndefined();
    expect(next?.slug).toBe("hmi-seat");
  });

  it("returns prev only for the last project in list order", () => {
    const ordered = getOrderedProjectEntries(projects as ProjectEntry[]);
    const last = ordered[ordered.length - 1];
    const { prev, next } = getAdjacentProjects(
      projects as ProjectEntry[],
      last.slug,
    );
    expect(next).toBeUndefined();
    expect(prev?.slug).toBe(ordered[ordered.length - 2].slug);
  });
});

describe("isGitHubRepoUrl", () => {
  it("detects github.com repository URLs", () => {
    expect(isGitHubRepoUrl("https://github.com/daliife/PodRacers")).toBe(true);
  });

  it("rejects GitHub Pages and other hosts", () => {
    expect(isGitHubRepoUrl("https://daliife.github.io/rfp-seat")).toBe(false);
    expect(isGitHubRepoUrl("https://estudiseitai.cat/")).toBe(false);
  });
});
