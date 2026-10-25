import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f4f8f7",
          100: "#e4eeec",
          200: "#cbdcd8",
          300: "#a6c0ba",
          400: "#789792",
          500: "#587672",
          600: "#41615d",
          700: "#344e4b",
          800: "#293e3d",
          900: "#202f30",
          950: "#111a1c",
        },
        clay: {
          50: "#effbf8",
          100: "#d9f3ed",
          200: "#b6e5da",
          300: "#8bd7c7",
          400: "#65c4b3",
          500: "#3fa898",
          600: "#2d8f83",
          700: "#24756d",
          800: "#205e5a",
          900: "#1d4c4b",
          950: "#102d30",
        },
        ivory: {
          0: "#ffffff",
          50: "#fbfdfc",
          100: "#f5faf8",
          200: "#eaf3f0",
          300: "#dcebe7",
          400: "#c7ddd7",
          500: "#a9c7c0",
        },
        sage: {
          50: "#eff8f6",
          100: "#dff0ec",
          200: "#c1e1da",
          300: "#98cfc3",
          400: "#6fb7aa",
          500: "#4c9e93",
          600: "#37837b",
          700: "#2c6965",
          800: "#255552",
          900: "#204543",
          950: "#122b2d",
        },
        sand: {
          50: "#f8fbfa",
          100: "#edf4f2",
          200: "#dbe9e5",
          300: "#c4d9d4",
          400: "#a6c2bc",
          500: "#83a9a2",
        },
      },
      spacing: {
        "4.5": "1.125rem",
        "18": "4.5rem",
        "22": "5.5rem",
      },
      fontFamily: {
        sans: ['"Inter"', "system-ui", "sans-serif"],
        display: ['"Fraunces"', "Georgia", "serif"],
      },
      fontSize: {
        display: ["clamp(2.75rem, 6vw, 5rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        h1: ["clamp(2.25rem, 5vw, 3.75rem)", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        h2: ["clamp(1.75rem, 3.5vw, 2.75rem)", { lineHeight: "1.12", letterSpacing: "-0.015em" }],
        h3: ["clamp(1.375rem, 2.2vw, 1.75rem)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        h4: ["clamp(1.125rem, 1.5vw, 1.375rem)", { lineHeight: "1.25" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7" }],
        body: ["1rem", { lineHeight: "1.7" }],
        caption: ["0.8125rem", { lineHeight: "1.5" }],
        micro: ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.08em" }],
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "ken-burns": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.08)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in": "fade-in 0.6s ease-out both",
        "slide-in-right": "slide-in-right 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        "ken-burns": "ken-burns 12s ease-out both",
      },
      transitionTimingFunction: {
        "smooth-out": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
