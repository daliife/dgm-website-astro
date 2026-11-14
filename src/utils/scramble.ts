const GLYPHS = "abcdefghijklmnopqrstuvwxyz0123456789";
/** Kept fixed so the address keeps its recognisable shape while resolving. */
const ANCHORS = new Set(["@", ".", "-", "_"]);

/**
 * One frame of a left-to-right "decrypt": characters before `progress` (0–1)
 * are final, the rest are random glyphs.
 */
export function scrambleFrame(
  text: string,
  progress: number,
  random: () => number = Math.random,
): string {
  const resolved = Math.floor(text.length * Math.min(1, Math.max(0, progress)));
  let out = text.slice(0, resolved);
  for (const char of text.slice(resolved)) {
    out += ANCHORS.has(char)
      ? char
      : GLYPHS[Math.floor(random() * GLYPHS.length)];
  }
  return out;
}

/** Animates `el` from noise to its text. Returns a cancel function. */
export function scrambleIn(el: HTMLElement, duration = 800): () => void {
  const text = el.dataset.scrambleText ?? el.textContent ?? "";
  el.dataset.scrambleText = text;
  const start = performance.now();
  let frame = 0;

  const step = (now: number) => {
    const progress = (now - start) / duration;
    el.textContent = scrambleFrame(text, progress);
    frame = progress < 1 ? requestAnimationFrame(step) : 0;
  };
  frame = requestAnimationFrame(step);

  return () => {
    cancelAnimationFrame(frame);
    el.textContent = text;
  };
}
