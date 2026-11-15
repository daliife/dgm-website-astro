import { describe, it, expect } from "vitest";
import { HERO_CONSTELLATIONS, STARS } from "../../utils/constellations";
import { matchNearest, placeStars, planMorph } from "../../utils/particles";
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

describe("placeStars", () => {
  it("scales the 24×24 grid into the slot around its centre", () => {
    const icon = {
      stars: [
        [12, 12],
        [0, 24],
      ] as const,
      lines: [],
    };
    expect(placeStars(icon, { x: 100, y: 50, size: 48 })).toEqual([
      { x: 100, y: 50 },
      { x: 76, y: 74 },
    ]);
  });
});

describe("hero constellations", () => {
  it("has one constellation per rotating hero phrase", () => {
    expect(HERO_CONSTELLATIONS).toHaveLength(TYPEWRITER_KEYS.length);
  });

  it("gives every constellation the same star count, so a morph never recruits", () => {
    expect(HERO_CONSTELLATIONS.map((c) => c.stars.length)).toEqual(
      HERO_CONSTELLATIONS.map(() => STARS),
    );
  });

  it.each(HERO_CONSTELLATIONS.map((c, i) => [i, c] as const))(
    "constellation %i stays on the grid and joins real stars",
    (_, { stars, lines }) => {
      for (const [x, y] of stars) {
        expect(x).toBeGreaterThanOrEqual(0);
        expect(x).toBeLessThanOrEqual(24);
        expect(y).toBeGreaterThanOrEqual(0);
        expect(y).toBeLessThanOrEqual(24);
      }
      const keys = new Set<string>();
      for (const [a, b] of lines) {
        expect(a).not.toBe(b);
        expect(stars[a]).toBeDefined();
        expect(stars[b]).toBeDefined();
        keys.add([Math.min(a, b), Math.max(a, b)].join());
      }
      expect(keys.size).toBe(lines.length);
    },
  );
});
