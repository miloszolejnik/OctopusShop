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
        'bgBlack' : '#f8f8ff',
        'bgCard' : '#f8f8ff',
        "ghostWhite" : '#141414',
        'primary': '#C61AA7',
        'accent': '#1AC639',
      },
      gridTemplateColumns:{
        fluid: 'repeat(auto-fit, minmax(15rem,1fr))',
      }
    },
  },
  plugins: [],
}