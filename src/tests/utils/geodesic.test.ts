import { describe, it, expect } from "vitest";
import { createIcosphere } from "../../utils/geodesic";

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
