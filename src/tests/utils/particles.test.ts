import { describe, it, expect } from "vitest";
import {
  linkNeighbours,
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

describe("linkNeighbours", () => {
  it("joins only points within reach", () => {
    const points = [
      { x: 0, y: 0 },
      { x: 3, y: 0 },
      { x: 6, y: 0 },
      { x: 20, y: 0 },
    ];
    expect(linkNeighbours(points, 4)).toEqual([
      [0, 1],
      [1, 2],
    ]);
  });

  it("joins each point to at most its two nearest neighbours", () => {
    const hub = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: -2, y: 0 },
      { x: 0, y: 3 },
      { x: 0, y: 3.5 },
      { x: 0, y: 4 },
    ];
    const fromHub = linkNeighbours(hub, 10).filter(([a]) => a === 0);
    expect(fromHub).toEqual([
      [0, 1],
      [0, 2],
    ]);
  });
});

describe("hero icons", () => {
  it("has one icon per rotating hero phrase", () => {
    expect(HERO_ICONS).toHaveLength(TYPEWRITER_KEYS.length);
  });
});
