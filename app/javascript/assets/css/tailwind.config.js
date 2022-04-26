module.exports = {
  purge: [
    "./javascript/assets/style/*.{vue,js,ts,jsx,tsx}",
    "./javascript/**/*.{vue,js,ts,jsx,tsx}",
    "./public/index.html",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        orange: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
        },
      },
      maxWidth: {
        "1/4": "25%",
        "1/3": "33%",
        "1/2": "50%",
        "3/4": "75%",
      },
      minWidth: {
        250: "250px",
      },
      zIndex: {
        1000: 1000,
      },
      padding: {
        56.25: "56.25%",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
