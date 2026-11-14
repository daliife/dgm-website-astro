import { pageScopedController, prefersReducedMotion } from "./motion";

/** Canvas-space point: +y is down, +z faces the viewer. */
export type Vec3 = [number, number, number];

export interface Mesh {
  vertices: Vec3[];
  edges: [number, number][];
}

export interface WireframeShape {
  mesh: Mesh;
  /** Camera pitch in radians (negative tilts the top toward the viewer). */
  tilt?: number;
  edgeAlpha?: { back: number; front: number };
  /** Draw a dot on every vertex (good for sparse meshes). */
  vertexDots?: boolean;
}

export interface WireframeOptions {
  shape: WireframeShape;
  /** Seconds per full turn (or per sway cycle). */
  turnSeconds?: number;
  /** Starting yaw in radians. */
  yaw?: number;
  /** Swing ±`sway` radians around `yaw` and bob gently instead of spinning. */
  sway?: number;
  /** Fraction of the canvas the unit sphere radius fills. */
  radius?: number;
}

export interface WireframeController {
  /** Cross-fade to another shape. */
  setShape(shape: WireframeShape): void;
  /** Fly off along +x (the mesh's nose) and glide back in from behind. */
  fly(): void;
}

const CAMERA = 3.2;
const MORPH_MS = 900;
const FLIGHT_MS = 1600;
const FLIGHT_OUT = 0.5;
const STILL_TIME = 9_000;
const DEFAULT_TILT = 0.42;
const DEFAULT_EDGE_ALPHA = { back: 0.05, front: 0.32 };

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
 * Renders a slowly rotating monochrome wireframe into `canvas`, coloured with
 * the canvas' CSS `color`. Pauses off-screen / in hidden tabs, draws a single
 * still frame under reduced motion, and tears down on the next page swap.
 */
export function mountWireframe(
  canvas: HTMLCanvasElement,
  {
    shape,
    turnSeconds = 60,
    yaw: startYaw = 0,
    radius: radiusFraction = 0.42,
    sway,
  }: WireframeOptions,
): WireframeController | null {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const reduced = prefersReducedMotion();
  const spin = (Math.PI * 2) / (turnSeconds * 1000);
  const { signal } = pageScopedController();
  let size = 0;
  let frame = 0;
  let visible = true;
  let current = shape;
  let previous: WireframeShape | null = null;
  let morphStart = 0;
  let flightStart: number | null = null;

  const resize = () => {
    const dpr = window.devicePixelRatio || 1;
    size = canvas.getBoundingClientRect().width;
    canvas.width = canvas.height = Math.round(size * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const drawShape = (
    {
      mesh,
      tilt = DEFAULT_TILT,
      edgeAlpha = DEFAULT_EDGE_ALPHA,
      vertexDots,
    }: WireframeShape,
    time: number,
    opacity: number,
    scale: number,
    [ox, oy, oz]: Vec3 = [0, 0, 0],
  ) => {
    const phase = time * spin;
    const yaw =
      sway === undefined ? startYaw + phase : startYaw + Math.sin(phase) * sway;
    const pitch = tilt + Math.sin(phase * 0.7) * 0.08;
    const radius = size * radiusFraction * scale;
    const centre = size / 2;
    const bob = sway === undefined ? 0 : Math.sin(phase * 2) * size * 0.015;
    const projected = mesh.vertices.map(([vx, vy, vz]) => {
      const [x, y, z] = rotate([vx + ox, vy + oy, vz + oz], yaw, pitch);
      const s = radius * (CAMERA / (CAMERA - z));
      return { x: centre + x * s, y: centre + y * s + bob, z };
    });

    for (const [a, b] of mesh.edges) {
      const p = projected[a];
      const q = projected[b];
      const depth = Math.min(1, Math.max(0, ((p.z + q.z) / 2 + 1) / 2));
      ctx.globalAlpha =
        opacity *
        (edgeAlpha.back + (edgeAlpha.front - edgeAlpha.back) * depth ** 1.5);
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(q.x, q.y);
      ctx.stroke();
    }

    if (vertexDots) {
      for (const p of projected) {
        const depth = Math.min(1, Math.max(0, (p.z + 1) / 2));
        ctx.globalAlpha = opacity * (0.08 + 0.4 * depth ** 2);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.1 + depth * 0.8, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  };

  const draw = (time: number) => {
    ctx.clearRect(0, 0, size, size);
    ctx.strokeStyle = ctx.fillStyle = getComputedStyle(canvas).color;
    ctx.lineWidth = 1;

    const progress = previous ? Math.min(1, (time - morphStart) / MORPH_MS) : 1;
    const eased = 1 - (1 - progress) ** 3;
    if (previous) {
      drawShape(previous, time, 1 - eased, 1 - 0.12 * eased);
      if (progress >= 1) previous = null;
    }
    if (flightStart !== null) {
      const t = Math.min(1, (time - flightStart) / FLIGHT_MS);
      if (t < FLIGHT_OUT) {
        const p = (t / FLIGHT_OUT) ** 2;
        drawShape(current, time, eased * (1 - p), 1, [p * 2.6, -p * 0.5, 0]);
      } else {
        const q = 1 - (1 - (t - FLIGHT_OUT) / (1 - FLIGHT_OUT)) ** 3;
        drawShape(current, time, eased * q, 0.88 + 0.12 * q, [
          -(1 - q) * 0.8,
          0,
          0,
        ]);
      }
      if (t >= 1) flightStart = null;
    } else {
      drawShape(current, time, eased, 0.88 + 0.12 * eased);
    }
    ctx.globalAlpha = 1;
  };

  const loop = (time: number) => {
    draw(time);
    frame = visible ? requestAnimationFrame(loop) : 0;
  };

  const controller: WireframeController = {
    setShape(next) {
      if (next === current) return;
      if (reduced) {
        current = next;
        draw(STILL_TIME);
        return;
      }
      previous = current;
      current = next;
      morphStart = performance.now();
    },
    fly() {
      if (!reduced && flightStart === null) flightStart = performance.now();
    },
  };

  resize();
  if (reduced) {
    draw(STILL_TIME);
    window.addEventListener("resize", () => (resize(), draw(STILL_TIME)), {
      signal,
    });
    // Repaint on theme switches once the colour transition has settled.
    const themeObserver = new MutationObserver(() =>
      window.setTimeout(() => draw(STILL_TIME), 500),
    );
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    signal.addEventListener("abort", () => themeObserver.disconnect());
    return controller;
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
  window.addEventListener("resize", resize, { signal });
  signal.addEventListener("abort", () => {
    observer.disconnect();
    cancelAnimationFrame(frame);
  });
  return controller;
}
