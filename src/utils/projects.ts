import type { ProjectEntry } from "../types/ui";

export interface ProjectMeta {
  project: ProjectEntry;
  index: number;
  slug: string;
}

/** URL-safe slug from a project name (no invented content — name only). */
export function slugifyProjectName(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Indexed projects with unique slugs for list + detail routes. */
export function getProjectEntries(projects: ProjectEntry[]): ProjectMeta[] {
  const used = new Set<string>();

  return projects.map((project, index) => {
    let slug = slugifyProjectName(project.name);
    if (!slug) slug = `project-${index}`;
    if (used.has(slug)) slug = `${slug}-${index}`;
    used.add(slug);
    return { project, index, slug };
  });
}

export function findProjectBySlug(
  projects: ProjectEntry[],
  slug: string,
): ProjectMeta | undefined {
  return getProjectEntries(projects).find((entry) => entry.slug === slug);
}
