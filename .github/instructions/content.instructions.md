---
description: "cv.json content and project image pipeline"
applyTo: "cv.json,scripts/**/*.{mjs,js},public/projects/**"
---

# Content

- `cv.json` is the only place for personal/project facts — import with `@cv`
- Project thumbs: set `imageSource`, then `pnpm run images:capture` or `images:projects`
- Commit `cv.json`, `public/projects/*.webp`, and new `assets/project-shots/*` together
- Slugs derive from project names (`src/utils/projects.ts`); renames change URLs
