# Architecture Reference

Deep-dive reference for the dgm-website-astro codebase. Intended for developers and AI agents who need to understand the project's structure, data flow, and conventions in detail.

---

## Overview

Static personal portfolio hosted at [davidgimeno.cat](http://davidgimeno.cat). The build outputs plain HTML/CSS/JS — no server, no API, no runtime Node.js. All content is pre-rendered at build time from `cv.json`.

```
cv.json  →  Astro build  →  dist/  →  FTP upload  →  hosting server
```

The Vite dev server (`pnpm run dev`) provides HMR and a local preview. The production build runs `astro check` (TypeScript + Astro types) followed by `astro build`.

---

## Routing

Astro uses file-based routing. `src/pages/` maps directly to URLs:

| File                       | URL             |
| -------------------------- | --------------- |
| `src/pages/index.astro`    | `/`             |
| `src/pages/about.astro`    | `/about`        |
| `src/pages/projects.astro` | `/projects`     |
| `src/pages/work.astro`     | `/work`         |
| `src/pages/contact.astro`  | `/contact`      |
| `src/pages/404.astro`      | `/404`          |

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

- The full `<html>` shell with `lang="en"`
- All `<head>` content: charset, viewport, fonts, SEO meta, OG tags, Twitter cards, JSON-LD structured data
- Dark/light mode initialization (localStorage + `prefers-color-scheme`)
- Astro `<ClientRouter>` for View Transitions
- `<Header>` (persisted across navigations) and `<Footer>` (can be hidden with `hideFooter={true}`)
- Skip-to-content accessibility link
- Scroll-reveal animation system (`.reveal` class + Intersection Observer)
- Smooth theme transition CSS (background-color, border-color, color)
- `prefers-reduced-motion` support

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

| Token            | Light          | Dark           |
| ---------------- | -------------- | -------------- |
| `--text-primary` | `23 23 23`     | `250 250 250`  |
| `--bg-primary`   | `255 255 255`  | `10 10 10`     |
| `--border-primary` | `229 229 229` | `38 38 38`    |

**Never use raw palette classes** (`text-gray-900`, `bg-white`, etc.). Always use semantic tokens.

**Full token set:**

| Category   | Tokens                                                                            |
| ---------- | --------------------------------------------------------------------------------- |
| Text       | `text-text-primary`, `text-text-secondary`, `text-text-muted`, `text-text-accent` |
| Background | `bg-bg-primary`, `bg-bg-secondary`, `bg-bg-muted`                                 |
| Border     | `border-border-primary`, `border-border-secondary`, `border-border-muted`         |

### Font

**Inter Variable** — loaded via `@fontsource-variable/inter`. Configured in `tailwind.config.mjs` as default sans-serif.

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

| Component                        | Purpose                                                  |
| -------------------------------- | -------------------------------------------------------- |
| `brand/DgmLogoSimple.astro`      | SVG logo monogram. Props: `className`, `size`            |
| `brand/ThemeToggle.astro`        | Dark/light mode toggle button                            |
| `layout/Header.astro`            | Fixed nav: logo, desktop/mobile nav, theme toggle        |
| `layout/Footer.astro`            | Copyright + social links from cv.json                    |
| `ui/Button.astro`                | Polymorphic button/link component                        |

### Available but unused components

These were part of the previous design and remain available:

| Component                        | Purpose                                    |
| -------------------------------- | ------------------------------------------ |
| `layout/HomeContainer.astro`     | Full-viewport hero wrapper                 |
| `layout/PageContainer.astro`     | Max-width centered container               |
| `ui/Grid.astro`                  | Responsive CSS grid                        |
| `ui/Section.astro`               | Section with vertical spacing              |
| `ui/Typography.astro`            | Text with design-system scale              |
| `sections/Project.astro`         | Project card                               |
| `sections/Timeline.astro`        | Work experience container                  |
| `sections/TimelineItem.astro`    | Single work experience row                 |

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
- `Header` uses `transition:persist` to stay mounted across navigations.

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

### Commands

```bash
pnpm run dev          # http://localhost:4321
pnpm run build        # astro check + production build
pnpm run preview      # serve dist/ locally
pnpm run lint         # ESLint
pnpm run format       # Prettier
```

Output goes to `dist/`. Deployment is currently manual via FTP.

### URL resolution

`astro.config.mjs` sets `site` dynamically:

- During `astro build` (detected via `process.argv.includes("build")`): uses `LIVE_URL` (`http://davidgimeno.cat`)
- During dev: uses `http://localhost:4321`

---

## TypeScript

`tsconfig.json` extends Astro's strict TypeScript preset. Key path alias:

```json
"@cv": ["./cv.json"]
```

Shared types live in `src/types/ui.ts`: `ButtonVariant`, `ButtonSize`, `NavLink`.

---

## Linting & Formatting

| Tool     | Config            | Command                                   |
| -------- | ----------------- | ----------------------------------------- |
| ESLint   | `eslint.config.*` | `npm run lint` / `npm run lint:fix`       |
| Prettier | `.prettierrc`     | `npm run format` / `npm run format:check` |

Both tools support `.astro` files via their respective plugins (`eslint-plugin-astro`, Prettier Astro plugin).
