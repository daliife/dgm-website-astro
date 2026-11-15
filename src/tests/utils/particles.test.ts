import { describe, it, expect } from "vitest";
import {
  focusWeight,
  matchNearest,
  planMorph,
  spacedPoints,
} from "../../utils/particles";
import { HERO_ICONS } from "../../utils/icons";
import { TYPEWRITER_KEYS } from "../../utils/typewriter";

describe("planMorph", () => {
  const points = [
    { x: 0, y: 0 },
    { x: 10, y: 0 },
    { x: 1, y: 0 },
  ];

  it("moves the current icon's points on before recruiting new ones", () => {
    // Point 2 sits closer to the target, but point 0 is already in the icon.
    expect(planMorph([{ x: 2, y: 0 }], points, [true, false, false])).toEqual([
      0,
    ]);
  });

  it("recruits the nearest outside points once the icon runs out", () => {
    const targets = [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
    ];
    expect(planMorph(targets, points, [true, false, false])).toEqual([0, 2]);
  });
});

describe("focusWeight", () => {
  const rect = { left: 0, top: 0, right: 100, bottom: 50 };

  it("is full inside the focus area and fades to nothing at `reach`", () => {
    expect(focusWeight({ x: 50, y: 25 }, rect, 40)).toBe(1);
    expect(focusWeight({ x: 120, y: 25 }, rect, 40)).toBeCloseTo(0.5);
    expect(focusWeight({ x: 50, y: 90 }, rect, 40)).toBe(0);
    expect(focusWeight({ x: 400, y: 400 }, rect, 40)).toBe(0);
  });
});

describe("matchNearest", () => {
  const points = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 5, y: 5 },
  ];

  it("pairs each target with its closest free point", () => {
    const targets = [
      { x: 0.9, y: 0 },
      { x: 0.1, y: 0 },
    ];
    expect(matchNearest(targets, points, [true, true, true])).toEqual([1, 0]);
  });

  it("never reuses a point and skips unusable ones", () => {
    const targets = [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ];
    expect(matchNearest(targets, points, [true, false, true])).toEqual([
      0, 2, -1,
    ]);
  });
});

describe("spacedPoints", () => {
  it("keeps points at least `gap` apart, in candidate order", () => {
    const line = Array.from({ length: 10 }, (_, x) => ({ x, y: 0 }));
    expect(spacedPoints(line, 3).map((p) => p.x)).toEqual([0, 3, 6, 9]);
  });
});

describe("hero icons", () => {
  it("has one icon per rotating hero phrase", () => {
    expect(HERO_ICONS).toHaveLength(TYPEWRITER_KEYS.length);
  });
});
