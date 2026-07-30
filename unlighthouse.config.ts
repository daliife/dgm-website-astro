import { defineUnlighthouseConfig } from "unlighthouse/config";

/**
 * Site-wide Lighthouse via Unlighthouse.
 *
 * Default target: production. Override with UNLIGHTHOUSE_SITE for local preview:
 *   pnpm run build && pnpm run preview
 *   UNLIGHTHOUSE_SITE=http://localhost:4321 pnpm run lighthouse:scan
 */
export default defineUnlighthouseConfig({
  site: process.env.UNLIGHTHOUSE_SITE || "https://davidgimeno.cat",
  outputPath: ".unlighthouse",
  scanner: {
    // Keep every project slug / static route (avoid path sampling).
    dynamicSampling: false,
    device: "mobile",
    throttle: true,
  },
  ci: {
    buildStatic: true,
    reporter: "jsonExpanded",
  },
});
