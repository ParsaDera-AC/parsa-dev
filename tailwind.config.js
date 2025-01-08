/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Include all files in the `app` directory
    "./components/**/*.{js,ts,jsx,tsx}", // Include your components directory
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")], // Add DaisyUI plugin
};
