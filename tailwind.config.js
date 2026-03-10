/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          primary: "#f97316",
          dark: "#ea6c0a",
          light: "#fff7ed",
        }
      },
      fontFamily: {
        sans: ["DM Sans", "Segoe UI", "sans-serif"],
      }
    },
  },
  plugins: [],
}