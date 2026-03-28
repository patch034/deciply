import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          ink: "#090d16",
          sky: "#60a5fa",
          line: "#233047",
          accent: "#7c3aed",
          accentSoft: "#22d3ee",
          mist: "#dbe7f5",
          panel: "#111827",
          canvas: "#0b0f19"
        }
      },
      boxShadow: {
        card: "0 24px 70px -34px rgba(5, 10, 20, 0.72)",
        "card-soft": "0 18px 48px -30px rgba(5, 10, 20, 0.58)",
        premium: "0 38px 120px -52px rgba(56, 189, 248, 0.28)"
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top, rgba(124,58,237,0.2), transparent 28%), radial-gradient(circle at 80% 10%, rgba(34,211,238,0.18), transparent 24%), linear-gradient(135deg, rgba(11,15,25,0.96), rgba(15,23,42,0.94))"
      }
    }
  },
  plugins: []
};

export default config;

