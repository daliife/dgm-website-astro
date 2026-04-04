import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { createLogger } from "vite";

const SERVER_PORT = 4321;
const LIVE_URL = "https://davidgimeno.cat";

const logger = createLogger();
const originalWarn = logger.warn.bind(logger);
logger.warn = (msg, options) => {
  if (msg.includes("Failed to load source map")) return;
  originalWarn(msg, options);
};

export default defineConfig({
  site: LIVE_URL,
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
    inlineStylesheets: "never",
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
