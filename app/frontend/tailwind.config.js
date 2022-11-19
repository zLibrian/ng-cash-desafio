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
      backgroundImage: {
        app: "url('/app-bg.jpg')",
      },
    },
  },
  plugins: [],
}
