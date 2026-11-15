import type { Vec3 } from "./geodesic";
import { pageScopedController, prefersReducedMotion } from "./motion";

export interface MorphGlobeOptions {
  /** 24×24 SVG stroke paths, one per hero phrase. */
  icons: readonly string[];
  /** Fraction of the canvas the sphere radius fills. */
  radius?: number;
  /** Number of sphere dots. */
  dots?: number;
}

export interface MorphGlobeController {
  /** Release the current icon back to the sphere and draw icon `index`. */
  setActive(index: number): void;
}

export interface Point {
  x: number;
  y: number;
}

interface Dot {
  v: Vec3;
  /** Icon position, in sphere radii from the centre. */
  target: Point | null;
  w0: number;
  goal: number;
  start: number;
  duration: number;
}

const CAMERA = 3.2;
const TILT = -0.35;
const SPIN = 0.00012;
const GATHER_DELAY_MS = 350;
const GATHER_MS = 1100;
const RELEASE_MS = 900;
const STAGGER_MS = 300;
/** Icon box size, in sphere radii. */
const ICON_BOX = 1.35;
/** Icon dot radius in CSS px. */
const ICON_DOT = 1.6;
const TAU = Math.PI * 2;

function rotate([x, y, z]: Vec3, yaw: number, pitch: number): Vec3 {
  const cy = Math.cos(yaw);
  const sy = Math.sin(yaw);
  const x1 = x * cy + z * sy;
  const z1 = -x * sy + z * cy;
  const cp = Math.cos(pitch);
  const sp = Math.sin(pitch);
  return [x1, y * cp - z1 * sp, y * sp + z1 * cp];
}

const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;

/** Evenly spread unit vectors (Fibonacci lattice). */
export function fibonacciSphere(count: number): Vec3[] {
  const golden = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: count }, (_, i) => {
    const y = 1 - (2 * (i + 0.5)) / count;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    return [Math.cos(theta) * r, y, Math.sin(theta) * r];
  });
}

/**
 * Greedily pairs each target with the closest still-free usable point.
 * Returns, per target, the point index or -1 when none is left.
 */
export function matchNearest(
  targets: readonly Point[],
  points: readonly Point[],
  usable: readonly boolean[],
): number[] {
  const taken = new Set<number>();
  return targets.map((t) => {
    let best = -1;
    let bestDist = Infinity;
    points.forEach((p, i) => {
      if (!usable[i] || taken.has(i)) return;
      const dist = (p.x - t.x) ** 2 + (p.y - t.y) ** 2;
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    if (best >= 0) taken.add(best);
    return best;
  });
}

/**
 * Points at least `gap` apart picked from `candidates` in the given order, so
 * a thin stroke becomes a single row of evenly spaced dots.
 */
export function spacedPoints(
  candidates: readonly Point[],
  gap: number,
): Point[] {
  const picked: Point[] = [];
  const minDist = gap * gap;
  for (const c of candidates) {
    if (picked.every((p) => (p.x - c.x) ** 2 + (p.y - c.y) ** 2 >= minDist)) {
      picked.push(c);
    }
  }
  return picked;
}

/** Dots along the stroke of a 24×24 icon, in sphere radii from the centre. */
function sampleIcon(path: Path2D, radius: number): Point[] {
  const box = Math.ceil(radius * ICON_BOX);
  const off = document.createElement("canvas");
  off.width = off.height = box;
  const ctx = off.getContext("2d", { willReadFrequently: true });
  if (!ctx || box < 24) return [];
  ctx.scale(box / 24, box / 24);
  ctx.lineWidth = 1.2;
  ctx.lineCap = ctx.lineJoin = "round";
  ctx.stroke(path);
  const { data } = ctx.getImageData(0, 0, box, box);
  const stroke: Point[] = [];
  for (let y = 0; y < box; y++) {
    for (let x = 0; x < box; x++) {
      if (data[(y * box + x) * 4 + 3] > 160) stroke.push({ x, y });
    }
  }
  for (let i = stroke.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [stroke[i], stroke[j]] = [stroke[j], stroke[i]];
  }
  return spacedPoints(stroke, Math.max(4, box / 34)).map(({ x, y }) => ({
    x: (x - box / 2) / radius,
    y: (y - box / 2) / radius,
  }));
}

/**
 * A slowly spinning sphere of dots, coloured with the canvas' CSS `color`.
 * On each phrase the front dots gather into that phrase's icon, then return
 * to the sphere when the next one arrives. Pauses off-screen / in hidden tabs,
 * holds still under reduced motion, and tears down on the next page swap.
 */
export function mountMorphGlobe(
  canvas: HTMLCanvasElement,
  { icons, radius: radiusFraction = 0.36, dots = 800 }: MorphGlobeOptions,
): MorphGlobeController | null {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const reduced = prefersReducedMotion();
  const paths = icons.map((d) => new Path2D(d));
  const samples = new Map<number, Point[]>();
  const sphere: Dot[] = fibonacciSphere(dots).map((v) => ({
    v,
    target: null,
    w0: 0,
    goal: 0,
    start: 0,
    duration: 0,
  }));
  const { signal } = pageScopedController();
  let size = 0;
  let frame = 0;
  let visible = true;
  let active = -1;

  const resize = () => {
    const dpr = window.devicePixelRatio || 1;
    size = canvas.getBoundingClientRect().width;
    canvas.width = canvas.height = Math.round(size * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    samples.clear();
  };

  const weight = (dot: Dot, time: number) => {
    const t = (time - dot.start) / dot.duration;
    if (!(t < 1)) return dot.goal;
    return dot.w0 + (dot.goal - dot.w0) * easeInOut(Math.max(0, t));
  };

  const yawAt = (time: number) => (reduced ? 0.6 : time * SPIN);

  const project = (v: Vec3, time: number) => {
    const [x, y, z] = rotate(v, yawAt(time), TILT);
    const scale = CAMERA / (CAMERA - z);
    return { x: x * scale, y: y * scale, z, scale };
  };

  const draw = (time: number) => {
    const radius = size * radiusFraction;
    const centre = size / 2;
    ctx.clearRect(0, 0, size, size);
    ctx.fillStyle = getComputedStyle(canvas).color;

    const icon: { x: number; y: number; w: number }[] = [];
    for (const dot of sphere) {
      const p = project(dot.v, time);
      const w = dot.target ? weight(dot, time) : 0;
      const depth = (p.z + 1) / 2;
      const x = p.x + ((dot.target?.x ?? 0) - p.x) * w;
      const y = p.y + ((dot.target?.y ?? 0) - p.y) * w;
      if (w > 0.5) {
        icon.push({ x, y, w });
        continue;
      }
      ctx.globalAlpha = (0.05 + 0.22 * depth ** 2) * (1 - w) + 0.9 * w;
      ctx.beginPath();
      ctx.arc(
        centre + x * radius,
        centre + y * radius,
        (0.6 + 0.7 * depth) * p.scale * (1 - w) + ICON_DOT * w,
        0,
        TAU,
      );
      ctx.fill();
    }
    for (const { x, y, w } of icon) {
      ctx.globalAlpha = 0.9 * w;
      ctx.beginPath();
      ctx.arc(centre + x * radius, centre + y * radius, ICON_DOT, 0, TAU);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  };

  const activate = (index: number, now: number) => {
    active = index;
    for (const dot of sphere) {
      if (dot.goal !== 1) continue;
      dot.w0 = weight(dot, now);
      dot.goal = 0;
      dot.start = reduced ? 0 : now + Math.random() * STAGGER_MS;
      dot.duration = reduced ? 0 : RELEASE_MS;
    }

    const radius = size * radiusFraction;
    let targets = samples.get(index);
    if (!targets) {
      targets = sampleIcon(paths[index], radius);
      if (targets.length) samples.set(index, targets);
    }
    const projected = sphere.map((dot) => project(dot.v, now));
    const usable = sphere.map(
      (dot, i) =>
        projected[i].z > 0.1 && (!dot.target || weight(dot, now) === 0),
    );
    matchNearest(targets, projected, usable).forEach((i, t) => {
      if (i < 0) return;
      const dot = sphere[i];
      dot.target = targets[t];
      dot.w0 = 0;
      dot.goal = 1;
      dot.start = reduced
        ? 0
        : now + GATHER_DELAY_MS + Math.random() * STAGGER_MS;
      dot.duration = reduced ? 0 : GATHER_MS;
    });
  };

  const controller: MorphGlobeController = {
    setActive(index) {
      const next = ((index % icons.length) + icons.length) % icons.length;
      if (next === active) return;
      activate(next, performance.now());
      if (reduced) draw(0);
    },
  };

  resize();
  if (reduced) {
    activate(0, 0);
    draw(0);
    window.addEventListener(
      "resize",
      () => {
        resize();
        const current = active;
        active = -1;
        activate(current, 0);
        draw(0);
      },
      { signal },
    );
    // Repaint on theme switches once the colour transition has settled.
    const themeObserver = new MutationObserver(() =>
      window.setTimeout(() => draw(0), 500),
    );
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    signal.addEventListener("abort", () => themeObserver.disconnect());
    return controller;
  }

  activate(0, performance.now() + 600);

  const loop = (time: number) => {
    draw(time);
    frame = visible ? requestAnimationFrame(loop) : 0;
  };
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
  window.addEventListener("resize", resize, { signal });
  signal.addEventListener("abort", () => {
    observer.disconnect();
    cancelAnimationFrame(frame);
  });
  return controller;
}
