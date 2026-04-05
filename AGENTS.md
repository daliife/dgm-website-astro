# AGENTS.md — AI Agent Context

This file provides context for AI coding agents (OpenAI Codex, Claude, Gemini, etc.) working on this repository.

## What is this project?

Personal portfolio website for David Gimeno. Static site built with Astro 5, TypeScript, Tailwind CSS, and React islands. Hosted at [davidgimeno.cat](http://davidgimeno.cat). Deployed automatically via GitHub Actions on every push to `main` (FTP to cdmon + GitHub Pages).

## Non-negotiable constraints

Before writing any code, internalize these rules:

| Constraint    | Rule                                                                                                                     |
| ------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Theme         | **Dark/light mode via toggle.** `ThemeToggle.astro` handles switching. Theme persists in `localStorage`.                 |
| Styling       | **Tailwind utilities only.** No inline styles, no CSS modules, no custom stylesheets.                                    |
| Color tokens  | Use **semantic tokens** (`text-text-primary`, `bg-bg-secondary`, etc.) — never raw palette classes like `text-gray-900`. |
| Content       | All personal data lives in **`cv.json`**. Never hardcode names, dates, job titles, or project info in components.        |
| Interactivity | **`.astro` components first.** Use React only when client-side state or hooks are strictly necessary.                    |
| Navigation    | Routes are driven by `NAV_LINKS` in `src/utils/constants.ts`. New pages need an entry there and a file in `src/pages/`.  |
| Buttons/links | **Always use `<Button>`** component for interactive UI elements. Pass `href` for links, omit for buttons.                |
| Scripts       | Use `astro:page-load` event, **not** `DOMContentLoaded` (broken with View Transitions).                                  |
| Package mgr   | **pnpm only.** Do not use npm or yarn.                                                                                   |

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
    layout/                ← Header, Footer
    sections/              ← ProjectCard, WorkCard
    ui/                    ← Button, Grid, Section, Typography
  i18n/
    ca.ts                  ← Catalan translations (flat Record<string, string>)
    es.ts                  ← Spanish translations
  pages/                   ← File-based routes (index, about, projects, work, contact, 404)
  tests/
    components/            ← AstroContainer unit tests per component
    pages/                 ← Route existence tests
    utils/                 ← Utility function tests
  types/ui.ts              ← ButtonVariant, ButtonSize, NavLink, SocialProfile, CV entry types
  utils/
    constants.ts           ← NAV_LINKS, PAGE_CONTAINER_CLASSES, PAGE_HEADING_CLASSES, SUPPORTED_LANGUAGES, typography/grid scale
    format.ts              ← formatDate() helper
    socialLinks.ts         ← getSocialProfile() helper
docs/
  architecture.md          ← Deep-dive architecture reference
AGENTS.md                  ← This file
.github/
  copilot-instructions.md  ← GitHub Copilot custom instructions
  workflows/
    deploy.yml             ← Auto-deploy to cdmon via FTP (triggers on push to main)
    deploy-pages.yml       ← Auto-deploy to GitHub Pages with GITHUB_PAGES=true (triggers on push to main)
```

## How to add things

### New page

```astro
---
// src/pages/new-page.astro
import Layout from "../layouts/Layout.astro";
import { TITLE_PAGE_PREFIX, PAGE_CONTAINER_CLASSES, PAGE_HEADING_CLASSES } from "../utils/constants";
---
<Layout title={`${TITLE_PAGE_PREFIX}New Page`}>
  <div class={PAGE_CONTAINER_CLASSES}>
    <h1 class={`${PAGE_HEADING_CLASSES} mb-12`}>New Page</h1>
    <!-- content here -->
  </div>
</Layout>
```

Then add `"new-page"` to `NAV_LINKS` in `src/utils/constants.ts` and update the `NavLink` type in `src/types/ui.ts`.

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

| Component                   | What it renders                                        |
| --------------------------- | ------------------------------------------------------ |
| `layout/Header.astro`       | Fixed nav with logo, desktop/mobile menu, theme toggle |
| `layout/Footer.astro`       | Copyright + social links from cv.json                  |
| `brand/DgmLogoSimple.astro` | SVG logo monogram. Props: `className`, `size`          |
| `brand/ThemeToggle.astro`   | Dark/light mode toggle button with sun/moon icons      |
| `ui/Button.astro`           | Polymorphic button/link with semantic token styles     |

## i18n

The site supports EN (default), ES, and CA via `LanguageToggle`. Translations in `src/i18n/ca.ts` and `src/i18n/es.ts` are flat `Record<string, string>`. In templates use `data-i18n="key"` attributes. Language is persisted in `localStorage`.

Available languages are driven by `SUPPORTED_LANGUAGES` in `src/utils/constants.ts`:

```ts
import { SUPPORTED_LANGUAGES } from "../utils/constants";
// [{ code: "en", label: "EN", default: true }, { code: "es", ... }, { code: "ca", ... }]
```

## Useful helpers

```ts
// Get a typed social profile
import { getSocialProfile } from "../utils/socialLinks";
import type { SocialProfile } from "../types/ui";
const linkedin = getSocialProfile(profiles as SocialProfile[], "Linkedin");

// Format a date string from cv.json
import { formatDate } from "../utils/format";
formatDate("2023-03-01"); // → "Mar 2023"
formatDate(undefined); // → "Present"
```

## Commands

```bash
pnpm run dev          # http://localhost:4321
pnpm run build        # astro check + production build
pnpm run preview      # serve dist/ locally
pnpm run lint         # ESLint
pnpm run format       # Prettier
```

## Deployment

Two GitHub Actions pipelines deploy on every push to `main`:

- **`deploy.yml`** — builds and uploads `dist/` to cdmon via FTP. Requires secrets: `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`, `FTP_SERVER_DIR`.
- **`deploy-pages.yml`** — builds with `GITHUB_PAGES=true` env var (sets `base: "/dgm-website-astro"`) and deploys to GitHub Pages (`https://daliife.github.io/dgm-website-astro/`). Requires Pages source set to **GitHub Actions** in repo Settings.

Both pipelines use Node.js 24 and pnpm 9.

## Further reading

- `docs/architecture.md` — full architecture walkthrough
- `tailwind.config.mjs` — all design token definitions
- `src/utils/constants.ts` — typography scale, spacing, grid configs
