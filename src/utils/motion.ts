/** Pointer-driven effects only make sense with a real hover pointer and motion allowed. */
export function canUsePointerMotion(): boolean {
  return (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/**
 * AbortController that aborts on the next View Transitions swap, so listeners
 * bound on `astro:page-load` never leak across pages.
 */
export function pageScopedController(): AbortController {
  const controller = new AbortController();
  document.addEventListener("astro:before-swap", () => controller.abort(), {
    once: true,
  });
  return controller;
}
