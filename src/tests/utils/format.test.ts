import { describe, it, expect } from "vitest";
import {
  formatDate,
  formatDateRange,
  isSameMonthYear,
} from "../../utils/format";

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

describe("isSameMonthYear", () => {
  it("detects same calendar month and year", () => {
    expect(isSameMonthYear("2020-10-09", "2020-10-23")).toBe(true);
    expect(isSameMonthYear("2019-04-14", "2019-04-14")).toBe(true);
  });

  it("rejects different months, years, or missing end", () => {
    expect(isSameMonthYear("2020-10-26", "2020-11-12")).toBe(false);
    expect(isSameMonthYear("2020-05-20", "2021-10-10")).toBe(false);
    expect(isSameMonthYear("2023-03-01")).toBe(false);
  });
});

describe("formatDateRange", () => {
  it("collapses same month and year to a single label", () => {
    expect(formatDateRange("2020-10-09", "2020-10-23")).toBe("oct. del 2020");
    expect(formatDateRange("2026-05-17", "2026-05-25", "en")).toBe("May 2026");
  });

  it("keeps a range when months differ", () => {
    expect(formatDateRange("2020-10-26", "2020-11-12")).toBe(
      "oct. del 2020 — nov. del 2020",
    );
  });

  it("uses present label when endDate is omitted", () => {
    expect(formatDateRange("2023-03-01")).toBe("març del 2023 — Actualitat");
  });
});
