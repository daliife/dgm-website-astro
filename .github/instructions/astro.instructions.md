---
description: "Astro component and page conventions"
applyTo: "**/*.astro"
---

# Astro

- Prefer `.astro` over client islands; client JS only for state/browser APIs
- Pages use `<Layout>` + `PAGE_*` classes from `src/utils/constants.ts`
- Internal hrefs via `pageHref()` (`src/utils/url.ts`) — always trailing slash
- Interactive UI: `<Button>` — variants `primary | outline | ghost | simple`; sizes `sm | md | none`
- Translatable nodes: `data-i18n` / `data-i18n-aria` / `data-i18n-alt`; SSR copy with `t()` (Catalan)
- Init scripts: `astro:page-load`, never `DOMContentLoaded` (View Transitions)
- Optional `class="reveal"` for scroll fade-in
