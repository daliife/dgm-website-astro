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
  /** Morph the stars of the current icon into icon `index`. */
  setActive(index: number): void;
}

export interface Point {
  x: number;
  y: number;
}

interface Particle {
  /** Resting spot in the sky, in CSS px. */
  home: Point;
  alpha: number;
  size: number;
  /**
   * Current move, in canvas CSS px: from `from` to `to` over `ms` from
   * `start`. `null` stands for the star's home in the sky.
   */
  from: Point | null;
  to: Point | null;
  start: number;
  ms: number;
}

const MOVE_MS = 1200;
const STAGGER_MS = 300;
/** Canvas area per star, in CSS px². */
const AREA_PER_PARTICLE = 1600;
const MIN_PARTICLES = 360;
const MAX_PARTICLES = 1400;
/** Stars fade out this close to the canvas bottom, in CSS px. */
const BOTTOM_FADE = 140;
/** Icon dot radius in CSS px. */
const ICON_DOT = 1.5;
const TAU = Math.PI * 2;

const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;
const progress = (time: number, start: number, ms: number) =>
  ms > 0 ? Math.min(1, Math.max(0, (time - start) / ms)) : +(time >= start);

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
 * Which point fills each target of the next icon: points already in the
 * current icon move on first; only the leftover targets recruit others.
 */
export function planMorph(
  targets: readonly Point[],
  points: readonly Point[],
  inIcon: readonly boolean[],
): number[] {
  const plan = matchNearest(targets, points, inIcon);
  const missing = targets.filter((_, t) => plan[t] < 0);
  const recruits = matchNearest(
    missing,
    points,
    inIcon.map((v) => !v),
  );
  let next = 0;
  return plan.map((i) => (i < 0 ? recruits[next++] : i));
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
 * A still starry sky over the whole canvas, coloured with its CSS `color` and
 * fading out towards its bottom. The nearest stars form the current phrase's
 * icon at `slot()`; on the next phrase they travel straight to their spots in
 * the next icon, recruiting or releasing stars as the dot count changes. Only
 * those stars ever move, and the canvas only repaints while they do. Snaps
 * under reduced motion and tears down on the next page swap.
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
  /** When the last moving star arrives. */
  let busyUntil = 0;
  let active = -1;
  /** Phrase waiting for the hero entrance to settle before its icon forms. */
  let pending: number | null = reduced ? null : 0;

  const spawn = (): Particle => {
    // Mostly faint pinpricks, with the odd brighter star.
    const glow = Math.random() ** 3;
    return {
      home: { x: Math.random() * width, y: Math.random() * height },
      alpha: 0.12 + 0.5 * glow,
      size: 0.5 + 0.6 * Math.random() + 0.8 * glow,
      from: null,
      to: null,
      start: 0,
      ms: 0,
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
      p.home.x *= oldWidth ? width / oldWidth : 1;
      p.home.y *= oldHeight ? height / oldHeight : 1;
    }
    particles = particles.slice(0, count);
    while (particles.length < count) particles.push(spawn());
  };

  /** Where a star is and how icon-like it looks (0 sky – 1 icon). */
  const locate = (p: Particle, time: number) => {
    const e = easeInOut(progress(time, p.start, p.ms));
    const a = p.from ?? p.home;
    const b = p.to ?? p.home;
    return {
      x: a.x + (b.x - a.x) * e,
      y: a.y + (b.y - a.y) * e,
      w: (p.from ? 1 - e : 0) + (p.to ? e : 0),
    };
  };

  const draw = (time: number) => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = getComputedStyle(canvas).color;
    for (const p of particles) {
      const { x, y, w } = locate(p, time);
      const fade = Math.min(1, Math.max(0, (height - y) / BOTTOM_FADE));
      ctx.globalAlpha = p.alpha * fade * (1 - w) + 0.9 * w;
      ctx.beginPath();
      ctx.arc(x, y, p.size * (1 - w) + ICON_DOT * w, 0, TAU);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  };

  const loop = (time: number) => {
    draw(time);
    frame = visible && time < busyUntil ? requestAnimationFrame(loop) : 0;
  };
  /** Paint the next frame, and keep painting while stars are moving. */
  const wake = () => {
    if (reduced) draw(0);
    else if (visible && !frame) frame = requestAnimationFrame(loop);
  };

  const moveTo = (p: Particle, to: Point | null, now: number) => {
    const { x, y } = locate(p, now);
    p.from = { x, y };
    p.to = to;
    p.start = reduced ? -Infinity : now + Math.random() * STAGGER_MS;
    p.ms = reduced ? 0 : MOVE_MS;
    busyUntil = Math.max(busyUntil, p.start + p.ms);
  };

  const iconTargets = (index: number): Point[] => {
    const place = slot();
    if (!place) return [];
    const key = `${index}:${Math.round(place.size)}`;
    let shape = samples.get(key);
    if (!shape) {
      shape = sampleIcon(paths[index], place.size);
      samples.set(key, shape);
    }
    return shape.map((s) => ({ x: place.x + s.x, y: place.y + s.y }));
  };

  /** Morph the current icon's stars into icon `index`; spares go home. */
  const activate = (index: number) => {
    const now = reduced ? 0 : performance.now();
    active = index;
    const targets = iconTargets(index);
    const plan = planMorph(
      targets,
      particles.map((p) => locate(p, now)),
      particles.map((p) => p.to !== null),
    );
    const assigned = new Map<number, Point>();
    plan.forEach((i, t) => {
      if (i >= 0) assigned.set(i, targets[t]);
    });
    particles.forEach((p, i) => {
      const to = assigned.get(i);
      if (to) moveTo(p, to, now);
      else if (p.to) moveTo(p, null, now);
    });
    wake();
  };

  const controller: ParticleIconsController = {
    setActive(index) {
      const next = ((index % icons.length) + icons.length) % icons.length;
      if (pending !== null) {
        pending = next;
        return;
      }
      if (next !== active) activate(next);
    },
  };

  resize();
  wake();
  if (reduced) {
    activate(0);
  } else {
    // Let the hero entrance settle before measuring where the first icon goes.
    const firstIcon = window.setTimeout(() => {
      const index = pending ?? 0;
      pending = null;
      activate(index);
    }, 900);
    signal.addEventListener("abort", () => clearTimeout(firstIcon));
  }

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
  let resizeTimer = 0;
  window.addEventListener(
    "resize",
    () => {
      resize();
      wake();
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (active >= 0) activate(active);
      }, 150);
    },
    { signal },
  );
  // Repaint on theme switches once the colour transition has settled.
  let themeTimer = 0;
  const themeObserver = new MutationObserver(() => {
    clearTimeout(themeTimer);
    themeTimer = window.setTimeout(wake, 500);
  });
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  signal.addEventListener("abort", () => {
    observer.disconnect();
    themeObserver.disconnect();
    cancelAnimationFrame(frame);
    clearTimeout(resizeTimer);
    clearTimeout(themeTimer);
  });
  return controller;
}
