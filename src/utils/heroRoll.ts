/** CSS-style `cubic-bezier()` timing function, for JS-driven animation. */
export function cubicBezier(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): (progress: number) => number {
  const curve = (a: number, b: number, s: number) =>
    3 * a * s * (1 - s) ** 2 + 3 * b * s * s * (1 - s) + s ** 3;
  return (progress) => {
    if (progress <= 0) return 0;
    if (progress >= 1) return 1;
    let lo = 0;
    let hi = 1;
    for (let i = 0; i < 20; i++) {
      const s = (lo + hi) / 2;
      if (curve(x1, x2, s) < progress) lo = s;
      else hi = s;
    }
    return curve(y1, y2, (lo + hi) / 2);
  };
}

/** Hero phrase roll timing, shared so the hero stars move in step with it. */
export const ROLL_MS = 1100;
export const ROLL_EASING = "cubic-bezier(0.45, 0, 0.2, 1)";
export const rollEase = cubicBezier(0.45, 0, 0.2, 1);
