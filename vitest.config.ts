import { getViteConfig } from "astro/config";
import type { InlineConfig } from "vitest/node";
import type { UserConfig as ViteUserConfig } from "vite";

const testConfig: InlineConfig = {
  include: ["src/tests/**/*.test.ts"],
  coverage: {
    provider: "v8",
    include: ["src/components/**", "src/utils/**"],
    exclude: ["src/tests/**"],
  },
};

export default getViteConfig({
  test: testConfig,
} as ViteUserConfig & { test: InlineConfig });
