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
        adjacent: "#895F1B",
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
      boxShadow: {
        card: "0 1px 2px rgba(27, 36, 48, 0.04), 0 4px 10px -4px rgba(27, 36, 48, 0.10), 0 12px 24px -12px rgba(27, 36, 48, 0.12)",
        "card-hover":
          "0 2px 4px rgba(27, 36, 48, 0.06), 0 8px 16px -6px rgba(27, 36, 48, 0.14), 0 20px 32px -16px rgba(27, 36, 48, 0.16)",
        "card-core":
          "0 1px 2px rgba(61, 107, 79, 0.06), 0 10px 22px -12px rgba(61, 107, 79, 0.28)",
        "card-adjacent":
          "0 1px 2px rgba(137, 95, 27, 0.06), 0 10px 22px -12px rgba(137, 95, 27, 0.28)",
        "card-broaden":
          "0 1px 2px rgba(138, 59, 46, 0.06), 0 10px 22px -12px rgba(138, 59, 46, 0.28)",
        "card-core-hover":
          "0 2px 4px rgba(61, 107, 79, 0.08), 0 16px 30px -14px rgba(61, 107, 79, 0.38)",
        "card-adjacent-hover":
          "0 2px 4px rgba(137, 95, 27, 0.08), 0 16px 30px -14px rgba(137, 95, 27, 0.38)",
        "card-broaden-hover":
          "0 2px 4px rgba(138, 59, 46, 0.08), 0 16px 30px -14px rgba(138, 59, 46, 0.38)",
        panel: "0 1px 2px rgba(27, 36, 48, 0.04), 0 6px 16px -8px rgba(27, 36, 48, 0.14)",
        popover:
          "0 4px 8px rgba(27, 36, 48, 0.08), 0 16px 32px -12px rgba(27, 36, 48, 0.22)",
      },
      keyframes: {
        "fade-slide-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "toast-in": {
          "0%": { opacity: "0", transform: "translateY(6px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-slide-up": "fade-slide-up 0.4s ease-out both",
        "fade-in": "fade-in 0.3s ease-out both",
        "toast-in": "toast-in 0.2s ease-out both",
        shimmer: "shimmer 1.8s ease-in-out infinite",
      },
      transitionTimingFunction: {
        "out-soft": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
