import { describe, it, expect } from "vitest";
import { SITE_BASE, pageHref } from "../../utils/url";
import { stripProtocol } from "../../utils/format";

describe("SITE_BASE", () => {
  it("is a string without trailing slash", () => {
    expect(typeof SITE_BASE).toBe("string");
    expect(SITE_BASE.endsWith("/")).toBe(false);
  });
});

describe("pageHref", () => {
  it("returns a trailing-slash home path", () => {
    expect(pageHref()).toBe(`${SITE_BASE}/`);
    expect(pageHref().endsWith("/")).toBe(true);
  });

  it("builds nested page paths with a trailing slash", () => {
    expect(pageHref("projects")).toBe(`${SITE_BASE}/projects/`);
    expect(pageHref("projects", "orange-rfp")).toBe(
      `${SITE_BASE}/projects/orange-rfp/`,
    );
  });

  it("builds privacy and nav page paths with a trailing slash", () => {
    expect(pageHref("privacy")).toBe(`${SITE_BASE}/privacy/`);
    expect(pageHref("about")).toBe(`${SITE_BASE}/about/`);
    expect(pageHref("work")).toBe(`${SITE_BASE}/work/`);
    expect(pageHref("contact")).toBe(`${SITE_BASE}/contact/`);
  });

  it("ignores empty segments", () => {
    expect(pageHref("", "projects", "", "orange-rfp")).toBe(
      `${SITE_BASE}/projects/orange-rfp/`,
    );
  });
});

describe("stripProtocol", () => {
  it("removes https and www prefix", () => {
    expect(stripProtocol("https://www.example.com/path")).toBe(
      "example.com/path",
    );
  });

  it("removes http prefix", () => {
    expect(stripProtocol("http://example.com")).toBe("example.com");
  });
});
