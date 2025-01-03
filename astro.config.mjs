import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

const SERVER_PORT = 4321;
const LOCALHOST_URL = `http://localhost:${SERVER_PORT}`;
const LIVE_URL = "https://daliife.github.io/dgm-website-astro";
const SCRIPT = process.env.npm_lifecycle_script || "";
const isBuild = SCRIPT.includes("astro build");
let BASE_URL = LOCALHOST_URL;
if (isBuild) {
  BASE_URL = LIVE_URL;
}

export default defineConfig({
  server: {
    port: SERVER_PORT,
  },
  site: BASE_URL,
  base: "/dgm-website-astro",
  integrations: [sitemap(), tailwind(), react()],
  output: "static",
});
