/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'IBM Plex Sans, sans-serif',
      },
      colors:{
        'black-800': '#201f1fed',
        'purple-700': '#743BF4',
      },
      backgroundImage: {
        app: "url('/app-bg.jpg')",
      },
    },
  },
  plugins: [],
}
