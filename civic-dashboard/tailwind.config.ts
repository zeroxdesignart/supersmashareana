import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["system-ui", "ui-sans-serif", "sans-serif"]
      },
      colors: {
        background: "#020617",
        foreground: "#e5e7eb",
        card: "#020617",
        muted: "#0f172a",
        primary: "#38bdf8",
        border: "#1e293b"
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem"
      },
      boxShadow: {
        card: "0 20px 40px rgba(15,23,42,0.7)"
      }
    }
  },
  plugins: []
};

export default config;
