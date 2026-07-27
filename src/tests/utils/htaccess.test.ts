import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const htaccess = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), "../../../public/.htaccess"),
  "utf-8",
);

describe("public/.htaccess security headers", () => {
  it("sets core hardening headers", () => {
    expect(htaccess).toContain("X-Content-Type-Options");
    expect(htaccess).toContain("X-Frame-Options");
    expect(htaccess).toContain("Referrer-Policy");
    expect(htaccess).toContain("Permissions-Policy");
    expect(htaccess).toContain("Strict-Transport-Security");
    expect(htaccess).toContain("Content-Security-Policy");
  });

  it("allows self-hosted assets and Umami analytics in CSP", () => {
    expect(htaccess).toContain("default-src 'self'");
    expect(htaccess).toContain("frame-ancestors 'none'");
    expect(htaccess).toContain("https://cloud.umami.is");
  });
});
