const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      base: colors.coolGray[200],
      baseHighlight: colors.coolGray[300],
      typography: {
        main: colors.coolGray[900],
        secondary: colors.coolGray[400]
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
