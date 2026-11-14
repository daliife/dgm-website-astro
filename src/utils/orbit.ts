import { createIcosphere, type Vec3 } from "./geodesic";
import { pageScopedController, prefersReducedMotion } from "./motion";

export interface OrbitOptions {
  /** 24×24 SVG stroke paths, evenly spaced around the ring. */
  icons: readonly string[];
  /** Fraction of the canvas the ring radius fills. */
  radius?: number;
  /** On-screen icon size in CSS px at the front of the ring. */
  iconSize?: number;
}

export interface OrbitController {
  /** Turn the ring so icon `index` faces the viewer, and light it up. */
  setActive(index: number): void;
}

const CAMERA = 3.2;
/** Negative pitch: the near side of the ring sits lower, seen from above. */
const PITCH = -0.52;
const CORE_SCALE = 0.28;
const CORE_TURN_MS = 70_000;
const TURN_MS = 1400;
const GLOW_MS = 450;
const RING_SEGMENTS = 96;
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

/**
 * Yaw offset (always ≤ 0, so the ring keeps turning the same way) that brings
 * slot `index` of `count` from `yaw` to the front.
 */
export function nextOrbitYaw(
  yaw: number,
  index: number,
  count: number,
): number {
  const target = -(index * TAU) / count;
  let delta = (target - yaw) % TAU;
  if (delta > 0) delta -= TAU;
  return yaw + delta;
}

/**
 * Icons on a tilted ring around a small wireframe core, coloured with the
 * canvas' CSS `color`. Pauses off-screen / in hidden tabs, snaps without
 * motion under reduced motion, and tears down on the next page swap.
 */
export function mountOrbit(
  canvas: HTMLCanvasElement,
  { icons, radius: radiusFraction = 0.38, iconSize = 28 }: OrbitOptions,
): OrbitController | null {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const reduced = prefersReducedMotion();
  const core = createIcosphere(1);
  const paths = icons.map((d) => new Path2D(d));
  const glow: number[] = icons.map((_, i) => (i === 0 ? 1 : 0));
  const { signal } = pageScopedController();
  let size = 0;
  let frame = 0;
  let visible = true;
  let active = 0;
  let yaw = 0;
  let turnFrom = 0;
  let turnTo = 0;
  let turnStart = -Infinity;
  let lastTime = 0;

  const resize = () => {
    const dpr = window.devicePixelRatio || 1;
    size = canvas.getBoundingClientRect().width;
    canvas.width = canvas.height = Math.round(size * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const draw = (time: number) => {
    const dt = Math.min(64, time - lastTime);
    lastTime = time;

    const t = Math.min(1, (time - turnStart) / TURN_MS);
    const eased = t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;
    yaw = reduced ? turnTo : turnFrom + (turnTo - turnFrom) * eased;
    const sway = reduced ? 0 : Math.sin(time / 5200) * 0.06;
    for (let i = 0; i < glow.length; i++) {
      const target = i === active ? 1 : 0;
      glow[i] = reduced
        ? target
        : glow[i] + (target - glow[i]) * Math.min(1, (dt / GLOW_MS) * 3);
    }

    const radius = size * radiusFraction;
    const centre = size / 2;
    const project = (v: Vec3, spin: number) => {
      const [x, y, z] = rotate(v, spin, PITCH);
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
    ctx.lineWidth = 1;

    // Core: a small geodesic sphere turning on its own.
    const coreSpin = reduced ? 0.6 : (time / CORE_TURN_MS) * TAU;
    const corePoints = core.vertices.map(([x, y, z]) =>
      project([x * CORE_SCALE, y * CORE_SCALE, z * CORE_SCALE], coreSpin),
    );
    for (const [a, b] of core.edges) {
      const p = corePoints[a];
      const q = corePoints[b];
      const depth = depthOf((p.z + q.z) / 2 / CORE_SCALE);
      ctx.globalAlpha = 0.05 + 0.2 * depth ** 1.5;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(q.x, q.y);
      ctx.stroke();
    }

    // Ring.
    const ringYaw = yaw + sway;
    let prev = project([0, 0, 1], ringYaw);
    for (let s = 1; s <= RING_SEGMENTS; s++) {
      const a = (s / RING_SEGMENTS) * TAU;
      const p = project([Math.sin(a), 0, Math.cos(a)], ringYaw);
      ctx.globalAlpha = 0.06 + 0.22 * depthOf((p.z + prev.z) / 2) ** 1.5;
      ctx.beginPath();
      ctx.moveTo(prev.x, prev.y);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      prev = p;
    }

    // Icons, back to front.
    const placed = paths
      .map((path, i) => {
        const a = (i * TAU) / paths.length;
        return { ...project([Math.sin(a), 0, Math.cos(a)], ringYaw), path, i };
      })
      .sort((a, b) => a.z - b.z);
    for (const { x, y, z, scale, path, i } of placed) {
      const depth = depthOf(z);
      const lit = glow[i];
      const px = iconSize * scale * (0.7 + 0.3 * depth) * (1 + 0.12 * lit);

      ctx.globalCompositeOperation = "destination-out";
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(x, y, px * 0.8, 0, TAU);
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";

      if (lit > 0.01) {
        ctx.globalAlpha = 0.5 * lit;
        ctx.beginPath();
        ctx.arc(x, y, px * 0.8, 0, TAU);
        ctx.stroke();
      }

      ctx.globalAlpha = 0.14 + 0.3 * depth + 0.5 * lit;
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

  const controller: OrbitController = {
    setActive(index) {
      const next = ((index % icons.length) + icons.length) % icons.length;
      if (next === active) return;
      active = next;
      turnFrom = yaw;
      turnTo = nextOrbitYaw(yaw, active, icons.length);
      turnStart = performance.now();
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
