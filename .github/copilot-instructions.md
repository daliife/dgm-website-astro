# GitHub Copilot Instructions

This file is automatically loaded by GitHub Copilot when working in this repository.

## Project

Personal portfolio for David Gimeno — a static Astro 5 site hosted at [davidgimeno.cat](http://davidgimeno.cat). TypeScript + Tailwind CSS + React islands. Built locally with `pnpm run build` and deployed manually via FTP.

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
import { TITLE_PAGE_PREFIX } from "../utils/constants";
---

<Layout title={`${TITLE_PAGE_PREFIX}Page Title`}>
  <div class="max-w-5xl mx-auto px-6 pt-32 pb-20">
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

| File                                     | Purpose                                              |
| ---------------------------------------- | ---------------------------------------------------- |
| `cv.json`                                | All personal content                                 |
| `src/layouts/Layout.astro`               | Root HTML shell, SEO, theme, fonts, scroll reveal    |
| `src/components/brand/ThemeToggle.astro` | Dark/light mode toggle                               |
| `src/components/layout/Header.astro`     | Fixed nav with logo, links, theme toggle             |
| `src/components/layout/Footer.astro`     | Copyright + social links                             |
| `src/components/ui/Button.astro`         | Universal button/link component                      |
| `src/utils/constants.ts`                 | `NAV_LINKS`, typography scale, spacing, grid configs |
| `tailwind.config.mjs`                    | Design tokens and color palette                      |
| `astro.config.mjs`                       | Integrations, Vite, site URL                         |
| `src/types/ui.ts`                        | `ButtonVariant`, `ButtonSize`, `NavLink`             |

## Design tokens reference

```
Text:        text-text-primary  text-text-secondary  text-text-muted  text-text-accent
Background:  bg-bg-primary      bg-bg-secondary      bg-bg-muted
Border:      border-border-primary  border-border-secondary  border-border-muted
```

Font family: **Inter** (variable). Loaded via `@fontsource-variable/inter`.

## Architecture context

See [docs/architecture.md](../docs/architecture.md) for in-depth reference.
