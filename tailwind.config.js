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
        'bgBlack' : '#f3f3f3',
        'bgCard' : '#f8f8ff',
        "ghostWhite" : '#141414',
        'primary': '#C61AA7',
        'accent': 'rgb(15 118 110) ',
      },
      gridTemplateColumns:{
        fluid: 'repeat(auto-fit, minmax(15rem,1fr))',
      }
    },
  },
  plugins: [],
}