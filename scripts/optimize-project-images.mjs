/**
 * Downloads project thumbnails from cv.json imageSource URLs, optimizes them
 * to WebP (384×256, 3:2), and writes paths to public/projects/.
 *
 * Usage: pnpm run images:projects
 *
 * Re-run whenever cv.json projects change:
 * - new project added
 * - imageSource URL updated
 * - project name changed (output filename is derived from name)
 *
 * Workflow: set imageSource to the remote URL → run this script → commit
 * the updated cv.json image paths and public/projects/*.webp files.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const CV_PATH = path.join(ROOT, "cv.json");
const OUT_DIR = path.join(ROOT, "public", "projects");

const WIDTH = 384;
const HEIGHT = 256;
const WEBP_QUALITY = 80;

function slugify(name) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function downloadBuffer(url) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  return Buffer.from(await res.arrayBuffer());
}

async function main() {
  const cv = JSON.parse(await fs.readFile(CV_PATH, "utf-8"));
  await fs.mkdir(OUT_DIR, { recursive: true });

  let updated = false;

  for (const project of cv.projects) {
    const source =
      project.imageSource ??
      (typeof project.image === "string" && project.image.startsWith("http")
        ? project.image
        : null);

    if (!source) {
      console.warn(`Skip ${project.name}: no imageSource`);
      continue;
    }

    const slug = slugify(project.name);
    const filename = `${slug}.webp`;
    const outPath = path.join(OUT_DIR, filename);
    const publicPath = `/projects/${filename}`;

    process.stdout.write(`Optimizing ${project.name}… `);
    const input = await downloadBuffer(source);
    await sharp(input)
      .resize(WIDTH, HEIGHT, { fit: "cover", position: "centre" })
      .webp({ quality: WEBP_QUALITY })
      .toFile(outPath);

    const { size } = await fs.stat(outPath);
    console.log(`${filename} (${(size / 1024).toFixed(1)} KB)`);

    if (!project.imageSource) {
      project.imageSource = source;
      updated = true;
    }
    if (project.image !== publicPath) {
      project.image = publicPath;
      updated = true;
    }
  }

  if (updated) {
    await fs.writeFile(CV_PATH, `${JSON.stringify(cv, null, 2)}\n`);
    console.log("Updated cv.json");
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
