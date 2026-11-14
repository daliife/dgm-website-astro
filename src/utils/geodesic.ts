export type Vec3 = [number, number, number];

export interface Mesh {
  vertices: Vec3[];
  edges: [number, number][];
}

/** Unit-sphere point; +y is down (canvas space), +z faces the viewer at lon 0. */
export function latLonToVec3(latitude: number, longitude: number): Vec3 {
  const lat = (latitude * Math.PI) / 180;
  const lon = (longitude * Math.PI) / 180;
  return [
    Math.cos(lat) * Math.sin(lon),
    -Math.sin(lat),
    Math.cos(lat) * Math.cos(lon),
  ];
}

/** Wireframe globe: parallels every `step`° and meridians every `step`°. */
export function createGlobe(step = 30, segments = 48): Mesh {
  const vertices: Vec3[] = [];
  const edges: [number, number][] = [];

  const ring = (points: Vec3[], closed: boolean) => {
    const start = vertices.length;
    vertices.push(...points);
    const count = closed ? points.length : points.length - 1;
    for (let i = 0; i < count; i++) {
      edges.push([start + i, start + ((i + 1) % points.length)]);
    }
  };

  for (let lat = -90 + step; lat < 90; lat += step) {
    ring(
      Array.from({ length: segments }, (_, i) =>
        latLonToVec3(lat, (i / segments) * 360),
      ),
      true,
    );
  }
  for (let lon = 0; lon < 360; lon += step) {
    ring(
      Array.from({ length: segments / 2 + 1 }, (_, i) =>
        latLonToVec3(-90 + (i / (segments / 2)) * 180, lon),
      ),
      false,
    );
  }

  return { vertices, edges };
}

function normalize([x, y, z]: Vec3): Vec3 {
  const len = Math.hypot(x, y, z);
  return [x / len, y / len, z / len];
}

/** Unit icosphere: an icosahedron split `subdivisions` times (0 → 12 verts, 1 → 42). */
export function createIcosphere(subdivisions = 1): Mesh {
  const t = (1 + Math.sqrt(5)) / 2;
  const vertices: Vec3[] = (
    [
      [-1, t, 0],
      [1, t, 0],
      [-1, -t, 0],
      [1, -t, 0],
      [0, -1, t],
      [0, 1, t],
      [0, -1, -t],
      [0, 1, -t],
      [t, 0, -1],
      [t, 0, 1],
      [-t, 0, -1],
      [-t, 0, 1],
    ] as Vec3[]
  ).map(normalize);

  let faces: [number, number, number][] = [
    [0, 11, 5],
    [0, 5, 1],
    [0, 1, 7],
    [0, 7, 10],
    [0, 10, 11],
    [1, 5, 9],
    [5, 11, 4],
    [11, 10, 2],
    [10, 7, 6],
    [7, 1, 8],
    [3, 9, 4],
    [3, 4, 2],
    [3, 2, 6],
    [3, 6, 8],
    [3, 8, 9],
    [4, 9, 5],
    [2, 4, 11],
    [6, 2, 10],
    [8, 6, 7],
    [9, 8, 1],
  ];

  for (let s = 0; s < subdivisions; s++) {
    const midpoints = new Map<string, number>();
    const midpoint = (a: number, b: number) => {
      const key = a < b ? `${a}-${b}` : `${b}-${a}`;
      const cached = midpoints.get(key);
      if (cached !== undefined) return cached;
      const [ax, ay, az] = vertices[a];
      const [bx, by, bz] = vertices[b];
      vertices.push(normalize([(ax + bx) / 2, (ay + by) / 2, (az + bz) / 2]));
      midpoints.set(key, vertices.length - 1);
      return vertices.length - 1;
    };
    faces = faces.flatMap(([a, b, c]) => {
      const ab = midpoint(a, b);
      const bc = midpoint(b, c);
      const ca = midpoint(c, a);
      return [
        [a, ab, ca],
        [b, bc, ab],
        [c, ca, bc],
        [ab, bc, ca],
      ] as [number, number, number][];
    });
  }

  const seen = new Set<string>();
  const edges: [number, number][] = [];
  for (const [a, b, c] of faces) {
    for (const [p, q] of [
      [a, b],
      [b, c],
      [c, a],
    ]) {
      const key = p < q ? `${p}-${q}` : `${q}-${p}`;
      if (!seen.has(key)) {
        seen.add(key);
        edges.push([p, q]);
      }
    }
  }

  return { vertices, edges };
}
