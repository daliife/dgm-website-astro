import { describe, it, expect } from "vitest";
import { cubicBezier, rollEase } from "../../utils/heroRoll";

describe("cubicBezier", () => {
  it("is the identity for a linear curve", () => {
    const linear = cubicBezier(0, 0, 1, 1);
    for (const t of [0, 0.25, 0.5, 0.9, 1]) expect(linear(t)).toBeCloseTo(t);
  });

  it("matches the CSS `ease` keyword at its midpoint", () => {
    // Chrome's cubic-bezier(0.25, 0.1, 0.25, 1) at x = 0.5 ≈ 0.8024.
    expect(cubicBezier(0.25, 0.1, 0.25, 1)(0.5)).toBeCloseTo(0.8024, 3);
  });
});

describe("rollEase", () => {
  it("runs from 0 to 1, easing in gently and settling softly", () => {
    expect(rollEase(0)).toBe(0);
    expect(rollEase(1)).toBe(1);
    expect(rollEase(0.1)).toBeLessThan(0.1);
    expect(rollEase(0.9)).toBeGreaterThan(0.9);
  });
});
