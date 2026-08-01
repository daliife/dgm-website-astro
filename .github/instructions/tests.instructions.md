---
description: "Vitest and build URL coverage"
applyTo: "src/tests/**/*.ts,vitest.config.ts"
---

# Tests

- Vitest + `experimental_AstroContainer` for `.astro` rendering
- Folders: `components/`, `pages/`, `utils/`, `i18n/` under `src/tests/`
- New surface → new/updated test; do not leave pages or utils untested by default
- Project routes: cover all slugs from `getProjectEntries` (list hrefs + detail render)
- Post-build inventory: `pnpm run test:build-urls` (requires `dist/`; part of CI after `build`)
