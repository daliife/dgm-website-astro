# GitHub Copilot Instructions

This file is automatically loaded by GitHub Copilot when working in this repository.

## Project

Personal portfolio for David Gimeno Mañé — a static Astro 5 site hosted at [davidgimeno.cat](http://davidgimeno.cat). TypeScript + Tailwind CSS + React islands. Deployed automatically via GitHub Actions on push to `main` (FTP to cdmon via `deploy.yml`, GitHub Pages via `deploy-pages.yml`). Both pipelines use Node.js 24 + pnpm 9.

## Hard rules — never break these

- **Dark/light mode via toggle.** `ThemeToggle.astro` handles switching. Theme persists in `localStorage`. Do not switch to dark-mode-only.
- **No custom CSS.** Use Tailwind utility classes exclusively. Exception: CSS custom property definitions in Layout.astro or configs.
- **Use semantic color tokens**, not raw palette classes. E.g. `text-text-primary` not `text-gray-900`. Tokens are defined in `tailwind.config.mjs`.
- **`cv.json` is the single content source.** Do not hardcode bio, job titles, dates, project names, or any personal data inside components.
- **`<Button>` for all interactive elements.** It is polymorphic — pass `href` for links, omit for `<button>`. Variants: `primary | secondary | outline | ghost | simple | icon`. Sizes: `sm | md | lg | icon`.
- **Prefer `.astro` components.** Use React only when client-side state/hooks are genuinely necessary.
- **View Transitions.** The project uses Astro's `ClientRouter`. Use `astro:page-load` for init scripts, not `DOMContentLoaded`.
- **pnpm only.** Do not use npm or yarn.

## Patterns to follow

### Creating a page

```astro
---
import Layout from "../layouts/Layout.astro";
import { TITLE_PAGE_PREFIX, PAGE_CONTAINER_CLASSES, PAGE_HEADING_CLASSES } from "../utils/constants";
---

<Layout title={`${TITLE_PAGE_PREFIX}Page Title`}>
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

The site supports EN (default), ES, and CA. Add `data-i18n="key"` to any element that needs translation. Add the key to both `src/i18n/ca.ts` and `src/i18n/es.ts`. Available languages are driven by `SUPPORTED_LANGUAGES` in `constants.ts` — add a new entry there to expose a new language in the toggle.

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

| File                                        | Purpose                                                                                                     |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `cv.json`                                   | All personal content                                                                                        |
| `src/layouts/Layout.astro`                  | Root HTML shell, SEO, theme, fonts, scroll reveal                                                           |
| `src/components/brand/ThemeToggle.astro`    | Dark/light mode toggle                                                                                      |
| `src/components/brand/LanguageToggle.astro` | EN/ES/CA language switcher, driven by `SUPPORTED_LANGUAGES`                                                 |
| `src/components/layout/Header.astro`        | Fixed nav with logo, links, theme + language toggles                                                        |
| `src/components/layout/Footer.astro`        | Copyright + social links from cv.json                                                                       |
| `src/components/ui/Button.astro`            | Universal button/link component                                                                             |
| `src/utils/constants.ts`                    | `NAV_LINKS`, `PAGE_CONTAINER_CLASSES`, `PAGE_HEADING_CLASSES`, `SUPPORTED_LANGUAGES`, typography/grid scale |
| `src/utils/format.ts`                       | `formatDate()` — formats cv.json date strings                                                               |
| `src/utils/socialLinks.ts`                  | `getSocialProfile()` — typed helper to find a social profile                                                |
| `src/i18n/ca.ts`, `src/i18n/es.ts`          | Client-side translations as flat `Record<string, string>`                                                   |
| `tailwind.config.mjs`                       | Design tokens and color palette                                                                             |
| `astro.config.mjs`                          | Integrations, Vite, site URL, GitHub Pages base path                                                        |
| `src/types/ui.ts`                           | `ButtonVariant`, `ButtonSize`, `NavLink`, `SocialProfile`, CV entry types                                   |
| `.github/workflows/deploy.yml`              | CI/CD: build + FTP deploy to cdmon on push to main                                                          |
| `.github/workflows/deploy-pages.yml`        | CI/CD: build with `GITHUB_PAGES=true` + deploy to GitHub Pages                                              |

## Design tokens reference

```
Text:        text-text-primary  text-text-secondary  text-text-muted  text-text-accent
Background:  bg-bg-primary      bg-bg-secondary      bg-bg-muted
Border:      border-border-primary  border-border-secondary  border-border-muted
```

Font family: **Inter** (variable). Loaded via `@fontsource-variable/inter`.

## Architecture context

See [docs/architecture.md](../docs/architecture.md) for in-depth reference.
