/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#36B8B8",
        background: "#E9FEFE",
        border: "#36b8b8",
        bg: "#36B8B8",
        bgg: "#39AEF0",
        hw: "#017272",
      },
      screens: {
        mobile: { max: "640px" }, // Mobile view only
      },
    },
  },
  plugins: [],
};
