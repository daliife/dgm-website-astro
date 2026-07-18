import { describe, it, expect } from "vitest";
import { formatDate } from "../../utils/format";

describe("formatDate", () => {
  it("returns Catalan present label by default", () => {
    expect(formatDate()).toBe("Actualitat");
  });

  it("returns Catalan present label when undefined is passed", () => {
    expect(formatDate(undefined)).toBe("Actualitat");
  });

  it("formats a date string with the default Catalan locale", () => {
    expect(formatDate("2023-03-01")).toBe("març del 2023");
  });

  it("formats January correctly in English", () => {
    expect(formatDate("2020-01-15", "en")).toBe("Jan 2020");
  });

  it("formats December correctly in English", () => {
    expect(formatDate("2022-12-01", "en")).toBe("Dec 2022");
  });

  it("formats mid-year dates correctly in English", () => {
    expect(formatDate("2021-07-20", "en")).toBe("Jul 2021");
  });

  it("returns English present label when requested", () => {
    expect(formatDate(undefined, "en")).toBe("Present");
  });

  it("formats date with Catalan locale", () => {
    const result = formatDate("2023-03-01", "ca");
    expect(result).toBe("març del 2023");
  });

  it("formats date with Spanish locale", () => {
    const result = formatDate("2023-03-01", "es");
    expect(result).toMatch(/2023/);
  });
});
