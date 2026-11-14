import type { Mesh, Vec3 } from "./wireframe";

/** Folded paper plane, nose along +x: two wings with a crease each and a keel. */
export function createPaperPlane(): Mesh {
  const vertices: Vec3[] = [
    [0.95, 0, 0], // nose
    [-0.85, 0, 0], // tail, on the central fold
    [-0.8, 0.3, 0], // keel
    [-0.95, -0.1, -0.62], // left wing tip
    [-0.95, -0.1, 0.62], // right wing tip
    [-0.9, -0.04, -0.28], // left crease
    [-0.9, -0.04, 0.28], // right crease
  ];
  const edges: [number, number][] = [
    [0, 1],
    [0, 2],
    [1, 2],
    [0, 3],
    [3, 5],
    [5, 1],
    [0, 5],
    [0, 4],
    [4, 6],
    [6, 1],
    [0, 6],
  ];
  return { vertices, edges };
}
