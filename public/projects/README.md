# Project thumbnails

Auto-generated WebP files for `/projects` cards and detail pages. **Do not edit manually.**

- `{slug}.webp` — 480×320, Open Graph image
- `{slug}-640.webp`, `{slug}-1280.webp` — 16:10 responsive variants

After adding or updating projects in `cv.json`, run:

```bash
pnpm run images:projects
```

Then commit the updated files here plus the `image` / `imageSource` fields in `cv.json`.

See `scripts/optimize-project-images.mjs` and `AGENTS.md` → **Project thumbnails**.
