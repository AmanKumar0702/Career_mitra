import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          50:  "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63",
        },
        accent: {
          400: "#a5b4fc",
          500: "#818cf8",
          600: "#6366f1",
        },
        navy: {
          800: "#0f172a",
          900: "#0a0f1e",
          950: "#060b14",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.875rem" }],
      },
      borderRadius: {
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        "glow-sm": "0 0 16px rgba(6,182,212,0.2)",
        "glow":    "0 0 32px rgba(6,182,212,0.25)",
        "glow-lg": "0 0 60px rgba(6,182,212,0.3)",
        "card":    "0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.04)",
        "card-hover": "0 8px 32px rgba(0,0,0,0.12)",
      },
      animation: {
        "fade-in":     "fadeIn 0.4s ease-out",
        "slide-up":    "slideUp 0.4s cubic-bezier(0.4,0,0.2,1)",
        "float":       "float 4s ease-in-out infinite",
        "pulse-glow":  "pulseGlow 2s ease-in-out infinite",
        "spin-slow":   "spin 8s linear infinite",
      },
      keyframes: {
        fadeIn:    { "0%": { opacity: "0" },                                    "100%": { opacity: "1" } },
        slideUp:   { "0%": { transform: "translateY(16px)", opacity: "0" },     "100%": { transform: "translateY(0)", opacity: "1" } },
        float:     { "0%,100%": { transform: "translateY(0px)" },               "50%": { transform: "translateY(-8px)" } },
        pulseGlow: { "0%,100%": { boxShadow: "0 0 16px rgba(6,182,212,0.15)" },"50%": { boxShadow: "0 0 32px rgba(6,182,212,0.3)" } },
      },
      transitionTimingFunction: {
        "spring": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
