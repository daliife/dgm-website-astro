# AGENTS.md — AI Agent Context

This file provides context for AI coding agents (OpenAI Codex, Claude, Gemini, etc.) working on this repository.

## What is this project?

Personal portfolio website for David Gimeno. Static site built with Astro 6, TypeScript, and Tailwind CSS. Hosted at [davidgimeno.cat](http://davidgimeno.cat). Deployed automatically via GitHub Actions on every push to `main` (FTP to cdmon + GitHub Pages).

## Non-negotiable constraints

Before writing any code, internalize these rules:

| Constraint    | Rule                                                                                                                     |
| ------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Theme         | **Dark/light mode via toggle.** `ThemeToggle.astro` handles switching. Theme persists in `localStorage`.                 |
| Styling       | **Tailwind utilities only.** No inline styles, no CSS modules, no custom stylesheets.                                    |
| Color tokens  | Use **semantic tokens** (`text-text-primary`, `bg-bg-secondary`, etc.) — never raw palette classes like `text-gray-900`. |
| Content       | All personal data lives in **`cv.json`**. Never hardcode names, dates, job titles, or project info in components.        |
| Interactivity | **`.astro` components first.** Client-side JS only when state or browser APIs are required.                              |
| Navigation    | Routes are driven by `NAV_LINKS` in `src/utils/constants.ts`. New pages need an entry there and a file in `src/pages/`.  |
| Buttons/links | **Always use `<Button>`** component for interactive UI elements. Pass `href` for links, omit for buttons.                |
| Scripts       | Use `astro:page-load` event, **not** `DOMContentLoaded` (broken with View Transitions).                                  |
| Package mgr   | **pnpm only.** Do not use npm or yarn.                                                                                   |
| CI / deploy   | **Before any PR or push to `main`**, run `format:check` → `lint` → `test` → `build` locally (see § Before finishing).    |

## Repository layout

```
astro.config.mjs          ← Astro + Vite config (GITHUB_PAGES env var switches base path for GH Pages)
tailwind.config.mjs        ← Design tokens (CSS vars mapped to Tailwind utilities)
cv.json                    ← Single source of truth for all content
.npmrc                     ← pnpm config (shamefully-hoist=true)
src/
  layouts/Layout.astro     ← Root HTML shell (theme, SEO, fonts, ClientRouter, scroll reveal)
  components/
    brand/                 ← DgmLogoSimple, ThemeToggle, LanguageToggle
    layout/                ← Header, Footer, CookieConsent, NextUpNav
    sections/              ← ProjectCard, WorkCard, WorkDates, PrintWorkSection, …
    ui/                    ← Button
  i18n/
    ca.ts                  ← Catalan translations (default SSR locale)
    en.ts                  ← English translations
    es.ts                  ← Spanish translations
  pages/                   ← File-based routes (index, about, projects, work, contact, 404)
  tests/
    components/            ← AstroContainer unit tests per component
    pages/                 ← Route existence tests
    utils/                 ← Utility function tests
  types/ui.ts              ← ButtonVariant, ButtonSize, NavLink, SocialProfile, CV entry types
  utils/
    constants.ts           ← NAV_LINKS, PAGE_* classes, NEXTUP_* classes, SUPPORTED_LANGUAGES
    format.ts              ← formatDate(), stripProtocol()
    locale.ts              ← DATE_LOCALE_MAP, OG_LOCALE_MAP
    typewriter.ts          ← getTypewriterPhrases() for home page rotation
    i18n.ts                ← DEFAULT_LANG, t() for SSR Catalan copy
    i18n-client.ts         ← client-side applyI18n(), lazy locale loading
    analytics.ts           ← Umami loader (consent-gated)
    socialLinks.ts         ← getSocialProfile() helper
docs/
  architecture.md          ← Deep-dive architecture reference
AGENTS.md                  ← This file
.github/
  copilot-instructions.md  ← GitHub Copilot custom instructions
  workflows/
    ci.yml                 ← PR gate: format · lint · test · build
    security-audit.yml     ← PR + weekly: pnpm audit (high)
    deploy.yml             ← Auto-deploy to cdmon via FTP (triggers on push to main)
    deploy-pages.yml       ← Auto-deploy to GitHub Pages with GITHUB_PAGES=true (triggers on push to main)
```

## How to add things

### New page

```astro
---
// src/pages/new-page.astro
import Layout from "../layouts/Layout.astro";
import {
  TITLE_PAGE_SUFFIX,
  PAGE_CONTAINER_CLASSES,
  PAGE_HEADING_CLASSES,
} from "../utils/constants";
---

<Layout title={`New Page${TITLE_PAGE_SUFFIX}`}>
  <div class={PAGE_CONTAINER_CLASSES}>
    <h1 class={`${PAGE_HEADING_CLASSES} mb-12`}>New Page</h1>
    <!-- content here -->
  </div>
</Layout>
```

Then add `"new-page"` to `NAV_LINKS` in `src/utils/constants.ts` and update the `NavLink` type in `src/types/ui.ts`.

### Project thumbnails

Project card images are **not** loaded from external URLs at runtime. They live in `public/projects/` as optimized WebP files generated from `cv.json`.

When you add or update a project in `cv.json`:

1. Set `imageSource` to the full remote URL (screenshot source).
2. Run **`pnpm run images:projects`** — regenerates thumbnails and updates each project's `image` path.
3. Commit `cv.json`, `public/projects/*.webp`, and any new files from the script.

Re-run the script if you change `imageSource`, rename a project, or add a new entry.

### Reading cv.json

```astro
---
import { basics, work } from "@cv";
---

<p>{basics.name}</p>
<p>{basics.summary}</p>
```

### Scroll reveal animation

Add `class="reveal"` to any element for fade-in-up on scroll. Respects `prefers-reduced-motion`.

### Client-side script

```astro
<script>
  document.addEventListener("astro:page-load", () => {
    // runs after every navigation, including client-side transitions
  });
</script>
```

## Design tokens

```
Text:    text-text-primary | text-text-secondary | text-text-muted | text-text-accent
BG:      bg-bg-primary | bg-bg-secondary | bg-bg-muted
Border:  border-border-primary | border-border-secondary | border-border-muted
```

## Button variants & sizes

Variants: `primary` `secondary` `outline` `ghost` `simple` `icon`
Sizes: `sm` `md` (default) `lg` `icon`

## Components reference

| Component                    | What it renders                                        |
| ---------------------------- | ------------------------------------------------------ |
| `layout/Header.astro`        | Fixed nav with logo, desktop/mobile menu, theme toggle |
| `layout/Footer.astro`        | Copyright + social links from cv.json                  |
| `layout/CookieConsent.astro` | Consent-gated cookie banner + Umami loader trigger     |
| `layout/NextUpNav.astro`     | “Also explore” footer nav on about/work/projects       |
| `sections/WorkDates.astro`   | Shared formatted date range for work entries           |
| `brand/DgmLogoSimple.astro`  | SVG logo monogram. Props: `className`, `size`          |
| `brand/ThemeToggle.astro`    | Dark/light mode toggle button with sun/moon icons      |
| `ui/Button.astro`            | Polymorphic button/link with semantic token styles     |

## i18n

The site supports **CA** (default), **EN**, and **ES** via `LanguageToggle`. SSR HTML uses Catalan via `t()` from `src/utils/i18n.ts`. Translations live in `src/i18n/{ca,en,es}.ts` as flat `Record<string, string>`. Mark translatable nodes with `data-i18n="key"`. Language persists in `localStorage`.

Available languages are driven by `SUPPORTED_LANGUAGES` in `src/utils/constants.ts`:

```ts
import { SUPPORTED_LANGUAGES } from "../utils/constants";
// [{ code: "ca", label: "CA", default: true }, { code: "en", ... }, { code: "es", ... }]
```

## Useful helpers

```ts
// Get a typed social profile
import { getSocialProfile } from "../utils/socialLinks";
import type { SocialProfile } from "../types/ui";
const linkedin = getSocialProfile(profiles as SocialProfile[], "Linkedin");

// Format a date string from cv.json (default locale: Catalan)
import { formatDate } from "../utils/format";
formatDate("2023-03-01"); // → "març del 2023"
formatDate(undefined); // → "Actualitat"
formatDate("2023-03-01", "en"); // → "Mar 2023"
```

## Commands

```bash
pnpm run dev              # http://localhost:4321
pnpm run build            # astro check + production build
pnpm run preview          # serve dist/ locally
pnpm run lint             # ESLint
pnpm run format           # Prettier (write)
pnpm run format:check     # Prettier (CI — read-only)
pnpm run test             # Vitest
pnpm run images:projects  # regenerate public/projects/*.webp from cv.json (run after project changes)
```

## Before finishing (CI / deploy gate)

**Mandatory for AI agents.** After **any** change (code, markdown, config, assets, `README.md`, `AGENTS.md`, etc.), run the full CI block below and fix failures **before** saying the task is done. Do not hand work to the user with a red pipeline. Production deploys depend on a green build.

This is not optional polish — it is the release gate for `davidgimeno.cat`.

### Always run (same order as `.github/workflows/ci.yml`)

```bash
pnpm run format:check
pnpm run lint
pnpm run test
pnpm run build
```

If `format:check` fails (common after editing Markdown or `.astro` files), run `pnpm run format` and re-run `format:check` until it passes. Never leave Prettier warnings for CI to catch.

### Also run when dependencies change

When you touch `package.json` or `pnpm-lock.yaml` (matches `.github/workflows/security-audit.yml`):

```bash
pnpm audit --audit-level=high
```

Fix or explain any **high**-severity findings before finishing.

### Pull requests vs push to `main`

| Workflow             | Trigger             | What it runs                       |
| -------------------- | ------------------- | ---------------------------------- |
| `ci.yml`             | PR → `main`         | format:check · lint · test · build |
| `security-audit.yml` | PR → `main`, weekly | `pnpm audit --audit-level=high`    |
| `deploy.yml`         | push → `main`       | build + FTP deploy (cdmon)         |
| `deploy-pages.yml`   | push → `main`       | build + GitHub Pages deploy        |

Pushes to `main` skip `ci.yml` but still run both deploy workflows (`pnpm run build`). Run the full CI block locally before every push so production does not break.

**Done means:** all four CI commands exit 0 locally (plus audit when deps changed).

## Deployment

Two GitHub Actions pipelines deploy on every push to `main`:

- **`deploy.yml`** — builds and uploads `dist/` to cdmon via FTP. Requires secrets: `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`, `FTP_SERVER_DIR`.
- **`deploy-pages.yml`** — builds with `GITHUB_PAGES=true` env var (sets `base: "/dgm-website-astro"`) and deploys to GitHub Pages (`https://daliife.github.io/dgm-website-astro/`). Requires Pages source set to **GitHub Actions** in repo Settings.

Both pipelines use Node.js 24 and pnpm 9. Local development requires **Node.js ≥ 22.12.0** (see `.nvmrc` and `package.json` `engines`).

## Further reading

- `docs/architecture.md` — full architecture walkthrough
- `tailwind.config.mjs` — all design token definitions
- `src/utils/constants.ts` — typography scale, spacing, grid configs
