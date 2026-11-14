import type { ProjectEntry, WorkEntry } from "../types/ui";
import { getOrderedProjectEntries, type ProjectMeta } from "./projects";

const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;

/** Whole years since the earliest work `startDate`. */
export function getYearsOfExperience(
  work: WorkEntry[],
  now: Date = new Date(),
): number {
  const starts = work
    .map((job) => new Date(job.startDate).getTime())
    .filter((time) => !Number.isNaN(time));
  if (!starts.length) return 0;
  return Math.max(
    0,
    Math.floor((now.getTime() - Math.min(...starts)) / MS_PER_YEAR),
  );
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
