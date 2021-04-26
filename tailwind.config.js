const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Roboto', 'sans-serif']
      }
    },
    colors: {
      base: {
        '1': colors.coolGray[200],
        '2': colors.coolGray[300],
        '3': colors.coolGray[400],
        '4': colors.coolGray[500],
      },
      typography: {
        main: colors.coolGray[900],
        secondary: colors.coolGray[500]
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
