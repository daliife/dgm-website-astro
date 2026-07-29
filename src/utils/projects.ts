import type { ProjectEntry } from "../types/ui";

export interface ProjectMeta {
  project: ProjectEntry;
  index: number;
  slug: string;
}

/** Same category order as `/projects/` list sections. */
export const PROJECT_CATEGORY_ORDER = [
  "professional",
  "personal",
  "academic",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORY_ORDER)[number];

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

/**
 * Projects in the same visual order as `/projects/`:
 * professional → personal → academic (cv.json order within each group).
 */
export function getOrderedProjectEntries(
  projects: ProjectEntry[],
): ProjectMeta[] {
  const entries = getProjectEntries(projects);
  const ordered: ProjectMeta[] = [];

  for (const category of PROJECT_CATEGORY_ORDER) {
    ordered.push(
      ...entries.filter(({ project }) => project.category === category),
    );
  }

  ordered.push(
    ...entries.filter(
      ({ project }) =>
        !project.category ||
        !PROJECT_CATEGORY_ORDER.includes(project.category as ProjectCategory),
    ),
  );

  return ordered;
}

export function findProjectBySlug(
  projects: ProjectEntry[],
  slug: string,
): ProjectMeta | undefined {
  return getProjectEntries(projects).find((entry) => entry.slug === slug);
}

export function getAdjacentProjects(
  projects: ProjectEntry[],
  slug: string,
): { prev?: ProjectMeta; next?: ProjectMeta } {
  const entries = getOrderedProjectEntries(projects);
  const index = entries.findIndex((entry) => entry.slug === slug);
  if (index < 0) return {};
  return {
    prev: index > 0 ? entries[index - 1] : undefined,
    next: index < entries.length - 1 ? entries[index + 1] : undefined,
  };
}

/** True when the URL points at a github.com repository (not Pages). */
export function isGitHubRepoUrl(url: string): boolean {
  try {
    const { hostname, pathname } = new URL(url);
    if (hostname !== "github.com") return false;
    const parts = pathname.split("/").filter(Boolean);
    return parts.length >= 2;
  } catch {
    return false;
  }
}
