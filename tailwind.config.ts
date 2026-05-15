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
        "neon-green": "#00FF87",
        "electric-blue": "#00B4FF",
        "dark-base": "#0A0A0A",
        "dark-card": "#1A1A1A",
        "dark-border": "#2A2A2A",
        "dark-hover": "#252525",
        "peak-gold": "#FFB800",
      },
      fontFamily: {
        heading: ["var(--font-bebas)", "Impact", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-slow": "bounce 2s infinite",
        "spin-slow": "spin 3s linear infinite",
        "glow-green": "glowGreen 2s ease-in-out infinite alternate",
        "slide-up": "slideUp 0.4s ease-out",
        "fade-in": "fadeIn 0.5s ease-out",
        "counter": "counter 2s ease-out",
      },
      keyframes: {
        glowGreen: {
          "0%": { boxShadow: "0 0 5px #00FF87, 0 0 10px #00FF87" },
          "100%": { boxShadow: "0 0 20px #00FF87, 0 0 40px #00FF87, 0 0 60px #00FF87" },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "green-glow": "radial-gradient(circle, rgba(0,255,135,0.15) 0%, transparent 70%)",
        "blue-glow": "radial-gradient(circle, rgba(0,180,255,0.15) 0%, transparent 70%)",
      },
    },
  },
  plugins: [],
};

export default config;
