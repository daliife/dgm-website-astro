import type { Constellation } from "./constellations";
import { ROLL_MS, rollEase } from "./heroRoll";
import { pageScopedController, prefersReducedMotion } from "./motion";

export interface IconSlot {
  /** Icon centre, in canvas CSS px. */
  x: number;
  y: number;
  /** Icon box size, in CSS px. */
  size: number;
}

export interface ParticleIconsOptions {
  /** One constellation per hero phrase. */
  icons: readonly Constellation[];
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

/** Canvas area per star, in CSS px². */
const AREA_PER_PARTICLE = 1600;
const MIN_PARTICLES = 360;
const MAX_PARTICLES = 1400;
/** Stars fade out this close to the canvas bottom, in CSS px. */
const BOTTOM_FADE = 140;
/** Icon star radius, its halo radius, and the halo's opacity. */
const ICON_DOT = 2.2;
const ICON_HALO = 6;
const HALO_ALPHA = 0.14;
const LINK_ALPHA = 0.38;
const TAU = Math.PI * 2;

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

/** A 24×24 constellation's stars placed in a `slot`, in canvas CSS px. */
export function placeStars(
  { stars }: Constellation,
  { x, y, size }: IconSlot,
): Point[] {
  const scale = size / 24;
  return stars.map(([sx, sy]) => ({
    x: x + (sx - 12) * scale,
    y: y + (sy - 12) * scale,
  }));
}

/**
 * A still starry sky over the whole canvas, coloured with its CSS `color` and
 * fading out towards its bottom. The nearest stars form the current phrase's
 * constellation at `slot()`; on the next phrase they travel straight to their
 * spots in the next one, in step with the phrase roll (`heroRoll.ts`),
 * recruiting or releasing stars as the star count changes. Only those stars
 * ever move, and the canvas only repaints while they do. Snaps under reduced
 * motion and tears down on the next page swap.
 */
export function mountParticleIcons(
  canvas: HTMLCanvasElement,
  { icons, slot }: ParticleIconsOptions,
): ParticleIconsController | null {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const reduced = prefersReducedMotion();
  /** Particle index pairs drawn as the current icon's constellation lines. */
  let links: [number, number][] = [];
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
    const e = rollEase(progress(time, p.start, p.ms));
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
    const color = getComputedStyle(canvas).color;
    ctx.fillStyle = ctx.strokeStyle = color;
    const spots = particles.map((p) => locate(p, time));

    // Constellation lines fade in as both of their stars arrive.
    ctx.lineWidth = 0.75;
    for (const [a, b] of links) {
      const arrived = Math.min(
        progress(time, particles[a].start, particles[a].ms),
        progress(time, particles[b].start, particles[b].ms),
      );
      if (arrived === 0) continue;
      ctx.globalAlpha = LINK_ALPHA * arrived ** 3;
      ctx.beginPath();
      ctx.moveTo(spots[a].x, spots[a].y);
      ctx.lineTo(spots[b].x, spots[b].y);
      ctx.stroke();
    }

    particles.forEach((p, i) => {
      const { x, y, w } = spots[i];
      if (w > 0) {
        ctx.globalAlpha = HALO_ALPHA * w;
        ctx.beginPath();
        ctx.arc(x, y, ICON_HALO * w, 0, TAU);
        ctx.fill();
      }
      const fade = Math.min(1, Math.max(0, (height - y) / BOTTOM_FADE));
      ctx.globalAlpha = p.alpha * fade * (1 - w) + 0.95 * w;
      ctx.beginPath();
      ctx.arc(x, y, p.size * (1 - w) + ICON_DOT * w, 0, TAU);
      ctx.fill();
    });
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
    p.start = reduced ? -Infinity : now;
    p.ms = reduced ? 0 : ROLL_MS;
    busyUntil = Math.max(busyUntil, p.start + p.ms);
  };

  /** Morph the current icon's stars into icon `index`; spares go home. */
  const activate = (index: number) => {
    const now = reduced ? 0 : performance.now();
    active = index;
    const place = slot();
    const icon = icons[index];
    const targets = place ? placeStars(icon, place) : [];
    const plan = planMorph(
      targets,
      particles.map((p) => locate(p, now)),
      particles.map((p) => p.to !== null),
    );
    const assigned = new Map<number, Point>();
    plan.forEach((i, t) => {
      if (i >= 0) assigned.set(i, targets[t]);
    });
    links = place
      ? icon.lines
          .map(([a, b]): [number, number] => [plan[a], plan[b]])
          .filter(([a, b]) => a >= 0 && b >= 0)
      : [];
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
