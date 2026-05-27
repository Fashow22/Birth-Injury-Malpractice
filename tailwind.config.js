/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./blog/**/*.html",
    "./assets/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#0A2540', light: '#0F3460', dark: '#061A2E' },
        gold: { DEFAULT: '#B8963E', light: '#D4B262', dark: '#96792F', pale: '#F5EDD6' },
        teal: { DEFAULT: '#14B8A6', dark: '#0D9488', light: '#5EEAD4' },
        cream: '#FFFDF7',
        'warm-white': '#FBF9F4',
        'warm-gray': '#F0ECE3'
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['DM Sans', 'sans-serif'],
        accent: ['Libre Caslon Text', 'Georgia', 'serif']
      }
    }
  },
  plugins: []
};
