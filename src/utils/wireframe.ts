import type { Mesh, Vec3 } from "./geodesic";
import { pageScopedController, prefersReducedMotion } from "./motion";

/** A 24×24 stroke icon (SVG path `d`) pinned to a point on the mesh. */
export interface WireframeIcon {
  at: Vec3;
  path: string;
}

export interface WireframeOptions {
  mesh: Mesh;
  icons?: WireframeIcon[];
  /** Seconds per full turn. */
  turnSeconds?: number;
  /** Camera pitch in radians (negative tilts the top toward the viewer). */
  tilt?: number;
  /** Fraction of the canvas the unit sphere radius fills. */
  radius?: number;
  /** On-screen icon size in CSS px at the sphere's front. */
  iconSize?: number;
}

const CAMERA = 3.2;
const STILL_TIME = 9_000;
const EDGE_ALPHA = { back: 0.04, front: 0.26 };
const ICON_ALPHA = { back: 0.08, front: 0.85 };

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
 * Renders a slowly rotating monochrome wireframe (plus optional icons riding
 * on it) into `canvas`, coloured with the canvas' CSS `color`. Pauses
 * off-screen / in hidden tabs, draws a still frame under reduced motion, and
 * tears down on the next page swap.
 */
export function mountWireframe(
  canvas: HTMLCanvasElement,
  {
    mesh,
    icons = [],
    turnSeconds = 60,
    tilt = 0.42,
    radius: radiusFraction = 0.42,
    iconSize = 28,
  }: WireframeOptions,
): void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const reduced = prefersReducedMotion();
  const spin = (Math.PI * 2) / (turnSeconds * 1000);
  const paths = icons.map(({ path }) => new Path2D(path));
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
    const yaw = time * spin;
    const pitch = tilt + Math.sin(time * spin * 0.7) * 0.08;
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
    ctx.lineWidth = 1;

    const projected = mesh.vertices.map(project);
    for (const [a, b] of mesh.edges) {
      const p = projected[a];
      const q = projected[b];
      const depth = depthOf((p.z + q.z) / 2);
      ctx.globalAlpha =
        EDGE_ALPHA.back + (EDGE_ALPHA.front - EDGE_ALPHA.back) * depth ** 1.5;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(q.x, q.y);
      ctx.stroke();
    }

    // Back-to-front so nearer icons sit on top of farther ones.
    const placed = icons
      .map((icon, i) => ({ ...project(icon.at), path: paths[i] }))
      .sort((a, b) => a.z - b.z);
    for (const { x, y, z, scale, path } of placed) {
      const depth = depthOf(z);
      const px = iconSize * scale * (0.75 + 0.25 * depth);

      // Clear the lines under the icon so it reads cleanly.
      ctx.globalCompositeOperation = "destination-out";
      ctx.globalAlpha = 0.4 + 0.6 * depth;
      ctx.beginPath();
      ctx.arc(x, y, px * 0.78, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";

      ctx.globalAlpha =
        ICON_ALPHA.back + (ICON_ALPHA.front - ICON_ALPHA.back) * depth ** 2;
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
