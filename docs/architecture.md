# Architecture Reference

Deep-dive reference for the dgm-website-astro codebase. Intended for developers and AI agents who need to understand the project's structure, data flow, and conventions in detail.

---

## Overview

Static personal portfolio hosted at [davidgimeno.cat](http://davidgimeno.cat). Built with **Astro 6** (Vite 8). The build outputs plain HTML/CSS/JS — no server, no API, no runtime Node.js. All content is pre-rendered at build time from `cv.json`.

```
cv.json  →  Astro build  →  dist/  →  FTP upload  →  hosting server
```

The Vite dev server (`pnpm run dev`) provides HMR and a local preview. The production build runs `astro check` (TypeScript + Astro types) followed by `astro build`.

---

## Routing

Astro uses file-based routing. `src/pages/` maps directly to URLs:

| File                       | URL         |
| -------------------------- | ----------- |
| `src/pages/index.astro`    | `/`         |
| `src/pages/about.astro`    | `/about`    |
| `src/pages/projects.astro` | `/projects` |
| `src/pages/work.astro`     | `/work`     |
| `src/pages/contact.astro`  | `/contact`  |
| `src/pages/404.astro`      | `/404`      |

Navigation links are defined in `src/utils/constants.ts → NAV_LINKS`: `["about", "projects", "work", "contact"]`. This array drives the `<Header>` nav. Adding a page requires:

1. A file in `src/pages/`.
2. An entry in `NAV_LINKS` (only if the page should appear in the nav).

---

## Content Architecture

`cv.json` is the **single source of truth** for all personal content. It uses the [JSON Resume](https://jsonresume.org/) schema (loosely). Key top-level keys:

| Key         | Contents                                                                                |
| ----------- | --------------------------------------------------------------------------------------- |
| `basics`    | `name`, `lastName`, `label`, `summary`, `email`, `profiles[]`                           |
| `work`      | Array of jobs: `company`, `position`, `startDate`, `endDate`, `summary`, `highlights[]` |
| `projects`  | Array of projects: `name`, `description`, `url`, `highlights[]`, `technologies[]`       |
| `skills`    | Array of skill groups                                                                   |
| `education` | Array of education entries                                                              |
| `languages` | Array of languages with fluency                                                         |

Pages import it directly in the Astro frontmatter:

```astro
---
import { basics, work } from "@cv";
---
```

The `@cv` path alias is configured in `tsconfig.json`.

---

## Layout System

### `Layout.astro`

Every page must be wrapped in `<Layout>`. It provides:

- The full `<html>` shell with `lang="ca"` (default locale)
- All `<head>` content: charset, viewport, fonts, SEO meta, OG tags, Twitter cards, JSON-LD structured data
- Dark/light mode initialization (localStorage + `prefers-color-scheme`)
- Astro `<ClientRouter>` for View Transitions with prefetch on hover
- `<Header>` (persisted across navigations) and `<Footer>` (can be hidden with `hideFooter={true}`)
- Skip-to-content accessibility link
- Scroll-reveal animation system (`.reveal` class + Intersection Observer)
- `prefers-reduced-motion` support
- Mobile: page transitions disabled via `@media (max-width: 767px)` CSS override

Props:

```ts
{
  title: string;           // required — "DGM | Page Title"
  description?: string;    // defaults to portfolio description
  image?: string;          // OG image (defaults to profile photo)
  imageWidth?: number;     // OG image width (default: 400)
  imageHeight?: number;    // OG image height (default: 500)
  type?: string;           // OG type (defaults to "website")
  hideFooter?: boolean;    // for full-viewport pages like the home hero
}
```

---

## Dark / Light Mode

The theme system supports both dark and light modes:

1. An `is:inline` script in `<head>` runs **before render** to prevent FOUC. It checks `localStorage("theme")`, then falls back to `prefers-color-scheme: dark`.
2. On `astro:after-swap` (View Transitions), the same check re-applies the class.
3. `ThemeToggle.astro` provides a sun/moon icon button that toggles `.dark` on `<html>` and persists the choice to `localStorage`.
4. CSS custom properties in `:root` and `.dark` define all color tokens. A global transition (0.3s) on `background-color`, `border-color`, and `color` ensures smooth theme switching.

Tailwind is configured with `darkMode: "class"`.

---

## Design System

### Color tokens

Semantic color tokens are defined as CSS custom property references in `tailwind.config.mjs`:

```js
"text-primary":    "rgb(var(--text-primary) / <alpha-value>)"
"bg-primary":      "rgb(var(--bg-primary) / <alpha-value>)"
"border-primary":  "rgb(var(--border-primary) / <alpha-value>)"
```

Values are set in `Layout.astro` `<style>`:

| Token              | Light         | Dark          |
| ------------------ | ------------- | ------------- |
| `--text-primary`   | `23 23 23`    | `250 250 250` |
| `--bg-primary`     | `255 255 255` | `10 10 10`    |
| `--border-primary` | `229 229 229` | `38 38 38`    |

**Never use raw palette classes** (`text-gray-900`, `bg-white`, etc.). Always use semantic tokens.

**Full token set:**

| Category   | Tokens                                                                            |
| ---------- | --------------------------------------------------------------------------------- |
| Text       | `text-text-primary`, `text-text-secondary`, `text-text-muted`, `text-text-accent` |
| Background | `bg-bg-primary`, `bg-bg-secondary`, `bg-bg-muted`                                 |
| Border     | `border-border-primary`, `border-border-secondary`, `border-border-muted`         |

### Font

**Inter Variable** — loaded via `src/styles/fonts.css` with two subsets only:

- `inter-latin-wght-normal.woff2` — covers basic Latin (covers ~99% of portfolio content)
- `inter-latin-ext-wght-normal.woff2` — covers extended Latin (diacritics for Catalan/Spanish)

All other subsets (Cyrillic, Greek, Vietnamese) are excluded to reduce download size.
The Latin woff2 is preloaded via `<link rel="preload">` in `Layout.astro` to eliminate FOIT.
`font-display: swap` is set on both `@font-face` rules.

### Scroll reveal

Add `class="reveal"` to any element to get a fade-in-up animation on scroll. Handled by an `IntersectionObserver` in `Layout.astro`. Respects `prefers-reduced-motion`.

---

## Component Structure

Components are organized into four subdirectories:

```
src/components/
  brand/          ← Logo, ThemeToggle
  layout/         ← Header, Footer, HomeContainer, PageContainer
  sections/       ← Project, Timeline, TimelineItem (legacy, not currently used)
  ui/             ← Button, Grid, Section, Typography
```

### Active components

| Component                    | Purpose                                                     |
| ---------------------------- | ----------------------------------------------------------- |
| `brand/DgmLogoSimple.astro`  | SVG logo monogram. Props: `className`, `size`               |
| `brand/ThemeToggle.astro`    | Dark/light mode toggle button                               |
| `brand/LanguageToggle.astro` | EN/CA language switcher dropdown (client-side i18n)         |
| `layout/Header.astro`        | Fixed nav: logo (left), nav links (centre), toggles (right) |
| `layout/Footer.astro`        | Copyright + social links from cv.json                       |
| `ui/Button.astro`            | Polymorphic button/link component                           |

### Available but unused components

These were part of the previous design and remain available:

| Component                     | Purpose                       |
| ----------------------------- | ----------------------------- |
| `layout/HomeContainer.astro`  | Full-viewport hero wrapper    |
| `layout/PageContainer.astro`  | Max-width centered container  |
| `ui/Grid.astro`               | Responsive CSS grid           |
| `ui/Section.astro`            | Section with vertical spacing |
| `ui/Typography.astro`         | Text with design-system scale |
| `sections/Project.astro`      | Project card                  |
| `sections/Timeline.astro`     | Work experience container     |
| `sections/TimelineItem.astro` | Single work experience row    |

---

## Hydration Strategy

By default, **every component in this project is zero-JS** — pure `.astro` components that render to static HTML. React is reserved for cases where client-side state or browser hooks are genuinely necessary.

### Astro hydration directives

When a React (`.tsx`) island is needed, choose the directive based on when the component must become interactive:

| Directive             | When to use                                        | Examples                                   |
| --------------------- | -------------------------------------------------- | ------------------------------------------ |
| `client:load`         | Must be interactive immediately on page load       | Auth forms, critical input fields          |
| `client:visible`      | Can wait until the element enters the viewport     | Charts, carousels, below-the-fold widgets  |
| `client:idle`         | Non-critical — hydrate once the browser is idle    | Analytics dashboards, low-priority widgets |
| `client:only="react"` | Component cannot SSR (uses `window`, browser APIs) | Map embeds, canvas-based components        |

### Current React islands

There are currently **no React islands** in this project. All interactive UI (theme toggle, language toggle, mobile menu) is implemented with vanilla JS inside `.astro` `<script>` tags.

### Guidelines

- Prefer `.astro` + vanilla JS for simple toggle/show-hide interactions.
- Only introduce a React island if the component needs `useState`, `useEffect`, or a third-party React library.
- Prefer `client:visible` over `client:load` for below-the-fold content to avoid blocking the main thread.
- Never use `client:load` for decorative or non-critical elements.

---

## Internationalisation (i18n)

The site supports **Catalan** (default SSR), **English**, and **Spanish** via a lightweight client-side system — no build-time routes, no URL prefixes.

### How it works

1. Translatable strings use `data-i18n="key"` and SSR fallback text from `t(key)` in `src/utils/i18n.ts` (Catalan).
2. `LanguageToggle.astro` renders a CA/EN/ES dropdown in desktop nav and mobile menu.
3. On language change, `applyI18n()` in `src/utils/i18n-client.ts` updates `[data-i18n]` nodes for non-default locales.
4. On first paint with the default locale (CA), DOM text updates are skipped for performance; dates and chrome still sync.
5. The selected language is persisted in `localStorage("lang")` and re-applied on `astro:page-load`.
6. `document.documentElement.lang` is updated to `"ca"`, `"en"`, or `"es"` accordingly.

### Translation keys

Keys use dot notation: `ui.*` for static UI strings, `basics.*` / `work.*` for cv.json content.

```ts
// src/i18n/ca.ts
export const CA: Record<string, string> = {
  "ui.nav.about": "Sobre mi",
  "ui.nav.work": "Experiència",
  // ...
};
```

### Adding a translatable string

```astro
<!-- in any .astro page or component -->
<h1 data-i18n="ui.page.about">About</h1>
```

Then add the Catalan translation to `src/i18n/ca.ts`.

---

## `Button.astro`

The universal interactive element. Renders either `<button>` or `<a>` depending on the `href` prop.

```ts
Props {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "simple" | "icon"
  size?:    "sm" | "md" | "lg" | "icon"
  href?:    string          // renders <a> when present
  target?:  string
  rel?:     string
  disabled?: boolean
  className?: string
}
```

All variant styles use semantic tokens (no raw color classes).

---

## Accessibility

- **Skip-to-content link** in Layout.astro
- **Semantic landmarks**: `<nav>`, `<main>`, `<footer>`, `<article>`, `<section>`
- **ARIA attributes**: `aria-label` on icon buttons, `aria-current="page"` on active nav, `aria-expanded`/`aria-controls` on mobile menu, `aria-modal` on menu dialog
- **Focus management**: Global `*:focus-visible` outline, focus moves to close button on menu open, returns to menu button on close
- **Focus trap** in mobile menu (Tab/Shift+Tab cycles through focusable elements)
- **Escape key** closes mobile menu
- **`prefers-reduced-motion`**: All animations and transitions disabled
- **Image alt text**: Descriptive alt on profile photo

---

## View Transitions

The project uses Astro's built-in `<ClientRouter>`. Key consequences:

- `DOMContentLoaded` **does not re-fire** on client-side navigation. Use `astro:page-load` instead.
- `astro:after-swap` fires after the new page DOM is in place. Used for theme re-application.
- `<Header>` uses `transition:persist` to stay mounted across navigations.
- **Prefetch on hover**: `astro.config.mjs` sets `prefetch: { prefetchAll: true, defaultStrategy: "hover" }`. Pages are pre-fetched when the user hovers a nav link, making navigation near-instant.
- **Mobile**: page transitions are disabled via CSS (`@media (max-width: 767px)`) for snappier feel — both the View Transitions API path (`::view-transition-*`) and the JS fallback path (`[data-astro-transition-fallback]`).

---

## SEO & Structured Data

`Layout.astro` emits full SEO metadata:

- Standard meta tags (description, author, robots, language)
- Open Graph tags (type, url, title, description, image, site_name)
- Twitter card tags
- JSON-LD `Person` schema
- Canonical URL via `<link rel="canonical">`
- `<meta name="theme-color">` with media queries for light/dark
- Sitemap generated by `@astrojs/sitemap`

---

## Build & Deployment

### CI gate (before PR or push to `main`)

Run locally in this order — same as `.github/workflows/ci.yml`:

```bash
pnpm run format:check   # `pnpm run format` then re-check if it fails
pnpm run lint
pnpm run test
pnpm run build
```

After dependency changes (`package.json`, `pnpm-lock.yaml`):

```bash
pnpm audit --audit-level=high
```

| Workflow             | Trigger             | Checks                             |
| -------------------- | ------------------- | ---------------------------------- |
| `ci.yml`             | PR → `main`         | format:check · lint · test · build |
| `security-audit.yml` | PR → `main`, weekly | `pnpm audit --audit-level=high`    |
| `deploy.yml`         | push → `main`       | build + FTP deploy                 |
| `deploy-pages.yml`   | push → `main`       | build + GitHub Pages deploy        |

Pushes to `main` skip `ci.yml` but both deploy workflows run `pnpm run build`. Always run the full CI block locally before push.

See also [AGENTS.md](../AGENTS.md) § “Before finishing (CI / deploy gate)”.

### Commands

```bash
pnpm run dev           # http://localhost:4321
pnpm run build         # astro check + production build
pnpm run preview       # serve dist/ locally
pnpm run lint          # ESLint
pnpm run format        # Prettier (write)
pnpm run format:check  # Prettier (CI — read-only)
pnpm run test          # Vitest (run once)
pnpm run test:watch    # Vitest (watch mode)
pnpm run test:coverage # Vitest + v8 coverage
```

Output goes to `dist/`. Deployment is fully automated via GitHub Actions on every push to `main`:

- **`deploy.yml`** — builds and uploads `dist/` to cdmon via FTP. Requires secrets: `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`, `FTP_SERVER_DIR`.
- **`deploy-pages.yml`** — builds and deploys to GitHub Pages. Requires Pages source set to **GitHub Actions** in repo Settings.
- **`security-audit.yml`** — runs `pnpm audit --audit-level=high` on push/PR to `main` and on a weekly schedule (Mondays 08:00 UTC).

All pipelines use Node.js 24 and pnpm (version read from `packageManager` field in `package.json`). Astro 6 requires Node.js ≥ 22.12.0 locally (see `.nvmrc`).

### URL resolution

`astro.config.mjs` sets `site` dynamically:

- During `astro build` (detected via `process.argv.includes("build")`): uses `LIVE_URL` (`http://davidgimeno.cat`)
- During dev: uses `http://localhost:4321`

---

## Testing

Unit tests use **Vitest** with Astro's `experimental_AstroContainer` for SSR rendering.

```
src/tests/
  components/
    Button.test.ts         — polymorphic rendering, variants, props
    Header.test.ts         — nav links, data-i18n, LanguageToggle, mobile menu
    LanguageToggle.test.ts — ARIA attributes, EN/CA options, listbox role
    ProjectCard.test.ts    — name, URL, image fallback, technologies
    WorkCard.test.ts       — position, dates, highlights
  pages/
    routes.test.ts         — all 6 pages render, HTML structure, data-i18n keys
```

Configuration in `vitest.config.ts` (uses `getViteConfig` from `astro/config`).

---

## TypeScript

`tsconfig.json` extends Astro's strict TypeScript preset. Key path alias:

```json
"@cv": ["./cv.json"]
```

Shared types live in `src/types/ui.ts`: `ButtonVariant`, `ButtonSize`, `NavLink`.

Side-effect imports without types (e.g. font packages) are declared in `src/env.d.ts`.

---

## Linting & Formatting

| Tool     | Config            | Command                                     |
| -------- | ----------------- | ------------------------------------------- |
| ESLint   | `eslint.config.*` | `pnpm run lint` / `pnpm run lint:fix`       |
| Prettier | `.prettierrc`     | `pnpm run format` / `pnpm run format:check` |

Both tools support `.astro` files via their respective plugins (`eslint-plugin-astro`, Prettier Astro plugin).
