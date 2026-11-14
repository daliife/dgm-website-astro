import { describe, it, expect } from "vitest";
import type { Mesh } from "../../utils/geodesic";
import {
  createAtom,
  createMountains,
  createSoundWave,
  createTesseract,
} from "../../utils/meshes";
import { TYPEWRITER_KEYS } from "../../utils/typewriter";

function expectValid({ vertices, edges }: Mesh) {
  expect(vertices.length).toBeGreaterThan(0);
  for (const [a, b] of edges) {
    expect(vertices[a]).toBeDefined();
    expect(vertices[b]).toBeDefined();
  }
  for (const v of vertices) {
    for (const c of v) expect(Math.abs(c)).toBeLessThanOrEqual(1);
  }
}

describe("hero meshes", () => {
  it("tesseract has 16 vertices and 32 edges", () => {
    const mesh = createTesseract();
    expect(mesh.vertices).toHaveLength(16);
    expect(mesh.edges).toHaveLength(32);
    expectValid(mesh);
  });

  it.each([
    ["atom", createAtom()],
    ["sound wave", createSoundWave()],
    ["mountains", createMountains()],
  ])("%s has valid edges and fits the unit cube", (_, mesh) => {
    expectValid(mesh);
  });

  it("there is one hero shape per typewriter phrase", () => {
    // Keep HeroWireframe's SHAPES in sync with the typewriter phrases.
    expect(TYPEWRITER_KEYS).toHaveLength(5);
  });
});
