/** Fixed character row so the home role line never changes width. */

export function boardWidth(phrases: readonly string[]): number {
  let width = 0;
  for (const phrase of phrases) width = Math.max(width, phrase.length);
  return width;
}

/** Pad or trim so every phrase occupies the same cells. */
export function padToBoard(text: string, width: number): string {
  if (width <= 0) return "";
  return [...text].slice(0, width).join("").padEnd(width, " ");
}
