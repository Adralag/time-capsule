/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Deep night-sky navy — the "vault" backdrop for the unlock screen & future vault
        capsule: {
          950: "#080D1C",
          900: "#0B1226",
          800: "#131C36",
          700: "#1C2947",
        },
        // Brass / aged metal — the capsule's hardware, borders, dividers
        brass: {
          200: "#EBDCB4",
          300: "#DCC48A",
          400: "#C9A15C",
          500: "#B08A45",
          600: "#8C6C34",
        },
        // Sealing wax — the envelope seal, timeline postmarks, accents
        wax: {
          400: "#8C3A3A",
          500: "#6B2737",
          600: "#531E2B",
        },
        // Parchment — the love letter paper
        parchment: {
          100: "#FAF4E6",
          200: "#F3E9D2",
          300: "#E9DAB8",
        },
        ink: "#332417",
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        letter: ["'Lora'", "serif"],
        sans: ["'Space Grotesk'", "sans-serif"],
      },
      backgroundImage: {
        "grain": "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        drift: "drift 6s ease-in-out infinite",
        "spin-slow": "spin-slow 8s linear infinite",
      },
    },
  },
  plugins: [],
};
