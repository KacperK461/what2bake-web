const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-lato)', ...fontFamily.sans],
      },
      backgroundImage: {
        'hero-pattern-dark':
          'linear-gradient(0deg, rgba(35, 35, 35, 0.94), rgba(35, 35, 35, 0.94)), url(/images/hero-image.png)',
        'hero-pattern-light':
          'linear-gradient(0deg, rgba(255, 255, 255, 0.94), rgba(255, 255, 255, 0.94)), url(/images/hero-image.png)',
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000',
      light: {
        100: '#BBBBBB',
        200: '#B7B7B7',
        300: '#C7C7C7',
        400: '#D1D1D1',
        500: '#959595',
        600: '#8A8A8A',
        700: '#828282',
      },
      gray: {
        100: '#616161',
        200: '#505050',
        300: '#555555',
        400: '#494949',
        500: '#484646',
        600: '#414141',
      },
      dark: {
        100: '#393838',
        200: '#383838',
        300: '#383737',
        400: '#323232',
        500: '#272727',
        600: '#232323',
      },
      yellow: {
        DEFAULT: '#D4AF37',
        dark: '#AE8C1B',
      },
      green: {
        100: '#03B815',
        200: '#A0CC14',
        300: '#607C08',
        400: '789A0D',
      },
    },
  },
  corePlugins: {
    textOpacity: false,
    backgroundOpacity: false,
    borderOpacity: false,
    divideOpacity: false,
    placeholderOpacity: false,
    ringOpacity: false,
  },
  plugins: [],
};
