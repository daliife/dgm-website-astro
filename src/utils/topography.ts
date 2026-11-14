import { pageScopedController, prefersReducedMotion } from "./motion";
import { createNoise3D } from "./noise";

/**
 * Marching-squares edge pairs per cell case. Edges: 0 top, 1 right,
 * 2 bottom, 3 left. Corner bits: top-left 8, top-right 4, bottom-right 2,
 * bottom-left 1.
 */
const CASES: number[][] = [
  [],
  [3, 2],
  [2, 1],
  [3, 1],
  [0, 1],
  [3, 0, 2, 1],
  [0, 2],
  [3, 0],
  [3, 0],
  [0, 2],
  [3, 2, 0, 1],
  [0, 1],
  [3, 1],
  [2, 1],
  [3, 2],
  [],
];

/**
 * Iso-line segments of a `cols × rows` scalar grid at `level`, as a flat
 * `[x1, y1, x2, y2, …]` list in grid units.
 */
export function contourSegments(
  field: ArrayLike<number>,
  cols: number,
  rows: number,
  level: number,
): number[] {
  const out: number[] = [];
  const point = (
    edge: number,
    i: number,
    j: number,
    tl: number,
    tr: number,
    br: number,
    bl: number,
  ) => {
    switch (edge) {
      case 0:
        return [i + (level - tl) / (tr - tl), j];
      case 1:
        return [i + 1, j + (level - tr) / (br - tr)];
      case 2:
        return [i + (level - bl) / (br - bl), j + 1];
      default:
        return [i, j + (level - tl) / (bl - tl)];
    }
  };

  for (let j = 0; j < rows - 1; j++) {
    for (let i = 0; i < cols - 1; i++) {
      const tl = field[j * cols + i];
      const tr = field[j * cols + i + 1];
      const br = field[(j + 1) * cols + i + 1];
      const bl = field[(j + 1) * cols + i];
      const code =
        (tl > level ? 8 : 0) |
        (tr > level ? 4 : 0) |
        (br > level ? 2 : 0) |
        (bl > level ? 1 : 0);
      const edges = CASES[code];
      for (let k = 0; k < edges.length; k += 2) {
        out.push(
          ...point(edges[k], i, j, tl, tr, br, bl),
          ...point(edges[k + 1], i, j, tl, tr, br, bl),
        );
      }
    }
  }
  return out;
}

const CELL = 14;
const FEATURE = 320;
const DRIFT = 0.000035;
const LEVELS = 14;
const FRAME_MS = 40;
const STILL_TIME = 40_000;

/**
 * Slowly morphing contour map into `canvas` (sized by CSS), coloured with the
 * canvas' CSS `color`. Every fifth line is an emphasised "index" contour.
 * Pauses off-screen / in hidden tabs, draws a still frame under reduced
 * motion, and tears down on the next page swap.
 */
export function mountTopography(canvas: HTMLCanvasElement): void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const noise = createNoise3D(7);
  const { signal } = pageScopedController();
  let width = 0;
  let height = 0;
  let cols = 0;
  let rows = 0;
  let field = new Float32Array(0);
  let frame = 0;
  let last = -Infinity;
  let visible = true;

  const resize = () => {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols = Math.ceil(width / CELL) + 1;
    rows = Math.ceil(height / CELL) + 1;
    field = new Float32Array(cols * rows);
  };

  const draw = (time: number) => {
    const z = time * DRIFT;
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const x = (i * CELL) / FEATURE;
        const y = (j * CELL) / FEATURE;
        field[j * cols + i] =
          noise(x, y, z) + 0.45 * noise(x * 2.1 + 5.3, y * 2.1 + 1.7, z * 1.4);
      }
    }

    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = getComputedStyle(canvas).color;
    for (let l = 0; l < LEVELS; l++) {
      const level = -0.78 + (1.56 * l) / (LEVELS - 1);
      const index = l % 5 === 2;
      ctx.globalAlpha = index ? 0.32 : 0.16;
      ctx.lineWidth = index ? 1.1 : 0.8;
      const segments = contourSegments(field, cols, rows, level);
      ctx.beginPath();
      for (let s = 0; s < segments.length; s += 4) {
        ctx.moveTo(segments[s] * CELL, segments[s + 1] * CELL);
        ctx.lineTo(segments[s + 2] * CELL, segments[s + 3] * CELL);
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  };

  const loop = (time: number) => {
    if (time - last >= FRAME_MS) {
      last = time;
      draw(time);
    }
    frame = visible ? requestAnimationFrame(loop) : 0;
  };

  resize();
  // Repaint on theme switches while the loop is idle, once the colour
  // transition has settled.
  const repaint = () => {
    if (!frame) draw(prefersReducedMotion() ? STILL_TIME : last);
  };
  const themeObserver = new MutationObserver(() => {
    repaint();
    window.setTimeout(repaint, 500);
  });
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  signal.addEventListener("abort", () => themeObserver.disconnect());

  if (prefersReducedMotion()) {
    draw(STILL_TIME);
    window.addEventListener("resize", () => (resize(), draw(STILL_TIME)), {
      signal,
    });
    return;
  }

  const wake = () => {
    if (visible && !frame) frame = requestAnimationFrame(loop);
  };
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting && !document.hidden;
    wake();
  });
  observer.observe(canvas);
  document.addEventListener(
    "visibilitychange",
    () => {
      visible = !document.hidden;
      wake();
    },
    { signal },
  );
  window.addEventListener("resize", () => (resize(), draw(last)), { signal });
  signal.addEventListener("abort", () => {
    observer.disconnect();
    cancelAnimationFrame(frame);
  });
}
