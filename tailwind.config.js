/** @type {import('tailwindcss').Config} */

/* Tailwind is only used for its CSS reset here. The site's styles are in
   app/globals.css as named classes. */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: { extend: {} },
  plugins: [],
};
