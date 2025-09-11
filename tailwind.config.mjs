/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx}",
    "./src/utils/constants.ts"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Dark Blue Palette - Accessible
        "dark-blue": {
          50: "#f0f4ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
          950: "#1e1b4b",
        },
        // Midnight Blue Palette - Deeper tones
        midnight: {
          50: "#f0f4ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
          950: "#1e1b4b",
        },
        // Deep Blue Accent Colors
        "deep-blue": {
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        // Ocean Blue Colors
        ocean: {
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
        },
        // Steel Blue Colors
        steel: {
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
        },
        // Accessible Text Colors
        "text-primary-light": "#0f172a",
        "text-secondary-light": "#1e293b",
        "text-muted-light": "#475569",
        "text-primary-dark": "#f8fafc",
        "text-secondary-dark": "#e2e8f0",
        "text-muted-dark": "#94a3b8",
        // Accessible Background Colors
        "bg-light": "#ffffff",
        "bg-light-alt": "#f8fafc",
        "bg-dark": "#0f172a",
        "bg-dark-alt": "#1e293b",
        // Accessible Border Colors
        "border-light": "#e2e8f0",
        "border-dark": "#334155",
        "border-accent-light": "#3b82f6",
        "border-accent-dark": "#60a5fa",
        // Legacy brand colors (keeping for compatibility)
        brand: {
          50: "#fdf8f6",
          100: "#f2e8e5",
          200: "#eaddd7",
          300: "#e0cec7",
          400: "#d2bab0",
          500: "#bfa094",
          DEFAULT: "#bfa094",
          600: "#a18072",
          700: "#977669",
          800: "#846358",
          900: "#43302b",
        },
      },
    },
  },
  plugins: [],
};
