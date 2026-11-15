import { describe, it, expect } from "vitest";
import {
  focusWeight,
  isFree,
  matchNearest,
  spacedPoints,
  tripWeight,
} from "../../utils/particles";
import { HERO_ICONS } from "../../utils/icons";
import { TYPEWRITER_KEYS } from "../../utils/typewriter";

describe("tripWeight", () => {
  const trip = {
    gatherStart: 100,
    gatherMs: 100,
    releaseStart: 500,
    releaseMs: 100,
  };

  it("floats, gathers, holds the icon, then floats again", () => {
    expect(tripWeight(trip, 0)).toBe(0);
    expect(tripWeight(trip, 150)).toBeCloseTo(0.5);
    expect(tripWeight(trip, 300)).toBe(1);
    expect(tripWeight(trip, 550)).toBeCloseTo(0.5);
    expect(tripWeight(trip, 700)).toBe(0);
  });

  it("frees the particle only once the release has finished", () => {
    expect(isFree(trip, 550)).toBe(false);
    expect(isFree(trip, 600)).toBe(true);
  });

  it("snaps instantly for zero-length phases", () => {
    const instant = {
      gatherStart: -Infinity,
      gatherMs: 0,
      releaseStart: Infinity,
      releaseMs: 0,
    };
    expect(tripWeight(instant, 0)).toBe(1);
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
