/**
 * Hand-placed constellations on a 24×24 grid.
 *
 * Every hero constellation has exactly `STARS` stars, so a phrase change moves
 * each star onto a spot in the next shape and never recruits or releases one.
 */
export interface Constellation {
  stars: readonly (readonly [number, number])[];
  /** Star index pairs joined by a line. */
  lines: readonly (readonly [number, number])[];
}

/** Shared star count. Every entry of `HERO_CONSTELLATIONS` must match it. */
export const STARS = 12;

/** A closed chain of lines through stars `from`…`from + count - 1`. */
function loop(from: number, count: number): [number, number][] {
  return Array.from({ length: count }, (_, i) => [
    from + i,
    from + ((i + 1) % count),
  ]);
}

/** Frontend developer: </> */
const code: Constellation = {
  stars: [
    [6.5, 4],
    [2.5, 9],
    [2.5, 15],
    [6.5, 20],
    [13.2, 4],
    [12.2, 9],
    [11.2, 15],
    [10.2, 20],
    [17.5, 4],
    [21.5, 9],
    [21.5, 15],
    [17.5, 20],
  ],
  lines: [
    [0, 1],
    [1, 2],
    [2, 3],
    [4, 5],
    [5, 6],
    [6, 7],
    [8, 9],
    [9, 10],
    [10, 11],
  ],
};

/** Clarinettist: an eighth note. */
const note: Constellation = {
  stars: [
    [11, 16],
    [9, 14.8],
    [6.2, 15.6],
    [4.5, 18.2],
    [6.2, 20.8],
    [9.2, 20.2],
    [11, 11.5],
    [11, 7],
    [11, 2.8],
    [14, 4.6],
    [16.5, 8],
    [15.2, 11.8],
  ],
  lines: [...loop(0, 6), [0, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11]],
};

/** Nature lover: a tree. */
const tree: Constellation = {
  stars: [
    [12, 2],
    [9, 6.5],
    [15, 6.5],
    [6, 10.5],
    [18, 10.5],
    [3.5, 14.5],
    [20.5, 14.5],
    [12, 14.5],
    [12, 17.5],
    [12, 21],
    [8, 22],
    [16, 22],
  ],
  lines: [
    [0, 1],
    [1, 3],
    [3, 5],
    [5, 7],
    [7, 6],
    [6, 4],
    [4, 2],
    [2, 0],
    [7, 8],
    [8, 9],
    [9, 10],
    [9, 11],
  ],
};

/** Home hero constellations, one per rotating hero phrase in `TYPEWRITER_KEYS` order. */
export const HERO_CONSTELLATIONS: readonly Constellation[] = [code, note, tree];
