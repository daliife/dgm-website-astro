import { describe, it, expect } from "vitest";
import { projects } from "@cv";
import type { ProjectEntry, WorkEntry } from "../../types/ui";
import {
  getFeaturedProjects,
  getInitials,
  getTechnologyCount,
  getYearsOfExperience,
} from "../../utils/cvStats";

const job = (startDate: string): WorkEntry => ({
  company: "Acme",
  position: "Dev",
  startDate,
});

describe("getYearsOfExperience", () => {
  it("counts whole years from the earliest start date", () => {
    const work = [job("2020-06-01"), job("2016-09-01")];
    expect(getYearsOfExperience(work, new Date("2026-11-14"))).toBe(10);
  });

  it("returns 0 without work entries", () => {
    expect(getYearsOfExperience([])).toBe(0);
  });
});

describe("getTechnologyCount", () => {
  it("counts distinct technologies case-insensitively", () => {
    const list: ProjectEntry[] = [
      { name: "A", description: "", technologies: ["React", "CSS"] },
      { name: "B", description: "", technologies: ["react", "Vite"] },
      { name: "C", description: "" },
    ];
    expect(getTechnologyCount(list)).toBe(3);
  });
});

describe("getInitials", () => {
  it.each([
    ["NTT Data", "NTT"],
    ["La Salle BCN", "LS"],
    ["Rücker Lypsa", "RL"],
    ["Wanup", "W"],
    ["EMAV (Escola de Mitjans Audiovisuals)", "EMAV"],
  ])("%s → %s", (name, expected) => {
    expect(getInitials(name)).toBe(expected);
  });
});

describe("getFeaturedProjects", () => {
  it("prefers projects flagged as featured", () => {
    const featured = getFeaturedProjects(projects as ProjectEntry[]);
    expect(featured.length).toBeGreaterThan(0);
    expect(featured.length).toBeLessThanOrEqual(3);
    if ((projects as ProjectEntry[]).some((p) => p.featured)) {
      expect(featured.every(({ project }) => project.featured)).toBe(true);
    }
  });

  it("falls back to list order when nothing is featured", () => {
    const list: ProjectEntry[] = [
      { name: "One", description: "", category: "personal" },
      { name: "Two", description: "", category: "professional" },
    ];
    expect(getFeaturedProjects(list, 1).map((p) => p.project.name)).toEqual([
      "Two",
    ]);
  });
});
