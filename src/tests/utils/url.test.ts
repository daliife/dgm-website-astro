import { describe, it, expect } from "vitest";
import { SITE_BASE } from "../../utils/url";
import { stripProtocol } from "../../utils/format";

describe("SITE_BASE", () => {
  it("is a string without trailing slash", () => {
    expect(typeof SITE_BASE).toBe("string");
    expect(SITE_BASE.endsWith("/")).toBe(false);
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
