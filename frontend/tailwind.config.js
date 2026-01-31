/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "splash-progress": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
      animation: {
        "splash-progress": "splash-progress 1.5s ease-out forwards",
      },
      backgroundImage: {
        "under-production": "url('/assets/images/Background.png')",
        "under-production-mobile": "url('/assets/images/mobile.png')",
        "home-overlay":
          "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.75) 100%)",
      },
      fontFamily: {
        raleway: ["Raleway", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        "ratsch-red": "#DC2626", // Bright red background
      },
    },
  },
  plugins: [],
};
