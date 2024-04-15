import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

export default defineConfig({
  integrations: [tailwind()],
  // site: "https://dgm-website-astro.github.io",
  // base: "/dgm-website-astro",
});
