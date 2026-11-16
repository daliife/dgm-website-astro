import { describe, it, expect } from "vitest";
import { projects, work } from "@cv";
import type { ProjectEntry, WorkEntry } from "../../types/ui";
import {
  getFeaturedProjects,
  getInitials,
  getTechnologyCount,
  getYearsOfExperience,
} from "../../utils/cvStats";

const job = (
  startDate: string,
  endDate?: string,
  position = "Dev",
): WorkEntry => ({ company: "Acme", position, startDate, endDate });

const NOW = new Date("2026-11-14");

describe("getYearsOfExperience", () => {
  it("does not count gaps between jobs", () => {
    const work = [
      job("2016-01-01", "2016-12-01"),
      job("2020-01-01", "2021-12-01"),
    ];
    expect(getYearsOfExperience(work, NOW)).toBe(3);
  });

  it("merges overlapping roles", () => {
    const work = [job("2020-01-01"), job("2021-03-01", "2021-10-01")];
    expect(getYearsOfExperience(work, NOW)).toBe(6);
  });

  it("excludes internships", () => {
    const work = [
      job("2010-01-01", "2015-12-01", "Internship"),
      job("2024-01-01"),
    ];
    expect(getYearsOfExperience(work, NOW)).toBe(2);
  });

  it("gives 7 years for the current cv.json", () => {
    expect(getYearsOfExperience(work as WorkEntry[], NOW)).toBe(7);
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
