/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        themeText: 'var(--color-text)',
        themeBg: 'var(--color-bg)',
        primary: {
          DEFAULT: '#8e8672',
          50: '#fbfaf8',
          100: '#f4f2ee',
          200: '#e5e1da',
          300: '#d0c8bd',
          400: '#b0a695',
          500: '#8e8672',
          600: '#736b59',
          700: '#5c5445',
          800: '#464035',
          900: '#322d25',
          dark: '#b8b09c',
        },
        secondary: {
          DEFAULT: '#acbdad',
          50: '#f6f8f6',
          100: '#ecf0ec',
          200: '#d9e2da',
          300: '#c2d2c3',
          400: '#acbdad',
          500: '#94a795',
          600: '#768877',
          700: '#5c6c5d',
          800: '#465247',
          900: '#313931',
        },
        accent: {
          DEFAULT: '#90a69c',
          50: '#f4f7f6',
          100: '#e5ece9',
          200: '#cbdbd5',
          300: '#adc4bb',
          400: '#90a69c',
          500: '#738d82',
          600: '#5a7067',
          700: '#465851',
          800: '#35433d',
          900: '#252f2b',
        },
        urbanDark: {
          DEFAULT: '#12110f',
          surface: '#1b1a17',
          card: '#23221e',
          border: '#33312b',
          muted: '#8c887e',
        },
        urbanLight: {
          DEFAULT: '#f6f6f4',
          surface: '#ffffff',
          card: '#ffffff',
          border: '#e6e4df',
          muted: '#6c6962',
        }
      },
      fontFamily: {
        arabic: ['Cairo', 'Tajawal', 'sans-serif'],
        english: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-primary': '0 0 25px -5px rgba(142, 134, 114, 0.4)',
        'glow-accent': '0 0 25px -5px rgba(144, 166, 156, 0.4)',
        'card-soft': '0 10px 30px -10px rgba(0, 0, 0, 0.07)',
        'card-dark': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}
