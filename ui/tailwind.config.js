/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        drunk: ["DrunkText", "sans-serif"],
      },
      clipPath: {
        'polygon-triangle': 'polygon(100% 0, 0 100%, 100% 100%)',
      },
    },
  },
  plugins: [],
};
