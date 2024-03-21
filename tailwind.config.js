/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{

      },
      gridTemplateColumns:{
        fluid: 'repeat(auto-fit, minmax(15rem,1fr))',
      }
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [{
      light: {
        ...require("daisyui/src/theming/themes")["light"],
        primary: "#da2e8a",
        secondary: "#6fe662",
      },
    },
    "dark"]
  },
}