import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import { createLogger } from "vite";

const SERVER_PORT = 4321;
const LOCALHOST_URL = `http://localhost:${SERVER_PORT}`;
const LIVE_URL = "https://davidgimeno.cat";
const isBuild = process.argv.includes("build");
let BASE_URL = LOCALHOST_URL;
if (isBuild) {
  BASE_URL = LIVE_URL;
}

const logger = createLogger();
const originalWarn = logger.warn.bind(logger);
logger.warn = (msg, options) => {
  if (msg.includes("Failed to load source map")) return;
  originalWarn(msg, options);
};

export default defineConfig({
  site: BASE_URL,
  integrations: [sitemap(), tailwind(), react()],
  output: "static",
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
        output: {
          manualChunks: {
            vendor: ["react", "react-dom"],
          },
        },
        onwarn(warning, warn) {
          if (warning.code === "SOURCEMAP_ERROR") return;
          warn(warning);
        },
      },
    },
  },
});
