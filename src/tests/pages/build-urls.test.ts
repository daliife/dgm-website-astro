import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { projects } from "@cv";
import type { ProjectEntry } from "../../types/ui";
import { NAV_LINKS } from "../../utils/constants";
import { getProjectEntries } from "../../utils/projects";
import { pageHref } from "../../utils/url";

const distRoot = join(process.cwd(), "dist");
const requireDist = process.env.REQUIRE_DIST === "1";
const projectEntries = getProjectEntries(projects as ProjectEntry[]);

/** Static HTML paths Astro emits with `trailingSlash: "always"`. */
function expectedDistHtmlPaths(): string[] {
  return [
    "index.html",
    "404.html",
    "about/index.html",
    "work/index.html",
    "projects/index.html",
    "contact/index.html",
    "privacy/index.html",
    ...projectEntries.map(({ slug }) => `projects/${slug}/index.html`),
  ];
}

describe("Route inventory (source of truth)", () => {
  it("NAV_LINKS covers the four primary pages with trailing-slash hrefs", () => {
    expect(NAV_LINKS.map((l) => l.href)).toEqual([
      "about",
      "work",
      "projects",
      "contact",
    ]);
    for (const { href } of NAV_LINKS) {
      expect(pageHref(href)).toBe(`/${href}/`);
    }
  });

  it("pageHref covers privacy and every project detail slug", () => {
    expect(pageHref("privacy")).toBe("/privacy/");
    expect(projectEntries.length).toBe(projects.length);
    for (const { slug } of projectEntries) {
      expect(pageHref("projects", slug)).toBe(`/projects/${slug}/`);
    }
  });

  it("expected dist paths include home, nav pages, privacy, 404, and all projects", () => {
    const paths = expectedDistHtmlPaths();
    expect(paths).toContain("index.html");
    expect(paths).toContain("404.html");
    expect(paths).toContain("privacy/index.html");
    for (const { href } of NAV_LINKS) {
      expect(paths).toContain(`${href}/index.html`);
    }
    expect(paths).toHaveLength(7 + projectEntries.length);
  });
});

describe("Build output URLs", () => {
  it("dist/ contains every expected page HTML file", ({ skip }) => {
    if (!existsSync(distRoot)) {
      if (requireDist) {
        throw new Error(
          "dist/ is missing. Run `pnpm run build` before `pnpm run test:build-urls`.",
        );
      }
      skip();
    }

    for (const rel of expectedDistHtmlPaths()) {
      expect(existsSync(join(distRoot, rel)), `missing dist/${rel}`).toBe(true);
    }

    expect(existsSync(join(distRoot, "sitemap-index.xml"))).toBe(true);
  });
});
