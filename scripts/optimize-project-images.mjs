/**
 * Reads project thumbnails from cv.json imageSource (HTTP(S) URL or local path
 * relative to the repo root), optimizes them to WebP (960×640, 3:2 @2x), and writes
 * paths to public/projects/.
 *
 * Usage: pnpm run images:projects
 *
 * Re-run whenever cv.json projects change:
 * - new project added
 * - imageSource URL/path updated
 * - project name changed (output filename is derived from name)
 *
 * Live captures: pnpm run images:capture (Playwright) writes assets/project-shots/
 * and updates imageSource, then you can re-run images:projects if needed.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const CV_PATH = path.join(ROOT, "cv.json");
const OUT_DIR = path.join(ROOT, "public", "projects");

const WIDTH = 960;
const HEIGHT = 640;
const WEBP_QUALITY = 85;

function slugify(name) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function loadSourceBuffer(source) {
  if (/^https?:\/\//i.test(source)) {
    const res = await fetch(source, { redirect: "follow" });
    if (!res.ok) {
      throw new Error(
        `Failed to fetch ${source}: ${res.status} ${res.statusText}`,
      );
    }
    return Buffer.from(await res.arrayBuffer());
  }

  const localPath = path.isAbsolute(source) ? source : path.join(ROOT, source);
  return fs.readFile(localPath);
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
    const input = await loadSourceBuffer(source);
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
