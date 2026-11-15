import { createIcosphere, type Vec3 } from "./geodesic";
import { pageScopedController, prefersReducedMotion } from "./motion";

export interface GlobeOptions {
  /** 24×24 SVG stroke paths; up to 12, pinned to the icosahedron vertices. */
  icons: readonly string[];
  /** Fraction of the canvas the sphere radius fills. */
  radius?: number;
  /** On-screen icon size in CSS px at the front of the sphere. */
  iconSize?: number;
  /** Number of surface dots. */
  dots?: number;
}

export interface GlobeController {
  /** Turn the globe so icon `index` faces the viewer, and light it up. */
  setActive(index: number): void;
}

const CAMERA = 3.2;
const TURN_MS = 1500;
const GLOW_MS = 450;
const TAU = Math.PI * 2;
/**
 * Icosahedron vertices in icon order. The first five are the pentagon ring
 * around vertex 0, so stepping through them turns the globe evenly (~63°).
 */
const SLOT_ORDER = [11, 5, 1, 7, 10, 0, 2, 3, 4, 6, 8, 9];
const ICON_SLOTS = SLOT_ORDER.map((i) => createIcosphere(0).vertices[i]);

function rotate([x, y, z]: Vec3, yaw: number, pitch: number): Vec3 {
  const cy = Math.cos(yaw);
  const sy = Math.sin(yaw);
  const x1 = x * cy + z * sy;
  const z1 = -x * sy + z * cy;
  const cp = Math.cos(pitch);
  const sp = Math.sin(pitch);
  return [x1, y * cp - z1 * sp, y * sp + z1 * cp];
}

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

/** Yaw/pitch that rotate unit vector `v` to the front centre `[0, 0, 1]`. */
export function faceAngles([x, y, z]: Vec3): { yaw: number; pitch: number } {
  const yaw = Math.atan2(-x, z);
  return { yaw, pitch: Math.atan2(y, Math.hypot(x, z)) };
}

/** `to`, shifted by whole turns so it is the closest angle to `from`. */
function nearestAngle(from: number, to: number): number {
  return to + Math.round((from - to) / TAU) * TAU;
}

/**
 * A dotted sphere with icons pinned evenly over it, coloured with the canvas'
 * CSS `color`. The active icon is turned to the front and lit. Pauses
 * off-screen / in hidden tabs, snaps under reduced motion, and tears down on
 * the next page swap.
 */
export function mountIconGlobe(
  canvas: HTMLCanvasElement,
  {
    icons,
    radius: radiusFraction = 0.36,
    iconSize = 26,
    dots = 360,
  }: GlobeOptions,
): GlobeController | null {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const reduced = prefersReducedMotion();
  const surface = fibonacciSphere(dots);
  const slots = icons.map((_, i) => ICON_SLOTS[i % ICON_SLOTS.length]);
  const paths = icons.map((d) => new Path2D(d));
  const glow: number[] = icons.map((_, i) => (i === 0 ? 1 : 0));
  const { signal } = pageScopedController();
  let size = 0;
  let frame = 0;
  let visible = true;
  let active = 0;
  let from = faceAngles(slots[0]);
  let to = from;
  let turnStart = -Infinity;
  let lastTime = 0;

  const resize = () => {
    const dpr = window.devicePixelRatio || 1;
    size = canvas.getBoundingClientRect().width;
    canvas.width = canvas.height = Math.round(size * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const current = (time: number) => {
    if (reduced) return to;
    const t = Math.min(1, (time - turnStart) / TURN_MS);
    const e = t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;
    return {
      yaw: from.yaw + (to.yaw - from.yaw) * e,
      pitch: from.pitch + (to.pitch - from.pitch) * e,
    };
  };

  const draw = (time: number) => {
    const dt = Math.min(64, time - lastTime);
    lastTime = time;
    for (let i = 0; i < glow.length; i++) {
      const target = i === active ? 1 : 0;
      glow[i] = reduced
        ? target
        : glow[i] + (target - glow[i]) * Math.min(1, (dt / GLOW_MS) * 3);
    }

    const angles = current(time);
    const yaw = angles.yaw + (reduced ? 0 : Math.sin(time / 6000) * 0.12);
    const pitch = angles.pitch + (reduced ? 0 : Math.sin(time / 8300) * 0.06);
    const radius = size * radiusFraction;
    const centre = size / 2;
    const project = (v: Vec3) => {
      const [x, y, z] = rotate(v, yaw, pitch);
      const scale = CAMERA / (CAMERA - z);
      return {
        x: centre + x * radius * scale,
        y: centre + y * radius * scale,
        z,
        scale,
      };
    };
    const depthOf = (z: number) => Math.min(1, Math.max(0, (z + 1) / 2));

    ctx.clearRect(0, 0, size, size);
    ctx.strokeStyle = ctx.fillStyle = getComputedStyle(canvas).color;

    for (const v of surface) {
      const p = project(v);
      const depth = depthOf(p.z);
      ctx.globalAlpha = 0.05 + 0.3 * depth ** 2;
      ctx.beginPath();
      ctx.arc(p.x, p.y, (0.6 + 0.9 * depth) * p.scale, 0, TAU);
      ctx.fill();
    }

    const placed = paths
      .map((path, i) => ({ ...project(slots[i]), path, i }))
      .sort((a, b) => a.z - b.z);
    for (const { x, y, z, scale, path, i } of placed) {
      const depth = depthOf(z);
      const lit = glow[i];
      const px = iconSize * scale * (0.6 + 0.4 * depth) * (1 + 0.25 * lit);

      // Clear the dots under the icon so it reads cleanly.
      ctx.globalCompositeOperation = "destination-out";
      ctx.globalAlpha = 0.3 + 0.7 * depth;
      ctx.beginPath();
      ctx.arc(x, y, px * 0.75, 0, TAU);
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";

      if (lit > 0.01) {
        ctx.globalAlpha = 0.45 * lit;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(x, y, px * 0.85, 0, TAU);
        ctx.stroke();
      }

      ctx.globalAlpha = 0.04 + 0.4 * depth ** 2 + 0.55 * lit;
      ctx.save();
      ctx.translate(x - px / 2, y - px / 2);
      ctx.scale(px / 24, px / 24);
      ctx.lineWidth = 1.5;
      ctx.lineCap = ctx.lineJoin = "round";
      ctx.stroke(path);
      ctx.restore();
    }
    ctx.globalAlpha = 1;
  };

  const loop = (time: number) => {
    draw(time);
    frame = visible ? requestAnimationFrame(loop) : 0;
  };

  const controller: GlobeController = {
    setActive(index) {
      const next = ((index % icons.length) + icons.length) % icons.length;
      if (next === active) return;
      const now = performance.now();
      from = current(now);
      const target = faceAngles(slots[next]);
      to = { yaw: nearestAngle(from.yaw, target.yaw), pitch: target.pitch };
      active = next;
      turnStart = now;
      if (reduced) draw(0);
    },
  };

  resize();
  if (reduced) {
    draw(0);
    window.addEventListener("resize", () => (resize(), draw(0)), { signal });
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

  const wake = () => {
    if (visible && !frame) {
      frame = requestAnimationFrame((time) => {
        lastTime = time;
        loop(time);
      });
    }
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
