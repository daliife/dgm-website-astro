/**
 * Captures live project URLs into assets/project-shots/{slug}.jpg,
 * then optimizes them into public/projects/*.webp via sharp (same size as
 * optimize-project-images.mjs).
 *
 * Usage: node scripts/capture-project-screenshots.mjs
 * Requires Playwright Chromium (pnpm dlx playwright install chromium).
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const CV_PATH = path.join(ROOT, "cv.json");
const SHOTS_DIR = path.join(ROOT, "assets", "project-shots");
const OUT_DIR = path.join(ROOT, "public", "projects");

const WIDTH = 960;
const HEIGHT = 640;
const WEBP_QUALITY = 85;
const VIEWPORT = { width: 1440, height: 900 };

function slugify(name) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Prefer a playable / marketing surface over a bare GitHub repo page when both exist. */
function captureUrl(project) {
  if (project.url && !/github\.com\/[^/]+\/[^/]+\/?$/.test(project.url)) {
    return project.url;
  }
  if (project.url) return project.url;
  return project.githubUrl ?? null;
}

async function dismissOverlays(page) {
  const selectors = [
    'button:has-text("Reject all")',
    'button:has-text("Accept all")',
    'button:has-text("Accept")',
    'button:has-text("I agree")',
    'button:has-text("Agree")',
    'button:has-text("Got it")',
    'button:has-text("OK")',
    '[aria-label="Close"]',
    'button:has-text("Acceptar")',
    'button:has-text("Aceptar")',
    'button:has-text("Rechazar todo")',
    'button:has-text("Rebutja-ho tot")',
  ];
  for (const sel of selectors) {
    try {
      const el = page.locator(sel).first();
      if (await el.isVisible({ timeout: 400 })) {
        await el.click({ timeout: 1000 });
        await page.waitForTimeout(300);
      }
    } catch {
      /* ignore */
    }
  }
}

async function main() {
  const cv = JSON.parse(await fs.readFile(CV_PATH, "utf-8"));
  await fs.mkdir(SHOTS_DIR, { recursive: true });
  await fs.mkdir(OUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 1,
    locale: "en-US",
  });

  let updated = false;

  for (const project of cv.projects) {
    const url = captureUrl(project);
    const slug = slugify(project.name);
    if (!url) {
      console.warn(`Skip ${project.name}: no URL`);
      continue;
    }

    const shotPath = path.join(SHOTS_DIR, `${slug}.jpg`);
    const filename = `${slug}.webp`;
    const outPath = path.join(OUT_DIR, filename);
    const publicPath = `/projects/${filename}`;
    const relativeSource = `assets/project-shots/${slug}.jpg`;

    process.stdout.write(`Capturing ${project.name} ← ${url}… `);
    const page = await context.newPage();
    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
      await page.waitForTimeout(2500);
      await dismissOverlays(page);
      // Prefer above-the-fold product UI; scroll slightly past sticky headers when useful
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(400);
      const png = await page.screenshot({ type: "png", fullPage: false });
      await sharp(png).jpeg({ quality: 88, mozjpeg: true }).toFile(shotPath);
      await sharp(shotPath)
        .resize(WIDTH, HEIGHT, { fit: "cover", position: "centre" })
        .webp({ quality: WEBP_QUALITY })
        .toFile(outPath);

      if (project.image !== publicPath) {
        project.image = publicPath;
        updated = true;
      }
      if (project.imageSource !== relativeSource) {
        project.imageSource = relativeSource;
        updated = true;
      }
      const { size } = await fs.stat(outPath);
      console.log(`ok → ${filename} (${(size / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.log(`FAILED: ${err.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();

  if (updated) {
    await fs.writeFile(CV_PATH, `${JSON.stringify(cv, null, 2)}\n`, "utf-8");
    console.log("Updated cv.json image / imageSource paths.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
