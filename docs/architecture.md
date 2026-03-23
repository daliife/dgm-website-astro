# Architecture Reference

Deep-dive reference for the dgm-website-astro codebase. Intended for developers and AI agents who need to understand the project's structure, data flow, and conventions in detail.

---

## Overview

Static personal portfolio hosted at [davidgimeno.cat](http://davidgimeno.cat). The build outputs plain HTML/CSS/JS — no server, no API, no runtime Node.js. All content is pre-rendered at build time from `cv.json`.

```
cv.json  →  Astro build  →  dist/  →  FTP upload  →  hosting server
```

The Vite dev server (`npm run dev`) provides HMR and a local preview. The production build runs `astro check` (TypeScript + Astro types) followed by `astro build`.

---

## Routing

Astro uses file-based routing. `src/pages/` maps directly to URLs:

| File                        | URL                               |
| --------------------------- | --------------------------------- |
| `src/pages/index.astro`     | `/`                               |
| `src/pages/about.astro`     | `/about`                          |
| `src/pages/projects.astro`  | `/projects`                       |
| `src/pages/work.astro`      | `/work`                           |
| `src/pages/404.astro`       | `/404` (error page)               |
| `src/pages/about-alt.astro` | `/about-alt` (WIP / experimental) |

Navigation links are defined in `src/utils/constants.ts → NAV_LINKS`. This array drives both the `<Header>` nav and any programmatic navigation. Adding a page requires:

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

Pages import it directly in the Astro frontmatter:

```astro
---
import cv from "../../cv.json";
// or via the path alias
import { basics, work } from "@cv";
---
```

The `@cv` path alias is configured in `tsconfig.json`.

---

## Layout System

### `Layout.astro`

Every page must be wrapped in `<Layout>`. It provides:

- The full `<html>` shell with `lang="en"`
- All `<head>` content: charset, viewport, fonts, SEO meta, OG tags, Twitter cards, JSON-LD structured data
- Dark mode initialization (unconditional `classList.add("dark")`)
- Astro `<ClientRouter>` for View Transitions
- `<Header>` and `<Footer>` (Footer can be hidden with `hideFooter={true}`)
- Skip-to-content accessibility link

Props:

```ts
{
  title: string;           // required — "DGM | Page Title"
  description?: string;    // defaults to portfolio description
  image?: string;          // OG image (defaults to profile photo)
  type?: string;           // OG type (defaults to "website")
  hideFooter?: boolean;    // for full-viewport pages like the home hero
}
```

### Page containers

| Component             | Purpose                                                                       |
| --------------------- | ----------------------------------------------------------------------------- |
| `PageContainer.astro` | Standard content pages. Max-width centered container with top/bottom padding. |
| `HomeContainer.astro` | Full-viewport hero wrapper for the index page.                                |

---

## Dark Mode

Dark mode is always active. The `dark` class is added to `<html>` unconditionally by a `<script is:inline>` in `Layout.astro`, and re-applied on every View Transition swap via `astro:after-swap`.

```js
document.documentElement.classList.add("dark");
document.addEventListener("astro:after-swap", () => {
  document.documentElement.classList.add("dark");
});
```

Tailwind is configured with `darkMode: "class"`. All `dark:` variants apply because the `dark` class is always present. There is no toggle button and no `localStorage` theme persistence.

---

## Design System

### Color tokens

Semantic color tokens are defined as CSS custom property references in `tailwind.config.mjs`:

```js
"text-primary":    "rgb(var(--text-primary) / <alpha-value>)"
"bg-primary":      "rgb(var(--bg-primary) / <alpha-value>)"
"border-primary":  "rgb(var(--border-primary) / <alpha-value>)"
// ... etc.
```

The actual CSS variable values are defined in the global stylesheet. Always use these tokens instead of raw palette classes.

**Full token set:**

| Category   | Tokens                                                                            |
| ---------- | --------------------------------------------------------------------------------- |
| Text       | `text-text-primary`, `text-text-secondary`, `text-text-muted`, `text-text-accent` |
| Background | `bg-bg-primary`, `bg-bg-secondary`, `bg-bg-muted`                                 |
| Border     | `border-border-primary`, `border-border-secondary`, `border-border-muted`         |

### Typography scale

Defined in `src/utils/constants.ts → TYPOGRAPHY`. Provides responsive Tailwind class sets per heading level:

```ts
TYPOGRAPHY.H1.MOBILE; // "text-3xl"
TYPOGRAPHY.H1.LG; // "lg:text-6xl"
```

Used by `Typography.astro` — pass `variant="h1"` etc. to apply the scale automatically.

### Spacing

`SPACING.SECTION` provides consistent vertical section margins across breakpoints.

### Grid configs

`GRID_SYSTEMS` in `constants.ts` defines responsive column configurations for different content types (e.g. `projects`).

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
  // + aria-label, aria-expanded, aria-controls, id, onclick, data-collapse-toggle
}
```

All button styles are defined inline in the component's `variantClasses` and `sizeClasses` records. The `buttonStyles.ts` utility file exists as a helper but `Button.astro` has its own self-contained style logic.

---

## View Transitions

The project uses Astro's built-in `<ClientRouter>` (wraps the browser View Transitions API with a fallback). Key consequences:

- `DOMContentLoaded` **does not re-fire** on client-side navigation. Use `astro:page-load` instead.
- `astro:after-swap` fires after the new page DOM is in place (before `astro:page-load`). Used for light-weight re-initialisation (e.g. re-applying dark mode).
- Any `<script>` in a page component runs on initial load and after each navigation.

Pattern for client-side init:

```astro
<script>
  document.addEventListener("astro:page-load", () => {
    // safe to query DOM here
  });
</script>
```

---

## SEO & Structured Data

`Layout.astro` emits full SEO metadata:

- Standard meta tags (description, author, robots, language)
- Open Graph tags (type, url, title, description, image, site_name)
- Twitter card tags
- JSON-LD `Person` schema with `name`, `jobTitle`, `url`, `image`, `sameAs`, `worksFor`, `address`
- Canonical URL via `<link rel="canonical">`
- Sitemap generated by `@astrojs/sitemap` at build time

---

## Build & Deployment

### Local build

```bash
npm run build  # runs: astro check && astro build
```

Output goes to `dist/`. `astro check` validates TypeScript and Astro component types before building.

### Deployment

Currently manual: run `npm run build`, then upload the contents of `dist/` to the hosting server via FTP.

**Future:** automate with a CI/CD pipeline (e.g. GitHub Actions) that builds on push to `main` and deploys via FTP using a secret-based action such as `SamKirkland/FTP-Deploy-Action`.

### URL resolution

`astro.config.mjs` sets `site` dynamically:

- During `astro build`: uses `LIVE_URL` (`http://davidgimeno.cat`)
- During dev: uses `http://localhost:4321`

Detection is based on `process.env.npm_lifecycle_script`.

---

## TypeScript

`tsconfig.json` extends Astro's strict TypeScript preset. Key path alias:

```json
"@cv": ["./cv.json"]
```

Shared types live in `src/types/ui.ts`: `ButtonVariant`, `ButtonSize`, `BaseButtonProps`, `LinkButtonProps`.

---

## Linting & Formatting

| Tool     | Config            | Command                                   |
| -------- | ----------------- | ----------------------------------------- |
| ESLint   | `eslint.config.*` | `npm run lint` / `npm run lint:fix`       |
| Prettier | `.prettierrc`     | `npm run format` / `npm run format:check` |

Both tools support `.astro` files via their respective plugins (`eslint-plugin-astro`, Prettier Astro plugin).
