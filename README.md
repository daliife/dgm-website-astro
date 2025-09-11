# David Gimeno Portfolio

Personal portfolio website built with Astro, showcasing web development projects and professional experience.

## 🚀 Tech Stack

- **Astro 5.1.2** - Modern static site generator
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **React** - For interactive components

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.astro
│   ├── Grid.astro
│   ├── Header.astro
│   ├── Project.astro
│   ├── Section.astro
│   ├── Timeline.astro
│   └── Typography.astro
├── icons/              # SVG icon components
├── layouts/            # Page layouts
│   └── Layout.astro
├── pages/              # Route pages
│   ├── index.astro     # Home page
│   ├── about.astro     # About page
│   ├── projects.astro  # Projects showcase
│   ├── work.astro      # Work experience
│   └── 404.astro       # Error page
└── utils/              # Utilities and constants
    └── constants.ts
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Features

- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Dark Mode** - Toggle between light and dark themes
- **TypeScript** - Full type safety throughout the codebase
- **Component Architecture** - Reusable and maintainable components
- **SEO Optimized** - Meta tags, structured data, and sitemap
- **Performance** - Optimized images and minimal JavaScript

## 📱 Pages

- **Home** - Hero section with introduction
- **Projects** - Grid showcase of development projects
- **Work** - Timeline of professional experience
- **About** - Personal information and skills

## 🔧 Configuration

The project uses:

- `astro.config.mjs` - Astro configuration
- `tailwind.config.mjs` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `cv.json` - Personal data and content
