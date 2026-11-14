import { describe, it, expect } from "vitest";
import {
  createGlobe,
  createIcosphere,
  latLonToVec3,
} from "../../utils/geodesic";

describe("createIcosphere", () => {
  it("builds a plain icosahedron with no subdivision", () => {
    const { vertices, edges } = createIcosphere(0);
    expect(vertices).toHaveLength(12);
    expect(edges).toHaveLength(30);
  });

  it("subdivides once into a 42-vertex geodesic sphere", () => {
    const { vertices, edges } = createIcosphere(1);
    expect(vertices).toHaveLength(42);
    expect(edges).toHaveLength(120);
  });

  it("keeps every vertex on the unit sphere", () => {
    for (const [x, y, z] of createIcosphere(1).vertices) {
      expect(Math.hypot(x, y, z)).toBeCloseTo(1, 10);
    }
  });
});

describe("latLonToVec3", () => {
  it("maps lat/lon 0 to the front and the north pole to -y", () => {
    const [x, y, z] = latLonToVec3(0, 0);
    expect([x, y, z].map((n) => +n.toFixed(6))).toEqual([0, 0, 1]);
    expect(latLonToVec3(90, 0)[1]).toBeCloseTo(-1, 10);
  });
});

describe("createGlobe", () => {
  it("builds 5 parallels and 12 meridians at 30° spacing", () => {
    const { vertices, edges } = createGlobe(30, 48);
    // 5 closed rings × 48 + 12 open arcs × 25
    expect(vertices).toHaveLength(5 * 48 + 12 * 25);
    expect(edges).toHaveLength(5 * 48 + 12 * 24);
  });
});
