import { describe, it, expect } from "vitest";
import { createIcosphere } from "../../utils/geodesic";
import { faceAngles, fibonacciSphere } from "../../utils/globe";
import { HERO_EXTRA_ICONS, HERO_ICONS } from "../../utils/icons";
import { TYPEWRITER_KEYS } from "../../utils/typewriter";

/** Same rotation as the globe renderer. */
function rotate(
  [x, y, z]: [number, number, number],
  yaw: number,
  pitch: number,
) {
  const x1 = x * Math.cos(yaw) + z * Math.sin(yaw);
  const z1 = -x * Math.sin(yaw) + z * Math.cos(yaw);
  return [
    x1,
    y * Math.cos(pitch) - z1 * Math.sin(pitch),
    y * Math.sin(pitch) + z1 * Math.cos(pitch),
  ];
}

describe("faceAngles", () => {
  it("turns every icon slot to the front centre", () => {
    for (const v of createIcosphere(0).vertices) {
      const { yaw, pitch } = faceAngles(v);
      const [x, y, z] = rotate(v, yaw, pitch);
      expect(x).toBeCloseTo(0, 10);
      expect(y).toBeCloseTo(0, 10);
      expect(z).toBeCloseTo(1, 10);
    }
  });
});

describe("fibonacciSphere", () => {
  it("returns unit vectors spread over both hemispheres", () => {
    const points = fibonacciSphere(200);
    expect(points).toHaveLength(200);
    for (const p of points) expect(Math.hypot(...p)).toBeCloseTo(1, 10);
    expect(points.filter(([, y]) => y > 0)).toHaveLength(100);
  });
});

describe("hero icons", () => {
  it("has one icon per rotating hero phrase", () => {
    expect(HERO_ICONS).toHaveLength(TYPEWRITER_KEYS.length);
  });

  it("fits the 12 icosahedron slots", () => {
    expect(HERO_ICONS.length + HERO_EXTRA_ICONS.length).toBeLessThanOrEqual(12);
  });
});
