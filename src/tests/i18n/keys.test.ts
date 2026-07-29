import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { EN } from "../../i18n/en";
import { CA } from "../../i18n/ca";
import { ES } from "../../i18n/es";

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcDir = join(__dirname, "../..");

function getAstroFiles(dir: string): string[] {
  const entries = readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return getAstroFiles(full);
    if (entry.name.endsWith(".astro")) return [full];
    return [];
  });
}

const keyRegexes = [
  /data-i18n="([^"]+)"/g,
  /data-i18n-aria="([^"]+)"/g,
  /data-i18n-alt="([^"]+)"/g,
];
const allKeys = new Set<string>();

for (const file of getAstroFiles(srcDir)) {
  const content = readFileSync(file, "utf-8");
  for (const keyRegex of keyRegexes) {
    for (const match of content.matchAll(keyRegex)) {
      allKeys.add(match[1]);
    }
  }
}

describe("i18n key coverage", () => {
  it("finds at least one data-i18n key in .astro files", () => {
    expect(allKeys.size).toBeGreaterThan(0);
  });

  it("all data-i18n / data-i18n-aria / data-i18n-alt keys exist in EN translations", () => {
    const missing = [...allKeys].filter((k) => !(k in EN));
    expect(missing, `Missing EN keys: ${missing.join(", ")}`).toEqual([]);
  });

  it("all data-i18n / data-i18n-aria / data-i18n-alt keys exist in CA translations", () => {
    const missing = [...allKeys].filter((k) => !(k in CA));
    expect(missing, `Missing CA keys: ${missing.join(", ")}`).toEqual([]);
  });

  it("all data-i18n / data-i18n-aria / data-i18n-alt keys exist in ES translations", () => {
    const missing = [...allKeys].filter((k) => !(k in ES));
    expect(missing, `Missing ES keys: ${missing.join(", ")}`).toEqual([]);
  });
});

describe("i18n — cv.json project descriptions", () => {
  const cvPath = join(__dirname, "../../../cv.json");
  const cv = JSON.parse(readFileSync(cvPath, "utf-8"));
  const projects: unknown[] = cv.projects ?? [];

  it("every project in cv.json has a description key in EN", () => {
    const missing = projects
      .map((_, i) => `projects.${i}.description`)
      .filter((k) => !(k in EN));
    expect(missing, `Missing EN keys: ${missing.join(", ")}`).toEqual([]);
  });

  it("every project in cv.json has a description key in CA", () => {
    const missing = projects
      .map((_, i) => `projects.${i}.description`)
      .filter((k) => !(k in CA));
    expect(missing, `Missing CA keys: ${missing.join(", ")}`).toEqual([]);
  });

  it("every project in cv.json has a description key in ES", () => {
    const missing = projects
      .map((_, i) => `projects.${i}.description`)
      .filter((k) => !(k in ES));
    expect(missing, `Missing ES keys: ${missing.join(", ")}`).toEqual([]);
  });

  it("every project highlight in cv.json has keys in all locales", () => {
    for (const locale of [EN, CA, ES] as const) {
      projects.forEach((project, i) => {
        const highlights = (project as { highlights?: string[] }).highlights;
        if (!highlights?.length) return;
        highlights.forEach((_, j) => {
          expect(locale).toHaveProperty(`projects.${i}.highlights.${j}`);
        });
      });
    }
  });
});

describe("i18n — cv.json languages and certificates", () => {
  const cvPath = join(__dirname, "../../../cv.json");
  const cv = JSON.parse(readFileSync(cvPath, "utf-8"));
  const languages: unknown[] = cv.languages ?? [];
  const certificates: unknown[] = cv.certificates ?? [];

  it("every language has language + fluency keys in all locales", () => {
    for (const locale of [EN, CA, ES] as const) {
      for (let i = 0; i < languages.length; i++) {
        expect(locale).toHaveProperty(`languages.${i}.language`);
        expect(locale).toHaveProperty(`languages.${i}.fluency`);
      }
    }
  });

  it("every certificate has a name key in all locales", () => {
    for (const locale of [EN, CA, ES] as const) {
      for (let i = 0; i < certificates.length; i++) {
        expect(locale).toHaveProperty(`certificates.${i}.name`);
      }
    }
  });
});
