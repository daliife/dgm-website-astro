import { describe, it, expect } from "vitest";
import { formatDate } from "../../utils/format";

describe("formatDate", () => {
  it("returns 'Present' when no argument is provided", () => {
    expect(formatDate()).toBe("Present");
  });

  it("returns 'Present' when undefined is passed", () => {
    expect(formatDate(undefined)).toBe("Present");
  });

  it("formats a date string to short month + year", () => {
    expect(formatDate("2023-03-01")).toBe("Mar 2023");
  });

  it("formats January correctly", () => {
    expect(formatDate("2020-01-15")).toBe("Jan 2020");
  });

  it("formats December correctly", () => {
    expect(formatDate("2022-12-01")).toBe("Dec 2022");
  });

  it("formats mid-year dates correctly", () => {
    expect(formatDate("2021-07-20")).toBe("Jul 2021");
  });
});
