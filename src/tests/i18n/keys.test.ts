import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { CA } from "../../i18n/ca";
import { ES } from "../../i18n/es";

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcDir = join(__dirname, "../..");

function getAstroFiles(dir: string): string[] {
  const entries = readdirSync(dir, { withFileTypes: true });
  return entries.flatMap(entry => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return getAstroFiles(full);
    if (entry.name.endsWith(".astro")) return [full];
    return [];
  });
}

const keyRegex = /data-i18n="([^"]+)"/g;
const allKeys = new Set<string>();

for (const file of getAstroFiles(srcDir)) {
  const content = readFileSync(file, "utf-8");
  for (const match of content.matchAll(keyRegex)) {
    allKeys.add(match[1]);
  }
}

describe("i18n key coverage", () => {
  it("finds at least one data-i18n key in .astro files", () => {
    expect(allKeys.size).toBeGreaterThan(0);
  });

  it("all data-i18n keys exist in CA translations", () => {
    const missing = [...allKeys].filter(k => !(k in CA));
    expect(missing, `Missing CA keys: ${missing.join(", ")}`).toEqual([]);
  });

  it("all data-i18n keys exist in ES translations", () => {
    const missing = [...allKeys].filter(k => !(k in ES));
    expect(missing, `Missing ES keys: ${missing.join(", ")}`).toEqual([]);
  });
});
