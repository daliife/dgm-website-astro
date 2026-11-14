import type { Mesh, Vec3 } from "./geodesic";
import { pageScopedController, prefersReducedMotion } from "./motion";

export interface WireframeOptions {
  mesh: Mesh;
  /** Seconds per full turn. */
  turnSeconds?: number;
  /** Starting yaw in radians. */
  yaw?: number;
  /** Camera pitch in radians (negative tilts the north pole toward the viewer). */
  tilt?: number;
  /** Fraction of the canvas the sphere radius fills. */
  radius?: number;
  edgeAlpha?: { back: number; front: number };
  /** Draw a dot on every vertex (good for sparse meshes). */
  vertexDots?: boolean;
  /** A pulsing point on the surface, e.g. a location on a globe. */
  marker?: Vec3;
}

const CAMERA = 3.2;
const PULSE_MS = 2400;
const STILL_TIME = 9_000;

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
    mesh,
    turnSeconds = 60,
    yaw: startYaw = 0,
    tilt = 0.42,
    radius: radiusFraction = 0.42,
    edgeAlpha = { back: 0.05, front: 0.32 },
    vertexDots = false,
    marker,
  }: WireframeOptions,
): void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const spin = (Math.PI * 2) / (turnSeconds * 1000);
  const { signal } = pageScopedController();
  let size = 0;
  let frame = 0;
  let visible = true;

  const resize = () => {
    const dpr = window.devicePixelRatio || 1;
    size = canvas.getBoundingClientRect().width;
    canvas.width = canvas.height = Math.round(size * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const draw = (time: number) => {
    const yaw = startYaw + time * spin;
    const pitch = tilt + Math.sin(time * spin * 0.7) * 0.08;
    const radius = size * radiusFraction;
    const centre = size / 2;
    const project = (v: Vec3) => {
      const [x, y, z] = rotate(v, yaw, pitch);
      const scale = radius * (CAMERA / (CAMERA - z));
      return { x: centre + x * scale, y: centre + y * scale, z };
    };
    const projected = mesh.vertices.map(project);

    ctx.clearRect(0, 0, size, size);
    ctx.strokeStyle = ctx.fillStyle = getComputedStyle(canvas).color;
    ctx.lineWidth = 1;

    for (const [a, b] of mesh.edges) {
      const p = projected[a];
      const q = projected[b];
      const depth = ((p.z + q.z) / 2 + 1) / 2;
      ctx.globalAlpha =
        edgeAlpha.back + (edgeAlpha.front - edgeAlpha.back) * depth ** 1.5;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(q.x, q.y);
      ctx.stroke();
    }

    if (vertexDots) {
      for (const p of projected) {
        const depth = (p.z + 1) / 2;
        ctx.globalAlpha = 0.08 + 0.4 * depth ** 2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.1 + depth * 0.8, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    if (marker) {
      const m = project(marker);
      const facing = Math.max(0, Math.min(1, (m.z + 0.15) / 0.5));
      if (facing > 0) {
        const pulse = (time % PULSE_MS) / PULSE_MS;
        ctx.globalAlpha = facing * 0.5 * (1 - pulse);
        ctx.beginPath();
        ctx.arc(m.x, m.y, 2.5 + pulse * 12, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = facing * 0.9;
        ctx.beginPath();
        ctx.arc(m.x, m.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
  };

  const loop = (time: number) => {
    draw(time);
    frame = visible ? requestAnimationFrame(loop) : 0;
  };

  resize();
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
  window.addEventListener("resize", resize, { signal });
  signal.addEventListener("abort", () => {
    observer.disconnect();
    cancelAnimationFrame(frame);
  });
}
