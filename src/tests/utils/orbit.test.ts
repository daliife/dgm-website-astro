import { describe, it, expect } from "vitest";
import { HERO_ICONS } from "../../utils/icons";
import { nextOrbitYaw } from "../../utils/orbit";
import { TYPEWRITER_KEYS } from "../../utils/typewriter";

const TAU = Math.PI * 2;
const frontAngle = (yaw: number, index: number, count: number) =>
  ((((index * TAU) / count + yaw) % TAU) + TAU) % TAU;

describe("nextOrbitYaw", () => {
  it("brings the requested slot to the front", () => {
    let yaw = 0;
    for (const index of [1, 2, 3, 4, 0, 3]) {
      yaw = nextOrbitYaw(yaw, index, 5);
      const angle = frontAngle(yaw, index, 5);
      expect(Math.min(angle, TAU - angle)).toBeCloseTo(0, 10);
    }
  });

  it("always turns the same way, by less than a full turn", () => {
    let yaw = 0;
    for (const index of [1, 2, 3, 4, 0, 2]) {
      const next = nextOrbitYaw(yaw, index, 5);
      expect(next).toBeLessThanOrEqual(yaw);
      expect(yaw - next).toBeLessThan(TAU);
      yaw = next;
    }
  });
});

describe("HERO_ICONS", () => {
  it("has one icon per rotating hero phrase", () => {
    expect(HERO_ICONS).toHaveLength(TYPEWRITER_KEYS.length);
  });
});
