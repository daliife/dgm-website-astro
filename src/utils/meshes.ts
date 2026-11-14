import { createIcosphere, type Mesh, type Vec3 } from "./geodesic";

/** Coordinates are canvas-space (+y down) and fit roughly inside the unit sphere. */

function polyline(mesh: Mesh, points: Vec3[], closed = false): void {
  const start = mesh.vertices.length;
  mesh.vertices.push(...points);
  const count = closed ? points.length : points.length - 1;
  for (let i = 0; i < count; i++) {
    mesh.edges.push([start + i, start + ((i + 1) % points.length)]);
  }
}

/** Two nested cubes with their corners joined (a tesseract projection). */
export function createTesseract(outer = 0.62, inner = 0.3): Mesh {
  const mesh: Mesh = { vertices: [], edges: [] };
  for (const half of [outer, inner]) {
    for (let i = 0; i < 8; i++) {
      mesh.vertices.push([
        i & 1 ? half : -half,
        i & 2 ? half : -half,
        i & 4 ? half : -half,
      ]);
    }
  }
  for (const offset of [0, 8]) {
    for (let i = 0; i < 8; i++) {
      for (const bit of [1, 2, 4]) {
        if (!(i & bit)) mesh.edges.push([offset + i, offset + (i | bit)]);
      }
    }
  }
  for (let i = 0; i < 8; i++) mesh.edges.push([i, i + 8]);
  return mesh;
}

/** React-style atom: three elliptical orbits 60° apart around a small nucleus. */
export function createAtom(segments = 72): Mesh {
  const mesh: Mesh = { vertices: [], edges: [] };
  for (const turn of [0, 1, 2]) {
    const angle = (turn * Math.PI) / 3;
    polyline(
      mesh,
      Array.from({ length: segments }, (_, i) => {
        const t = (i / segments) * Math.PI * 2;
        const x = Math.cos(t) * 0.95;
        const y = Math.sin(t) * 0.36;
        // Slight depth so the orbits read as 3D while spinning.
        const z = Math.sin(t) * 0.12 * (turn - 1);
        return [
          x * Math.cos(angle) - y * Math.sin(angle),
          x * Math.sin(angle) + y * Math.cos(angle),
          z,
        ] as Vec3;
      }),
      true,
    );
  }
  const nucleus = createIcosphere(0);
  const offset = mesh.vertices.length;
  mesh.vertices.push(
    ...nucleus.vertices.map(
      ([x, y, z]) => [x * 0.14, y * 0.14, z * 0.14] as Vec3,
    ),
  );
  mesh.edges.push(
    ...nucleus.edges.map(
      ([a, b]) => [a + offset, b + offset] as [number, number],
    ),
  );
  return mesh;
}

/** Layered waveforms receding in depth, like a sound visualisation. */
export function createSoundWave(lines = 7, segments = 56): Mesh {
  const mesh: Mesh = { vertices: [], edges: [] };
  for (let l = 0; l < lines; l++) {
    const z = -0.6 + (1.2 * l) / (lines - 1);
    polyline(
      mesh,
      Array.from({ length: segments + 1 }, (_, i) => {
        const x = -1 + (2 * i) / segments;
        const envelope = Math.cos((x * Math.PI) / 2) ** 2;
        const y =
          -Math.sin(x * Math.PI * 2 + l * 0.6) *
          envelope *
          (0.1 + 0.18 * Math.sin((l / (lines - 1)) * Math.PI));
        return [x, y, z];
      }),
    );
  }
  return mesh;
}

/** Low-poly ridge: a triangulated grid lifted into a few peaks. */
export function createMountains(cells = 9): Mesh {
  const mesh: Mesh = { vertices: [], edges: [] };
  const peaks = [
    { x: -0.2, z: -0.1, h: 0.85, r: 0.45 },
    { x: 0.45, z: 0.15, h: 0.55, r: 0.35 },
    { x: -0.6, z: 0.4, h: 0.4, r: 0.3 },
  ];
  const index = (i: number, j: number) => i * (cells + 1) + j;
  for (let i = 0; i <= cells; i++) {
    for (let j = 0; j <= cells; j++) {
      const x = -1 + (2 * j) / cells;
      const z = -1 + (2 * i) / cells;
      const height = Math.max(
        0,
        ...peaks.map(
          (p) =>
            p.h * Math.max(0, 1 - Math.hypot(x - p.x, z - p.z) / p.r / 1.6),
        ),
      );
      mesh.vertices.push([x * 0.85, 0.35 - height, z * 0.85]);
    }
  }
  for (let i = 0; i <= cells; i++) {
    for (let j = 0; j <= cells; j++) {
      if (j < cells) mesh.edges.push([index(i, j), index(i, j + 1)]);
      if (i < cells) mesh.edges.push([index(i, j), index(i + 1, j)]);
      if (i < cells && j < cells) {
        mesh.edges.push([index(i, j), index(i + 1, j + 1)]);
      }
    }
  }
  return mesh;
}
