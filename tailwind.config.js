/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html', // if you're using Vite or CRA, this ensures Tailwind processes the HTML
    './src/**/*.{js,ts,jsx,tsx}', // your React source code files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}