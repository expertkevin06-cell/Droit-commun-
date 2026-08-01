import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bleu-roi": {
          DEFAULT: "#0B1D51",
          light: "#14297a",
          dark: "#060f2e",
        },
        or: {
          DEFAULT: "#D4AF37",
          light: "#f1d97a",
          dark: "#9c7f1f",
        },
        vert: {
          DEFAULT: "#1FA65A",
          dark: "#158247",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(circle at 50% 0%, #14297a 0%, #0B1D51 45%, #060f2e 100%)",
      },
      boxShadow: {
        gold: "0 0 0 1px rgba(212,175,55,0.4), 0 8px 30px rgba(0,0,0,0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
