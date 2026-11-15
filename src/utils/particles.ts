import { pageScopedController, prefersReducedMotion } from "./motion";

export interface IconSlot {
  /** Icon centre, in canvas CSS px. */
  x: number;
  y: number;
  /** Icon box size, in CSS px. */
  size: number;
}

export interface ParticleIconsOptions {
  /** 24×24 SVG stroke paths, one per hero phrase. */
  icons: readonly string[];
  /** Where the icon forms, or null when there is no room for it. */
  slot: () => IconSlot | null;
}

export interface ParticleIconsController {
  /** Condense the nearest particles into icon `index` for a few seconds. */
  setActive(index: number): void;
}

export interface Point {
  x: number;
  y: number;
}

/** Timeline of one particle's trip to an icon and back. */
export interface Trip {
  gatherStart: number;
  gatherMs: number;
  releaseStart: number;
  releaseMs: number;
}

interface Particle extends Trip {
  /** Drift origin and velocity, in CSS px and px/ms. */
  x0: number;
  y0: number;
  vx: number;
  vy: number;
  wobble: number;
  phase: number;
  alpha: number;
  size: number;
  /** Icon position, in canvas CSS px. */
  target: Point | null;
}

const GATHER_DELAY_MS = 120;
const GATHER_MS = 1100;
const HOLD_MS = 1800;
const RELEASE_MS = 1100;
const STAGGER_MS = 300;
/** Canvas area per particle, in CSS px². */
const AREA_PER_PARTICLE = 1500;
const MIN_PARTICLES = 360;
const MAX_PARTICLES = 900;
/** Particles fade out this close to the canvas edge, in CSS px. */
const EDGE_FADE = 80;
/** Icon dot radius in CSS px. */
const ICON_DOT = 1.5;
const TAU = Math.PI * 2;

const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;
const progress = (time: number, start: number, ms: number) =>
  ms > 0 ? Math.min(1, Math.max(0, (time - start) / ms)) : +(time >= start);
/** `value` wrapped into `[-margin, length + margin)`. */
const wrap = (value: number, length: number, margin: number) => {
  const span = length + 2 * margin;
  return ((((value + margin) % span) + span) % span) - margin;
};

/** How far a particle is from floating (0) to sitting on its icon spot (1). */
export function tripWeight(trip: Trip, time: number): number {
  const rise = easeInOut(progress(time, trip.gatherStart, trip.gatherMs));
  const fall = easeInOut(progress(time, trip.releaseStart, trip.releaseMs));
  return rise * (1 - fall);
}

/** Whether a particle has finished its trip and can join the next icon. */
export function isFree(trip: Trip, time: number): boolean {
  return time >= trip.releaseStart + trip.releaseMs;
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

/** Dots along the stroke of a 24×24 icon, in CSS px from the icon centre. */
function sampleIcon(path: Path2D, box: number): Point[] {
  box = Math.ceil(box);
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
  return spacedPoints(stroke, Math.max(4, box / 30)).map(({ x, y }) => ({
    x: x - box / 2,
    y: y - box / 2,
  }));
}

/**
 * Particles drifting across the whole canvas, coloured with its CSS `color`
 * and fading out near its edges. On each phrase the nearest particles
 * condense into that phrase's icon at `slot()` for a few seconds, then drift
 * off again. Pauses off-screen / in hidden tabs, holds still under reduced
 * motion, and tears down on the next page swap.
 */
export function mountParticleIcons(
  canvas: HTMLCanvasElement,
  { icons, slot }: ParticleIconsOptions,
): ParticleIconsController | null {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const reduced = prefersReducedMotion();
  const paths = icons.map((d) => new Path2D(d));
  const samples = new Map<string, Point[]>();
  const { signal } = pageScopedController();
  let particles: Particle[] = [];
  let width = 0;
  let height = 0;
  let frame = 0;
  let visible = true;
  let active = -1;
  /** Phrase waiting for the hero entrance to settle before its icon forms. */
  let pending: number | null = reduced ? null : 0;

  const spawn = (): Particle => {
    const angle = Math.random() * TAU;
    const speed = (0.3 + Math.random() * 0.7) * 0.008;
    return {
      x0: Math.random() * width,
      y0: Math.random() * height,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      wobble: 6 + Math.random() * 14,
      phase: Math.random() * TAU,
      alpha: 0.15 + Math.random() * 0.35,
      size: 0.7 + Math.random() * 0.9,
      target: null,
      gatherStart: 0,
      gatherMs: 0,
      releaseStart: -Infinity,
      releaseMs: 0,
    };
  };

  const resize = () => {
    const dpr = window.devicePixelRatio || 1;
    const oldWidth = width;
    const oldHeight = height;
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.round(
      Math.min(
        MAX_PARTICLES,
        Math.max(MIN_PARTICLES, (width * height) / AREA_PER_PARTICLE),
      ),
    );
    for (const p of particles) {
      p.x0 *= oldWidth ? width / oldWidth : 1;
      p.y0 *= oldHeight ? height / oldHeight : 1;
    }
    particles = particles.slice(0, count);
    while (particles.length < count) particles.push(spawn());
  };

  const float = (p: Particle, time: number): Point => ({
    x: wrap(
      p.x0 + time * p.vx + Math.sin(time / 2300 + p.phase) * p.wobble,
      width,
      EDGE_FADE,
    ),
    y: wrap(
      p.y0 + time * p.vy + Math.cos(time / 2900 + p.phase) * p.wobble,
      height,
      EDGE_FADE,
    ),
  });

  const draw = (time: number) => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = getComputedStyle(canvas).color;
    for (const p of particles) {
      const at = float(p, time);
      const w = p.target ? tripWeight(p, time) : 0;
      const x = at.x + ((p.target?.x ?? 0) - at.x) * w;
      const y = at.y + ((p.target?.y ?? 0) - at.y) * w;
      const fade = Math.min(
        1,
        Math.max(0, Math.min(x, y, width - x, height - y) / EDGE_FADE),
      );
      ctx.globalAlpha = p.alpha * fade * (1 - w) + 0.9 * w;
      ctx.beginPath();
      ctx.arc(x, y, p.size * (1 - w) + ICON_DOT * w, 0, TAU);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  };

  const activate = (index: number, now: number) => {
    active = index;
    for (const p of particles) {
      if (!p.target || isFree(p, now)) continue;
      const releaseStart = reduced ? -Infinity : now + Math.random() * 120;
      if (releaseStart < p.releaseStart) p.releaseStart = releaseStart;
    }

    const place = slot();
    if (!place) return;
    const key = `${index}:${Math.round(place.size)}`;
    let shape = samples.get(key);
    if (!shape) {
      shape = sampleIcon(paths[index], place.size);
      samples.set(key, shape);
    }
    const targets = shape.map((s) => ({ x: place.x + s.x, y: place.y + s.y }));
    const positions = particles.map((p) => float(p, now));
    const usable = particles.map((p) => !p.target || isFree(p, now));
    matchNearest(targets, positions, usable).forEach((i, t) => {
      if (i < 0) return;
      const p = particles[i];
      p.target = targets[t];
      if (reduced) {
        p.gatherStart = -Infinity;
        p.releaseStart = Infinity;
        return;
      }
      p.gatherStart = now + GATHER_DELAY_MS + Math.random() * STAGGER_MS;
      p.gatherMs = GATHER_MS;
      p.releaseStart = p.gatherStart + GATHER_MS + HOLD_MS;
      p.releaseMs = RELEASE_MS + Math.random() * STAGGER_MS;
    });
  };

  const controller: ParticleIconsController = {
    setActive(index) {
      const next = ((index % icons.length) + icons.length) % icons.length;
      if (pending !== null) {
        pending = next;
        return;
      }
      if (next === active) return;
      activate(next, reduced ? 0 : performance.now());
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

  // Let the hero entrance settle before measuring where the first icon goes.
  const firstIcon = window.setTimeout(() => {
    const index = pending ?? 0;
    pending = null;
    activate(index, performance.now());
  }, 900);

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
    clearTimeout(firstIcon);
  });
  return controller;
}
