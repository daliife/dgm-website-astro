import { describe, it, expect } from "vitest";
import { createPaperPlane } from "../../utils/meshes";

describe("createPaperPlane", () => {
  it("has valid edges and fits the unit cube", () => {
    const { vertices, edges } = createPaperPlane();
    for (const [a, b] of edges) {
      expect(vertices[a]).toBeDefined();
      expect(vertices[b]).toBeDefined();
    }
    for (const v of vertices) {
      for (const c of v) expect(Math.abs(c)).toBeLessThanOrEqual(1);
    }
  });

  it("points its nose along +x", () => {
    const xs = createPaperPlane().vertices.map(([x]) => x);
    expect(xs[0]).toBe(Math.max(...xs));
  });
});
