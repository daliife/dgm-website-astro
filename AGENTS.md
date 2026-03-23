# AGENTS.md — AI Agent Context

This file provides context for AI coding agents (OpenAI Codex, Claude, Gemini, etc.) working on this repository.

## What is this project?

Personal portfolio website for David Gimeno. Static site built with Astro 5, TypeScript, Tailwind CSS, and React islands. Hosted at [davidgimeno.cat](http://davidgimeno.cat). Built locally with `npm run build` and deployed manually via FTP.

## Non-negotiable constraints

Before writing any code, internalize these rules:

| Constraint    | Rule                                                                                                                      |
| ------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Theme         | **Dark mode only.** `classList.add("dark")` is unconditional in `Layout.astro`. Never add light mode logic.               |
| Styling       | **Tailwind utilities only.** No inline styles, no CSS modules, no custom stylesheets.                                     |
| Color tokens  | Use **semantic tokens** (`text-text-primary`, `bg-bg-secondary`, etc.) — never raw palette classes like `text-slate-100`. |
| Content       | All personal data lives in **`cv.json`**. Never hardcode names, dates, job titles, or project info in components.         |
| Interactivity | **`.astro` components first.** Use React only when client-side state or hooks are strictly necessary.                     |
| Navigation    | Routes are driven by `NAV_LINKS` in `src/utils/constants.ts`. New pages need an entry there and a file in `src/pages/`.   |
| Buttons/links | **Always use `<Button>`** component. Pass `href` for links, omit for buttons.                                             |
| Scripts       | Use `astro:page-load` event, **not** `DOMContentLoaded` (broken with View Transitions).                                   |

## Repository layout

```
astro.config.mjs        ← Astro + Vite config
tailwind.config.mjs     ← Design tokens (CSS vars mapped to Tailwind utilities)
cv.json                 ← Single source of truth for all content
src/
  layouts/Layout.astro  ← Root HTML shell (dark mode, SEO, fonts, ClientRouter)
  components/           ← Reusable .astro components
  pages/                ← File-based routes (index, about, projects, work, 404)
  icons/                ← Inline SVG icon components
  types/ui.ts           ← ButtonVariant, ButtonSize, shared interfaces
  utils/constants.ts    ← NAV_LINKS, typography/spacing/grid scale
  utils/buttonStyles.ts ← Button variant/size class helpers
docs/
  architecture.md       ← Deep-dive architecture reference
AGENTS.md               ← This file
.github/
  copilot-instructions.md ← GitHub Copilot custom instructions
  workflows/           ← (empty — CI/CD not yet configured)
```

## How to add things

### New page

```astro
---
// src/pages/new-page.astro
import Layout from "../layouts/Layout.astro";
import PageContainer from "../components/PageContainer.astro";
---
<Layout title="DGM | New Page">
  <PageContainer>
    <!-- content here -->
  </PageContainer>
</Layout>
```

Then add `"new-page"` to `NAV_LINKS` in `src/utils/constants.ts` if it needs a nav entry.

### Reading cv.json

```astro
---
import cv from "../../cv.json";
---
<p>{cv.basics.name}</p>
<p>{cv.basics.summary}</p>
```

### Button / link

```astro
<Button variant="primary" size="md">Action</Button>
<Button href="/projects" variant="outline" size="md">See projects</Button>
```

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

| Component             | What it renders                                                                   |
| --------------------- | --------------------------------------------------------------------------------- |
| `Layout.astro`        | Root `<html>` shell. Props: `title`, `description`, `image`, `type`, `hideFooter` |
| `PageContainer.astro` | Max-width wrapper with page padding                                               |
| `HomeContainer.astro` | Hero layout wrapper for the home page                                             |
| `Header.astro`        | Fixed top nav with logo and nav links                                             |
| `Footer.astro`        | Bottom bar with links                                                             |
| `Button.astro`        | Polymorphic button/link                                                           |
| `Section.astro`       | `<section>` with consistent vertical spacing                                      |
| `Typography.astro`    | Text with design-system scale applied                                             |
| `Grid.astro`          | Responsive CSS grid                                                               |
| `Project.astro`       | Project card                                                                      |
| `Timeline.astro`      | Work experience container                                                         |
| `TimelineItem.astro`  | Single work experience row                                                        |
| `DgmLogoSimple.astro` | SVG logo mark. Props: `className`, `size`                                         |

## Icons

All in `src/icons/`: `EmailIcon`, `GithubIcon`, `LinkedinIcon`, `NotFoundIcon`. All render inline SVGs.

## Commands

```bash
npm run dev          # http://localhost:4321
npm run build        # astro check + production build
npm run preview      # serve dist/ locally
npm run lint         # ESLint
npm run format       # Prettier
```

## Further reading

- `docs/architecture.md` — full architecture walkthrough
- `tailwind.config.mjs` — all design token definitions
- `src/utils/constants.ts` — typography scale, spacing, grid configs
