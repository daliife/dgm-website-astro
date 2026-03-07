# David Gimeno Portfolio

Personal portfolio website built with Astro. Live at [davidgimeno.cat](http://davidgimeno.cat).

## 🚀 Tech Stack

- **Astro 5** — static site generator & file-based routing
- **TypeScript 5** — type safety throughout
- **Tailwind CSS 3** — utility-first styling with custom design tokens
- **React 18** — used only for interactive islands
- **Onest** — variable font

## 🛠️ Getting Started

```bash
npm install       # Install dependencies
npm run dev       # Dev server → http://localhost:4321
npm run build     # Type-check + production build → dist/
npm run preview   # Serve the production build locally
```

## 📁 Project Structure

```
├── astro.config.mjs     # Astro + Vite configuration
├── tailwind.config.mjs  # Design tokens and Tailwind theme
├── cv.json              # All personal content (bio, work, projects)
├── public/              # Static assets (images, favicon, robots.txt)
├── .github/
│   └── copilot-instructions.md  # GitHub Copilot context
├── docs/
│   └── architecture.md  # In-depth architecture reference
├── AGENTS.md            # AI agent context (OpenAI Codex, general LLMs)
└── src/
    ├── components/      # Reusable .astro UI components
    ├── icons/           # Inline SVG icon components
    ├── layouts/         # Page shell (Layout.astro)
    ├── pages/           # One file = one route
    ├── types/           # Shared TypeScript interfaces
    └── utils/           # Constants and style helpers
```

## 🤝 Contributing

### Branch & commit conventions

- Branch from `main`. Use short, descriptive branch names: `feat/projects-filter`, `fix/nav-mobile`.
- Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `chore:`, `docs:`, `style:`, `refactor:`.

### ✅ Before opening a PR

```bash
npm run lint         # Must pass with no errors
npm run format:check # Must pass
npm run build        # Must succeed
```

### ➕ Adding a page

1. Create `src/pages/my-page.astro`.
2. Add `"my-page"` to `NAV_LINKS` in `src/utils/constants.ts` if it needs a nav entry.
3. Wrap content in `<Layout title="DGM | My Page"><PageContainer>…</PageContainer></Layout>`.

### 📝 Adding content

All personal content (bio, work history, projects, skills) lives in `cv.json`. Edit that file — do not hardcode strings inside components.

### 🎨 Key conventions

- Use semantic color tokens (`text-text-primary`, `bg-bg-secondary`, etc.) — not raw palette classes.
- Use `<Button>` for every interactive element. Pass `href` to render as `<a>`.
- The site is **always dark mode** — do not add light mode toggling.
- Prefer `.astro` components. Use React only when client-side state is genuinely needed.
- Use `astro:page-load` for initialization scripts, not `DOMContentLoaded`.

See [docs/architecture.md](docs/architecture.md) for a full reference, and [AGENTS.md](AGENTS.md) for the AI/LLM context guide.

## 🚢 Deployment

Manual deployment via FTP:

```bash
npm run build   # generates dist/
# upload the contents of dist/ to the hosting server via FTP
```

> ⚙️ CI/CD automation (e.g. auto-deploy on push to `main`) is planned for the future.
