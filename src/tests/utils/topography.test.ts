import { describe, it, expect } from "vitest";
import { createNoise3D, mulberry32 } from "../../utils/noise";
import { contourSegments } from "../../utils/topography";

describe("mulberry32", () => {
  it("is deterministic per seed and stays in [0, 1)", () => {
    const a = mulberry32(42);
    const b = mulberry32(42);
    for (let i = 0; i < 100; i++) {
      const v = a();
      expect(v).toBe(b());
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });
});

describe("createNoise3D", () => {
  it("is deterministic, bounded and zero on lattice points", () => {
    const n1 = createNoise3D(3);
    const n2 = createNoise3D(3);
    expect(n1(1, 2, 3)).toBe(0);
    for (let i = 0; i < 200; i++) {
      const x = i * 0.137;
      const y = i * 0.071;
      const z = i * 0.029;
      expect(n1(x, y, z)).toBe(n2(x, y, z));
      expect(Math.abs(n1(x, y, z))).toBeLessThanOrEqual(1.1);
    }
  });

  it("is continuous", () => {
    const n = createNoise3D(5);
    expect(Math.abs(n(0.5, 0.5, 0.5) - n(0.5001, 0.5, 0.5))).toBeLessThan(0.01);
  });
});

describe("contourSegments", () => {
  // 5×5 grid with a single peak in the middle.
  const cols = 5;
  const rows = 5;
  const field = Array.from({ length: cols * rows }, (_, k) => {
    const i = k % cols;
    const j = Math.floor(k / cols);
    return 2 - Math.hypot(i - 2, j - 2);
  });

  it("draws a closed ring of 4-number segments around a peak", () => {
    const segments = contourSegments(field, cols, rows, 1);
    expect(segments.length).toBeGreaterThan(0);
    expect(segments.length % 4).toBe(0);
    for (let s = 0; s < segments.length; s += 2) {
      const r = Math.hypot(segments[s] - 2, segments[s + 1] - 2);
      expect(r).toBeGreaterThan(0.5);
      expect(r).toBeLessThan(1.5);
    }
  });

  it("returns nothing for levels outside the field range", () => {
    expect(contourSegments(field, cols, rows, 10)).toEqual([]);
    expect(contourSegments(field, cols, rows, -10)).toEqual([]);
  });
});
