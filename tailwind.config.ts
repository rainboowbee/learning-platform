import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          500: "#8B5CF6",
          600: "#7C3AED",
          700: "#6D28D9",
        },
        blue: {
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
        },
        green: {
          500: "#10B981",
          600: "#059669",
          700: "#047857",
        },
        yellow: {
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
        },
      },
      animation: {
        "gradient-x": "gradient-x 8s ease infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
