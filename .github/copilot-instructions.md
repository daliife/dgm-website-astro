# GitHub Copilot Instructions

This file is automatically loaded by GitHub Copilot when working in this repository.

## Project

Personal portfolio for David Gimeno — a static Astro 5 site hosted at [davidgimeno.cat](http://davidgimeno.cat). TypeScript + Tailwind CSS + React islands. Built locally with `npm run build` and deployed manually via FTP.

## Hard rules — never break these

- **Always dark mode.** `document.documentElement.classList.add("dark")` is set unconditionally in `src/layouts/Layout.astro`. Do not add light mode switching logic anywhere.
- **No custom CSS.** Use Tailwind utility classes exclusively. Exception: CSS custom property definitions in configs or global stylesheets.
- **Use semantic color tokens**, not raw palette classes. E.g. `text-text-primary` not `text-slate-100`. Tokens are defined in `tailwind.config.mjs`.
- **`cv.json` is the single content source.** Do not hardcode bio, job titles, dates, project names, or any personal data inside components.
- **`<Button>` for all interactive elements.** It is polymorphic — pass `href` for links, omit for `<button>`. Variants: `primary | secondary | outline | ghost | simple | icon`. Sizes: `sm | md | lg | icon`.
- **Prefer `.astro` components.** Use React only when client-side state/hooks are genuinely necessary.
- **View Transitions.** The project uses Astro's `ClientRouter`. Use `astro:page-load` for init scripts, not `DOMContentLoaded`.

## Patterns to follow

### Creating a page

```astro
---
import Layout from "../layouts/Layout.astro";
import PageContainer from "../components/PageContainer.astro";
---

<Layout title="DGM | Page Title">
  <PageContainer>
    <!-- content -->
  </PageContainer>
</Layout>
```

### Reading content from cv.json

```astro
---
import cv from "../../cv.json";
---
<p>{cv.basics.summary}</p>
```

### Adding a nav link

Add the route name to `NAV_LINKS` in `src/utils/constants.ts` and create the corresponding page in `src/pages/`.

### Button usage

```astro
<!-- Renders <button> -->
<Button variant="primary" size="md">Click me</Button>

<!-- Renders <a> -->
<Button href="/projects" variant="outline" size="md">See projects</Button>
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

| File                          | Purpose                                              |
| ----------------------------- | ---------------------------------------------------- |
| `cv.json`                     | All personal content                                 |
| `src/layouts/Layout.astro`    | Root HTML shell, SEO, dark mode, fonts               |
| `src/components/Button.astro` | Universal button/link component                      |
| `src/utils/constants.ts`      | `NAV_LINKS`, typography scale, spacing, grid configs |
| `tailwind.config.mjs`         | Design tokens and color palette                      |
| `astro.config.mjs`            | Integrations, Vite, site URL                         |
| `src/types/ui.ts`             | `ButtonVariant`, `ButtonSize`, shared interfaces     |

## Design tokens reference

```
Text:        text-text-primary  text-text-secondary  text-text-muted  text-text-accent
Background:  bg-bg-primary      bg-bg-secondary      bg-bg-muted
Border:      border-border-primary  border-border-secondary  border-border-muted
```

Font family: **Onest** (variable). Loaded via `@fontsource-variable/onest`.

## Architecture context

See [docs/architecture.md](../docs/architecture.md) for in-depth reference.
