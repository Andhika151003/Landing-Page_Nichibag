/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    {
      pattern: /group-hover:\[.*\]/,
    },
    {
      pattern: /\[transform:.*\]/,
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}