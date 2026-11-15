import { describe, it, expect } from "vitest";
import { fibonacciSphere, matchNearest, spacedPoints } from "../../utils/globe";
import { HERO_ICONS } from "../../utils/icons";
import { TYPEWRITER_KEYS } from "../../utils/typewriter";

describe("fibonacciSphere", () => {
  it("returns unit vectors spread over both hemispheres", () => {
    const points = fibonacciSphere(200);
    expect(points).toHaveLength(200);
    for (const p of points) expect(Math.hypot(...p)).toBeCloseTo(1, 10);
    expect(points.filter(([, y]) => y > 0)).toHaveLength(100);
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
