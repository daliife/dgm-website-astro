import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const manifest = JSON.parse(
  readFileSync(
    join(
      dirname(fileURLToPath(import.meta.url)),
      "../../../public/site.webmanifest",
    ),
    "utf-8",
  ),
) as {
  name: string;
  icons: unknown[];
  display: string;
  start_url: string;
  scope: string;
};

describe("public/site.webmanifest", () => {
  it("is a valid PWA manifest with required fields", () => {
    expect(manifest.name).toBeTruthy();
    expect(manifest.icons.length).toBeGreaterThan(0);
    expect(manifest.display).toBe("standalone");
  });

  it("uses same-origin relative start_url and scope", () => {
    expect(manifest.start_url).toBe("./");
    expect(manifest.scope).toBe("./");
    expect(manifest.start_url).not.toMatch(/^https?:\/\//);
    expect(manifest.scope).not.toMatch(/^https?:\/\//);
  });
});
