/**
 * Shared WebP output for project images (used by optimize + capture scripts).
 *
 * - `{slug}.webp`        480×320 (3:2) — Open Graph + legacy `image` path in cv.json
 * - `{slug}-640.webp`    640×400 (16:10) — project cards
 * - `{slug}-1280.webp`  1280×800 (16:10) — cards on retina + detail hero
 *
 * Keep the variant widths in sync with `PROJECT_IMAGE_WIDTHS` in
 * src/utils/projects.ts.
 */
import path from "node:path";
import fs from "node:fs/promises";
import sharp from "sharp";

const BASE = { width: 480, height: 320, quality: 78 };
const VARIANTS = [
  { width: 640, height: 400, quality: 80 },
  { width: 1280, height: 800, quality: 78 },
];

/** Writes the base thumbnail and all 16:10 variants; returns total bytes. */
export async function writeProjectImages(input, outDir, slug) {
  const targets = [
    { ...BASE, file: `${slug}.webp` },
    ...VARIANTS.map((v) => ({ ...v, file: `${slug}-${v.width}.webp` })),
  ];

  let total = 0;
  for (const { width, height, quality, file } of targets) {
    const outPath = path.join(outDir, file);
    await sharp(input)
      .resize(width, height, { fit: "cover", position: "centre" })
      .webp({ quality })
      .toFile(outPath);
    total += (await fs.stat(outPath)).size;
  }
  return total;
}
