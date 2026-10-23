/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f5f7f6',
          100: '#e8eceb',
          200: '#cfd6d4',
          300: '#a8b4b1',
          400: '#768783',
          500: '#576663',
          600: '#43514e',
          700: '#36413f',
          800: '#2c3533',
          900: '#1f2625',
          950: '#131817',
        },
        forest: {
          50: '#f0f6f3',
          100: '#dcebe4',
          200: '#b8d6c9',
          300: '#8cbba6',
          400: '#5f977f',
          500: '#42785f',
          600: '#33614b',
          700: '#294d3c',
          800: '#223d30',
          900: '#1a2f25',
          950: '#0f1c16',
        },
        clay: {
          50: '#fbf4f0',
          100: '#f5e3d9',
          200: '#e9c4b0',
          300: '#d99e7d',
          400: '#c87a4f',
          500: '#b85f35',
          600: '#a04929',
          700: '#823a23',
          800: '#673020',
          900: '#4f261a',
          950: '#2c140d',
        },
        ivory: {
          50: '#fdfcf9',
          100: '#faf7f1',
          200: '#f4eee2',
          300: '#ebe2d0',
          400: '#dccfb5',
        },
        stone: {
          50: '#f7f6f4',
          100: '#edebe7',
          200: '#dedad3',
          300: '#c6c1b8',
          400: '#a8a298',
          500: '#8a8478',
          600: '#6f6a60',
          700: '#57534b',
          800: '#3f3d38',
          900: '#282723',
        },
      },
      spacing: {
        '4.5': '1.125rem',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Fraunces"', 'Georgia', 'serif'],
      },
      fontSize: {
        'display': ['clamp(2.5rem, 6vw, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'h1': ['clamp(2rem, 4.5vw, 3.25rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h2': ['clamp(1.6rem, 3.2vw, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'h3': ['clamp(1.25rem, 2vw, 1.6rem)', { lineHeight: '1.2' }],
      },
      maxWidth: {
        '8xl': '88rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        'fade-in': 'fade-in 0.5s ease-out both',
      },
    },
  },
  plugins: [],
};
