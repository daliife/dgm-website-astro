# David Gimeno Portfolio

Personal portfolio website built with Astro. Live at [davidgimeno.cat](http://davidgimeno.cat).

## 🚀 Tech Stack

- **Astro 5** — static site generator & file-based routing
- **TypeScript 5** — type safety throughout
- **Tailwind CSS 3** — utility-first styling with semantic design tokens
- **React 18** — used only for interactive islands
- **Inter** — variable font via `@fontsource-variable/inter`
- **pnpm** — package manager

## 🛠️ Getting Started

```bash
pnpm install      # Install dependencies
pnpm run dev      # Dev server → http://localhost:4321
pnpm run build    # Type-check + production build → dist/
pnpm run preview  # Serve the production build locally
```

## 📁 Project Structure

```
├── astro.config.mjs       # Astro + Vite configuration
├── tailwind.config.mjs    # Design tokens and Tailwind theme
├── cv.json                # All personal content (bio, work, projects…)
├── .npmrc                 # pnpm config (shamefully-hoist=true)
├── public/                # Static assets (images, favicon, robots.txt)
├── .github/
│   ├── copilot-instructions.md  # GitHub Copilot context
│   └── workflows/
│       ├── deploy.yml            # Auto-deploy to cdmon via FTP (push to main)
│       └── deploy-pages.yml      # Auto-deploy to GitHub Pages (push to main)
├── docs/
│   └── architecture.md    # In-depth architecture reference
├── AGENTS.md              # AI agent context (Codex, Claude, Gemini…)
└── src/
    ├── components/
    │   ├── brand/          # DgmLogoSimple, ThemeToggle
    │   ├── layout/         # Header, Footer, PageContainer, HomeContainer
    │   ├── sections/       # Project, Timeline, TimelineItem (legacy)
    │   └── ui/             # Button, Grid, Section, Typography
    ├── icons/              # Inline SVG icon components (legacy)
    ├── layouts/
    │   └── Layout.astro    # Root HTML shell
    ├── pages/              # One file = one route
    ├── types/              # Shared TypeScript interfaces
    └── utils/              # NAV_LINKS, constants
```

## 📄 Pages

| Route       | File                       |
| ----------- | -------------------------- |
| `/`         | `src/pages/index.astro`    |
| `/about`    | `src/pages/about.astro`    |
| `/projects` | `src/pages/projects.astro` |
| `/work`     | `src/pages/work.astro`     |
| `/contact`  | `src/pages/contact.astro`  |
| `/404`      | `src/pages/404.astro`      |

## 🤝 Contributing

### Branch & commit conventions

- Branch from `main`. Use short, descriptive branch names: `feat/projects-filter`, `fix/nav-mobile`.
- Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `chore:`, `docs:`, `style:`, `refactor:`.

### ✅ Before opening a PR

```bash
pnpm run lint         # Must pass with no errors
pnpm run format       # Must pass
pnpm run build        # Must succeed (0 errors, 0 warnings)
```

### ➕ Adding a page

1. Create `src/pages/my-page.astro`.
2. Add `"my-page"` to `NAV_LINKS` in `src/utils/constants.ts` and update the `NavLink` type in `src/types/ui.ts`.
3. Use the standard page shell:

```astro
---
import Layout from "../layouts/Layout.astro";
import { TITLE_PAGE_PREFIX } from "../utils/constants";
---
<Layout title={`${TITLE_PAGE_PREFIX}My Page`}>
  <div class="max-w-5xl mx-auto px-6 pt-32 pb-20">
    <!-- content -->
  </div>
</Layout>
```

### 📝 Adding content

All personal content (bio, work history, projects, skills, languages) lives in `cv.json`. Edit that file — do not hardcode strings inside components.

```astro
---
import { basics, work, projects } from "@cv";
---
```

### 🎨 Key conventions

- Use **semantic color tokens** (`text-text-primary`, `bg-bg-secondary`, etc.) — never raw palette classes like `text-gray-900`.
- Use `<Button>` for every interactive element. Pass `href` to render as `<a>`.
- **Dark/light mode via toggle** (`ThemeToggle.astro`). Theme persists in `localStorage`. Do not switch to dark-only.
- Add `class="reveal"` to elements for scroll-triggered fade-in animations (respects `prefers-reduced-motion`).
- Prefer `.astro` components. Use React only when client-side state is genuinely needed.
- Use `astro:page-load` for initialization scripts, not `DOMContentLoaded`.
- **pnpm only** — do not use npm or yarn.

See [docs/architecture.md](docs/architecture.md) for a full reference, and [AGENTS.md](AGENTS.md) for the AI/LLM context guide.

## 🚢 Deployment

Deployment is fully automated via GitHub Actions on every push to `main`.

| Workflow               | File                                 | Target                |
| ---------------------- | ------------------------------------ | --------------------- |
| Build & Deploy (FTP)   | `.github/workflows/deploy.yml`       | cdmon hosting via FTP |
| Build & Deploy (Pages) | `.github/workflows/deploy-pages.yml` | GitHub Pages          |

Both pipelines: checkout → pnpm install → `pnpm run build` → deploy.

### Required GitHub secrets (for FTP deploy)

Set these in **Settings → Secrets and variables → Actions**:

| Secret           | Description              |
| ---------------- | ------------------------ |
| `FTP_SERVER`     | FTP hostname             |
| `FTP_USERNAME`   | FTP username             |
| `FTP_PASSWORD`   | FTP password             |
| `FTP_SERVER_DIR` | Remote path to upload to |

### Manual trigger

Both workflows support `workflow_dispatch` — trigger them from the GitHub Actions tab without pushing.
