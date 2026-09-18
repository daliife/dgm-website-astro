import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const layout = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), "../../layouts/Layout.astro"),
  "utf-8",
);

describe("Layout scroll reveal", () => {
  it("keeps .reveal visible until JS adds html.reveal-ready", () => {
    expect(layout).toContain("html.reveal-ready .reveal:not(.is-visible)");
    expect(layout).toContain(
      "html.reveal-ready .reveal-stagger:not(.is-visible)",
    );
    expect(layout).toContain('classList.add("reveal-ready")');
    expect(layout).not.toMatch(/\.reveal\s*\{\s*opacity:\s*0/);
  });
});
