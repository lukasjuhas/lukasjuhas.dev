/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './layouts/**/*.{js,jsx,ts,tsx,vue}',
    './pages/**/*.{js,jsx,ts,tsx,vue}',
    './components/**/*.{js,jsx,ts,tsx,vue}',
    './public/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      transitionDuration: {
        4000: '4000ms',
      },
      fontFamily: {
        sans: ['Quicksand', ...defaultTheme.fontFamily.sans],
      },
    },
  },
}
