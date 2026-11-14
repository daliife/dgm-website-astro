import type { ProjectEntry, WorkEntry } from "../types/ui";
import { getOrderedProjectEntries, type ProjectMeta } from "./projects";

const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;

const INTERNSHIP_RE = /\bintern(ship)?\b/i;

/**
 * Whole years actually worked: internships excluded, overlapping roles merged,
 * gaps between jobs not counted. `endDate` is inclusive (month-granular).
 */
export function getYearsOfExperience(
  work: WorkEntry[],
  now: Date = new Date(),
): number {
  const ranges = work
    .filter((job) => !INTERNSHIP_RE.test(job.position))
    .map((job) => {
      const start = new Date(job.startDate);
      const end = job.endDate ? new Date(job.endDate) : new Date(now);
      if (job.endDate) end.setUTCMonth(end.getUTCMonth() + 1);
      return [start.getTime(), Math.min(end.getTime(), now.getTime())];
    })
    .filter(([start, end]) => !Number.isNaN(start) && end > start)
    .sort((a, b) => a[0] - b[0]);

  let total = 0;
  let current: number[] | undefined;
  for (const range of ranges) {
    if (current && range[0] <= current[1]) {
      current[1] = Math.max(current[1], range[1]);
    } else {
      if (current) total += current[1] - current[0];
      current = [...range];
    }
  }
  if (current) total += current[1] - current[0];

  return Math.floor(total / MS_PER_YEAR);
}

/** Distinct technologies across all projects (case-insensitive). */
export function getTechnologyCount(projects: ProjectEntry[]): number {
  const names = projects.flatMap((p) => p.technologies ?? []);
  return new Set(names.map((name) => name.trim().toLowerCase())).size;
}

/**
 * Monogram for timeline markers when no logo is set:
 * a leading acronym ("NTT Data" → "NTT"), otherwise first letters of two words.
 */
export function getInitials(name: string): string {
  const words = name
    .replace(/\(.*?\)/g, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (!words.length) return "";
  if (/^\p{Lu}{2,4}$/u.test(words[0])) return words[0];
  return words
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

/** Projects flagged `featured` in cv.json, or the first ones in list order. */
export function getFeaturedProjects(
  projects: ProjectEntry[],
  limit = 3,
): ProjectMeta[] {
  const ordered = getOrderedProjectEntries(projects);
  const featured = ordered.filter(({ project }) => project.featured);
  return (featured.length ? featured : ordered).slice(0, limit);
}
