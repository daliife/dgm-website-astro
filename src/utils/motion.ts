export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
