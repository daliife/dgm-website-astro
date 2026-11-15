import { pageScopedController, prefersReducedMotion } from "./motion";

export interface ParticleIconsOptions {
  /** 24×24 SVG stroke paths, one per hero phrase. */
  icons: readonly string[];
  /** Number of particles; must cover the densest icon. */
  count?: number;
}

export interface ParticleIconsController {
  /** Condense the floating particles into icon `index` for a few seconds. */
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
  /** Floating orbit, in cloud radii from the centre. */
  radius: number;
  angle: number;
  spin: number;
  wobble: number;
  phase: number;
  alpha: number;
  size: number;
  /** Icon position, in cloud radii from the centre. */
  target: Point | null;
}

const GATHER_DELAY_MS = 120;
const GATHER_MS = 950;
const HOLD_MS = 1900;
const RELEASE_MS = 1000;
const STAGGER_MS = 280;
/** Icon box size, in cloud radii. */
const ICON_BOX = 1.1;
/** Icon dot radius in CSS px. */
const ICON_DOT = 1.5;
const TAU = Math.PI * 2;

const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;
const progress = (time: number, start: number, ms: number) =>
  ms > 0 ? Math.min(1, Math.max(0, (time - start) / ms)) : +(time >= start);

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

/** Dots along the stroke of a 24×24 icon, in cloud radii from the centre. */
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
  return spacedPoints(stroke, Math.max(4, box / 30)).map(({ x, y }) => ({
    x: (x - box / 2) / radius,
    y: (y - box / 2) / radius,
  }));
}

/**
 * A loose cloud of particles drifting around the canvas centre, coloured with
 * the canvas' CSS `color` and fading out towards its edge. On each phrase the
 * nearest particles condense into that phrase's icon for a few seconds, then
 * drift off again. Pauses off-screen / in hidden tabs, holds still under
 * reduced motion, and tears down on the next page swap.
 */
export function mountParticleIcons(
  canvas: HTMLCanvasElement,
  { icons, count = 380 }: ParticleIconsOptions,
): ParticleIconsController | null {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const reduced = prefersReducedMotion();
  const paths = icons.map((d) => new Path2D(d));
  const samples = new Map<number, Point[]>();
  const particles: Particle[] = Array.from({ length: count }, () => ({
    radius: 0.95 * Math.sqrt(Math.random()),
    angle: Math.random() * TAU,
    spin: (0.4 + Math.random()) * 0.00006,
    wobble: 0.03 + Math.random() * 0.05,
    phase: Math.random() * TAU,
    alpha: 0.16 + Math.random() * 0.36,
    size: 0.6 + Math.random() * 0.9,
    target: null,
    gatherStart: 0,
    gatherMs: 1,
    releaseStart: -Infinity,
    releaseMs: 0,
  }));
  const { signal } = pageScopedController();
  let size = 0;
  let frame = 0;
  let visible = true;
  let active = -1;

  const resize = () => {
    const dpr = window.devicePixelRatio || 1;
    size = canvas.clientWidth;
    canvas.width = canvas.height = Math.round(size * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    samples.clear();
  };

  const float = (p: Particle, time: number): Point => {
    const angle = p.angle + time * p.spin;
    return {
      x:
        Math.cos(angle) * p.radius + Math.sin(time / 2300 + p.phase) * p.wobble,
      y:
        Math.sin(angle) * p.radius + Math.cos(time / 2900 + p.phase) * p.wobble,
    };
  };

  const draw = (time: number) => {
    const radius = size / 2;
    ctx.clearRect(0, 0, size, size);
    ctx.fillStyle = getComputedStyle(canvas).color;
    for (const p of particles) {
      const at = float(p, time);
      const w = p.target ? tripWeight(p, time) : 0;
      const x = at.x + ((p.target?.x ?? 0) - at.x) * w;
      const y = at.y + ((p.target?.y ?? 0) - at.y) * w;
      const edge = Math.min(1, Math.max(0, (1 - Math.hypot(x, y)) / 0.35));
      ctx.globalAlpha = p.alpha * edge * (1 - w) + 0.9 * w;
      ctx.beginPath();
      ctx.arc(
        radius + x * radius,
        radius + y * radius,
        p.size * (1 - w) + ICON_DOT * w,
        0,
        TAU,
      );
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

    let targets = samples.get(index);
    if (!targets) {
      targets = sampleIcon(paths[index], size / 2);
      if (targets.length) samples.set(index, targets);
    }
    const positions = particles.map((p) => float(p, now));
    const usable = particles.map((p) => !p.target || isFree(p, now));
    matchNearest(targets, positions, usable).forEach((i, t) => {
      if (i < 0) return;
      const p = particles[i];
      p.target = targets[t];
      if (reduced) {
        Object.assign(p, {
          gatherStart: -Infinity,
          releaseStart: Infinity,
        });
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

  activate(0, performance.now() + 500);

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
