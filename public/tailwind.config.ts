import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        bebas: ["var(--font-bebas)", "sans-serif"],
      },
      colors: {
        neon: "#CCFF00",
        "navy-deep": "#0a1628",
        "navy-blue": "#1e3a5f",
        "cyan-bright": "#00d4ff",
      },
    },
  },
  plugins: [],
} satisfies Config;
