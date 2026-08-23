import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F1EEE6",
        "paper-line": "#DAD4C4",
        ink: "#1B2430",
        "ink-soft": "#4A5568",
        core: "#3D6B4F",
        "core-bg": "#E3ECE4",
        adjacent: "#9A6B1E",
        "adjacent-bg": "#F3E7CF",
        broaden: "#8A3B2E",
        "broaden-bg": "#F1DDD5",
        accent: "#B5482E",
      },
      fontFamily: {
        display: ["var(--font-serif)", "Georgia", "serif"],
        body: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "card-lines": "repeating-linear-gradient(transparent, transparent 27px, #DAD4C4 28px)",
      },
    },
  },
  plugins: [],
};
export default config;
