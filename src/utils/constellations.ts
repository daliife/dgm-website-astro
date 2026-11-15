/** A hand-placed constellation on a 24×24 grid: its stars and the lines between them. */
export interface Constellation {
  stars: readonly (readonly [number, number])[];
  /** Star index pairs joined by a line. */
  lines: readonly (readonly [number, number])[];
}

const ORBIT_STARS = 8;

/** A closed chain of lines through stars `from`…`from + count - 1`. */
function loop(from: number, count: number): [number, number][] {
  return Array.from({ length: count }, (_, i) => [
    from + i,
    from + ((i + 1) % count),
  ]);
}

/** Stars around an atom orbit (10×3.6 ellipse) turned by `degrees`. */
function orbit(degrees: number): [number, number][] {
  const turn = (degrees * Math.PI) / 180;
  return Array.from({ length: ORBIT_STARS }, (_, i) => {
    const t = (i * 2 * Math.PI) / ORBIT_STARS;
    const x = 10 * Math.cos(t);
    const y = 3.6 * Math.sin(t);
    return [
      12 + x * Math.cos(turn) - y * Math.sin(turn),
      12 + x * Math.sin(turn) + y * Math.cos(turn),
    ];
  });
}

/** Frontend developer: </> */
const code: Constellation = {
  stars: [
    [8, 6],
    [3, 12],
    [8, 18],
    [14.5, 4],
    [9.5, 20],
    [16, 6],
    [21, 12],
    [16, 18],
  ],
  lines: [
    [0, 1],
    [1, 2],
    [3, 4],
    [5, 6],
    [6, 7],
  ],
};

/** Software engineer: { } */
const braces: Constellation = {
  stars: [
    [9.5, 3],
    [7, 5.5],
    [7, 10],
    [4, 12],
    [7, 14],
    [7, 18.5],
    [9.5, 21],
    [14.5, 3],
    [17, 5.5],
    [17, 10],
    [20, 12],
    [17, 14],
    [17, 18.5],
    [14.5, 21],
  ],
  lines: [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 6],
    [7, 8],
    [8, 9],
    [9, 10],
    [10, 11],
    [11, 12],
    [12, 13],
  ],
};

/** React specialist: three orbits around a nucleus. */
const atom: Constellation = {
  stars: [...orbit(0), ...orbit(60), ...orbit(120), [12, 12]],
  lines: [0, 1, 2].flatMap((i) => loop(i * ORBIT_STARS, ORBIT_STARS)),
};

/** Clarinettist: an eighth note. */
const note: Constellation = {
  stars: [
    [10, 17.5],
    [7.5, 20.5],
    [4.5, 19.5],
    [7, 16],
    [10, 10],
    [10, 3],
    [13.5, 5.5],
    [15.5, 9],
    [14.5, 12.5],
  ],
  lines: [...loop(0, 4), [0, 4], [4, 5], [5, 6], [6, 7], [7, 8]],
};

/** Mountain enthusiast: two peaks with a snow line on the taller one. */
const mountain: Constellation = {
  stars: [
    [2, 19],
    [9, 6],
    [12.5, 11.5],
    [15.5, 8.5],
    [22, 19],
    [12, 19],
    [6.85, 10],
    [9, 11.6],
    [11, 9.15],
  ],
  lines: [
    [0, 6],
    [6, 1],
    [1, 8],
    [8, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 0],
    [6, 7],
    [7, 8],
  ],
};

/** Home hero constellations, one per rotating hero phrase in `TYPEWRITER_KEYS` order. */
export const HERO_CONSTELLATIONS: readonly Constellation[] = [
  code,
  braces,
  atom,
  note,
  mountain,
];
