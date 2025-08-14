import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#E6F0FA',
          100: '#D7E8F7',
          200: '#ACCCEB',
          300: '#7FB0DF',
          400: '#4C91D1',
          500: '#0E6BA8',
          600: '#0A4D8C',
          700: '#083F74',
          800: '#05325D',
          900: '#032645',
        },
        accent: '#F5B700',
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.08)'
      },
      borderRadius: {
        xl2: '1.25rem'
      }
    },
  },
  plugins: [],
} satisfies Config
