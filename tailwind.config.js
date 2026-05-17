/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Cyberpunk/Synthwave palette
        background: "#0a0a0f",
        "background-light": "#12121a",
        primary: "#00f0ff",
        accent: "#ff00aa",
        secondary: "#7b2fff",
        surface: "#1a1a2e",
        muted: "#71717a",
        portfolio: {
          ivory: "hsl(42 48% 96%)",
          paper: "hsl(40 38% 92%)",
          ink: "hsl(162 23% 12%)",
          soft: "hsl(38 16% 43%)",
          line: "hsl(40 18% 78%)",
          forest: "hsl(148 42% 18%)",
          moss: "hsl(150 24% 32%)",
          sage: "hsl(154 12% 70%)",
          copper: "hsl(22 53% 48%)",
          copperDark: "hsl(20 45% 32%)",
        },
      },
      fontFamily: {
        sans: ["Manrope", "system-ui", "sans-serif"],
        display: ["Instrument Serif", "Georgia", "serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        gradient: "gradient 8s ease infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(0, 240, 255, 0.3)",
          },
          "50%": {
            boxShadow: "0 0 40px rgba(0, 240, 255, 0.6)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "cyber-grid": `
          linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px)
        `,
        "portfolio-grid": `
          linear-gradient(hsl(154 12% 70% / 0.18) 1px, transparent 1px),
          linear-gradient(90deg, hsl(154 12% 70% / 0.18) 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        grid: "50px 50px",
      },
    },
  },
  plugins: [],
};
