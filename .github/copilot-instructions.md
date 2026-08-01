# GitHub Copilot Instructions

Repository-wide Copilot context. Path-specific rules live in [`.github/instructions/`](instructions/). Canonical agent guide: [AGENTS.md](../AGENTS.md). Cursor rules: [`.cursor/rules/`](../.cursor/rules/).

## Project

Personal portfolio for David Gimeno Mañé — a static Astro 6 site hosted at [davidgimeno.cat](https://davidgimeno.cat). TypeScript + Tailwind CSS, vanilla JS in `.astro` scripts (no React islands). Deployed automatically via GitHub Actions on push to `main` (FTP to cdmon via `deploy.yml`, GitHub Pages via `deploy-pages.yml`). Both pipelines use Node.js 24 + pnpm 9. Local dev requires Node.js ≥ 22.12.0.

## Hard rules — never break these

- **Dark/light mode via toggle.** `ThemeToggle.astro` handles switching. Theme persists in `localStorage`. Do not switch to dark-mode-only.
- **No custom CSS.** Use Tailwind utility classes exclusively. Exception: CSS custom property definitions in Layout.astro or configs.
- **Use semantic color tokens**, not raw palette classes. E.g. `text-text-primary` not `text-gray-900`. Tokens are defined in `tailwind.config.mjs`.
- **`cv.json` is the single content source.** Do not hardcode bio, job titles, dates, project names, or any personal data inside components.
- **`<Button>` for all interactive elements.** It is polymorphic — pass `href` for links, omit for `<button>`. Variants: `primary | outline | ghost | simple`. Sizes: `sm | md | none`.
- **Prefer `.astro` components.** Use React only when client-side state/hooks are genuinely necessary.
- **View Transitions.** The project uses Astro's `ClientRouter`. Use `astro:page-load` for init scripts, not `DOMContentLoaded`.
- **pnpm only.** Do not use npm or yarn.
- **CI gate is mandatory before finishing.** After any change (including Markdown / README), run locally: `pnpm run format:check` → `lint` → `test` → `build` → `test:build-urls`. Task is not done until all five pass. If `format:check` fails, run `pnpm run format` and re-check. On dependency changes, also `pnpm audit --audit-level=high`. Pushes to `main` deploy to production — never leave a red pipeline for the user.

## Before finishing (required — every task)

Same checks as `.github/workflows/ci.yml`. **Always run after editing files**, not only when opening a PR:

```bash
pnpm run format:check   # Markdown counts — Prettier fails CI if skipped
pnpm run lint
pnpm run test
pnpm run build          # required for prod deploy workflows too
pnpm run test:build-urls
```

If you changed `package.json` or `pnpm-lock.yaml`:

```bash
pnpm audit --audit-level=high
```

| Workflow             | Trigger             | What it runs                                         |
| -------------------- | ------------------- | ---------------------------------------------------- |
| `ci.yml`             | PR → `main`         | format:check · lint · test · build · test:build-urls |
| `security-audit.yml` | PR → `main`, weekly | `pnpm audit --audit-level=high`                      |
| `deploy.yml`         | push → `main`       | build + FTP deploy                                   |
| `deploy-pages.yml`   | push → `main`       | build + GitHub Pages deploy                          |

Full reference: [AGENTS.md](../AGENTS.md) § “Before finishing (CI / deploy gate)”.

### Creating a page

```astro
---
import Layout from "../layouts/Layout.astro";
import {
  PAGE_CONTAINER_CLASSES,
  PAGE_HEADING_CLASSES,
} from "../utils/constants";
import { getPageTitleFromKey } from "../utils/seo";
---

<Layout title={getPageTitleFromKey("ui.page.about")}>
  <div class={PAGE_CONTAINER_CLASSES}>
    <h1 class={`${PAGE_HEADING_CLASSES} mb-12`}>Page Title</h1>
    <!-- content -->
  </div>
</Layout>
```

### Reading content from cv.json

```astro
---
import { basics, work } from "@cv";
---

<p>{basics.summary}</p>
```

### Adding a nav link

Add the route name to `NAV_LINKS` in `src/utils/constants.ts`, update the `NavLink` type in `src/types/ui.ts`, and create the corresponding page in `src/pages/`.

### i18n / translations

Locales: **CA** (SSR default via `t()`), **EN**, **ES**. Add `data-i18n="key"` (or `-aria` / `-alt`) on translatable nodes and add the same key to `src/i18n/{ca,en,es}.ts`. Languages in the toggle come from `SUPPORTED_LANGUAGES` in `constants.ts`.

### Button usage

```astro
<!-- Renders <button> -->
<Button variant="primary" size="md">Click me</Button>

<!-- Renders <a> -->
<Button href="/projects" variant="outline" size="md">See projects</Button>
```

### Scroll reveal animation

```astro
<div class="reveal">
  <!-- fades in on scroll, respects prefers-reduced-motion -->
</div>
```

### Event listeners (client-side scripts)

```astro
<script>
  // ✓ Correct — works with View Transitions
  document.addEventListener("astro:page-load", () => {
    // init
  });

  // ✗ Wrong — only fires on first hard load
  document.addEventListener("DOMContentLoaded", () => {});
</script>
```

## File map

| File                                        | Purpose                                                                   |
| ------------------------------------------- | ------------------------------------------------------------------------- |
| `cv.json`                                   | All personal content                                                      |
| `src/layouts/Layout.astro`                  | Root HTML shell, SEO, theme, fonts, scroll reveal                         |
| `src/components/brand/ThemeToggle.astro`    | Dark/light mode toggle                                                    |
| `src/components/brand/LanguageToggle.astro` | CA/EN/ES language switcher, driven by `SUPPORTED_LANGUAGES`               |
| `src/components/layout/Header.astro`        | Fixed nav with logo, links, theme + language toggles                      |
| `src/components/layout/Footer.astro`        | Copyright + social links from cv.json                                     |
| `src/components/ui/Button.astro`            | Universal button/link component                                           |
| `src/utils/constants.ts`                    | `NAV_LINKS`, `PAGE_*` / `NEXTUP_*` classes, `SUPPORTED_LANGUAGES`         |
| `src/utils/url.ts`                          | `pageHref()`, `SITE_BASE` — trailing-slash internal links                 |
| `src/utils/projects.ts`                     | Slugs, ordering, adjacency for project detail routes                      |
| `src/utils/seo.ts`                          | Page titles, canonical URLs                                               |
| `src/utils/format.ts`                       | `formatDate()`, `stripProtocol()`                                         |
| `src/utils/socialLinks.ts`                  | `getSocialProfile()`                                                      |
| `src/i18n/{ca,en,es}.ts`                    | Translations (flat `Record<string, string>`)                              |
| `src/tests/pages/build-urls.test.ts`        | Post-build `dist/` URL inventory (`pnpm run test:build-urls`)             |
| `tailwind.config.mjs`                       | Design tokens and color palette                                           |
| `astro.config.mjs`                          | Integrations, Vite, site URL, GitHub Pages base path                      |
| `src/types/ui.ts`                           | `ButtonVariant`, `ButtonSize`, `NavLink`, `SocialProfile`, CV entry types |
| `.github/instructions/*.instructions.md`    | Path-scoped Copilot rules (astro, i18n, tests, content, concise)          |
| `.cursor/rules/*.mdc`                       | Cursor project rules (mirrors path-scoped guidance)                       |
| `.github/workflows/ci.yml`                  | PR gate: format:check · lint · test · build · test:build-urls             |

## Design tokens reference

```
Text:        text-text-primary  text-text-secondary  text-text-muted  text-text-accent
Background:  bg-bg-primary      bg-bg-secondary      bg-bg-muted
Border:      border-border-primary  border-border-secondary  border-border-muted
```

Font family: **Inter** (variable). Loaded via `@fontsource-variable/inter`.

## Architecture context

See [docs/architecture.md](../docs/architecture.md) for in-depth reference.
