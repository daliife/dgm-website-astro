import { describe, it, expect } from "vitest";
import { scrambleFrame } from "../../utils/scramble";

const EMAIL = "hello.world@example.com";

describe("scrambleFrame", () => {
  it("returns the final text when complete", () => {
    expect(scrambleFrame(EMAIL, 1)).toBe(EMAIL);
    expect(scrambleFrame(EMAIL, 1.4)).toBe(EMAIL);
  });

  it("keeps length and anchor characters while scrambling", () => {
    const frame = scrambleFrame(EMAIL, 0, () => 0);
    expect(frame).toHaveLength(EMAIL.length);
    expect(frame.indexOf("@")).toBe(EMAIL.indexOf("@"));
    expect(frame.split(".").length).toBe(EMAIL.split(".").length);
    expect(frame).not.toBe(EMAIL);
  });

  it("resolves characters left to right", () => {
    const half = scrambleFrame(EMAIL, 0.5, () => 0);
    const resolved = Math.floor(EMAIL.length / 2);
    expect(half.slice(0, resolved)).toBe(EMAIL.slice(0, resolved));
  });
});
