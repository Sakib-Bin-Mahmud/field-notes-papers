import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: "#0B132B",
        paper: "#F7F5F0",
        aged: "#EFEAE0",
        "paper-line": "#E1D8C4",
        ink: "#111827",
        "ink-soft": "#4A5568",
        brass: "#C9A44C",
        cobalt: "#2563EB",
        sage: "#7D8B78",
        core: "#3D6B4F",
        "core-bg": "#E3ECE4",
        adjacent: "#895F1B",
        "adjacent-bg": "#F3E7CF",
        broaden: "#8A3B2E",
        "broaden-bg": "#F1DDD5",
        accent: "#2563EB",
      },
      fontFamily: {
        display: ["var(--font-heading)", "Georgia", "serif"],
        heading: ["var(--font-heading)", "Georgia", "serif"],
        body: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "card-lines": "repeating-linear-gradient(transparent, transparent 27px, #E1D8C4 28px)",
        cta: "linear-gradient(135deg, #3B72F0 0%, #2563EB 55%, #1D4FC4 100%)",
        "hero-wash":
          "radial-gradient(circle at 15% 20%, rgba(201,164,76,0.12), transparent 45%), radial-gradient(circle at 85% 0%, rgba(37,99,235,0.08), transparent 40%)",
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
        wiggle: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-8deg)" },
          "75%": { transform: "rotate(8deg)" },
        },
        "needle-spin": {
          "0%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(200deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "draw-check": {
          "0%": { strokeDashoffset: "48" },
          "100%": { strokeDashoffset: "0" },
        },
        "pop-in": {
          "0%": { opacity: "0", transform: "scale(0.6)" },
          "60%": { opacity: "1", transform: "scale(1.08)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "spark-out": {
          "0%": { opacity: "0", transform: "scale(0.3) translate(0, 0)" },
          "40%": { opacity: "1" },
          "100%": { opacity: "0", transform: "scale(1) translate(var(--spark-x), var(--spark-y))" },
        },
      },
      animation: {
        "fade-slide-up": "fade-slide-up 0.4s ease-out both",
        "fade-in": "fade-in 0.3s ease-out both",
        "toast-in": "toast-in 0.2s ease-out both",
        shimmer: "shimmer 1.8s ease-in-out infinite",
        wiggle: "wiggle 0.4s ease-in-out",
        "needle-spin": "needle-spin 1.4s cubic-bezier(0.65, 0, 0.35, 1) infinite",
        "draw-check": "draw-check 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s both",
        "pop-in": "pop-in 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        "spark-out": "spark-out 0.6s ease-out both",
      },
      transitionTimingFunction: {
        "out-soft": "cubic-bezier(0.22, 1, 0.36, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
