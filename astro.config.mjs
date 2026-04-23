import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { createLogger } from "vite";
import { LIVE_URL } from "./src/utils/constants.ts";

const SERVER_PORT = 4321;
const PAGES_URL = "https://daliife.github.io";
const PAGES_BASE = "/dgm-website-astro";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const logger = createLogger();
const originalWarn = logger.warn.bind(logger);
logger.warn = (msg, options) => {
  if (msg.includes("Failed to load source map")) return;
  originalWarn(msg, options);
};

export default defineConfig({
  site: isGitHubPages ? PAGES_URL : LIVE_URL,
  base: isGitHubPages ? PAGES_BASE : "/",
  integrations: [sitemap(), tailwind()],
  output: "static",
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
  server: {
    port: SERVER_PORT,
  },
  build: {
    inlineStylesheets: "auto",
  },
  vite: {
    customLogger: logger,
    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          if (warning.code === "SOURCEMAP_ERROR") return;
          warn(warning);
        },
      },
    },
  },
});
