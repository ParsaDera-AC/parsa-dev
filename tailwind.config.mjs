/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)", // Custom CSS variables for background
        foreground: "var(--foreground)", // Custom CSS variables for foreground
      },
    },
  },
  plugins: [
    require("daisyui"), // Add DaisyUI here
  ],
  daisyui: {
    themes: ["light", "dark"], // Optional: Choose your DaisyUI themes
  },
};
