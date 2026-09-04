/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html','./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FCFBF9',
          100: '#F7F4F0',
          200: '#F1EBE3',
          300: '#E7DDD2',
          400: '#D9CBBB',
          500: '#C4AE98',
        },
        cocoa: {
          50: '#F4F1ED',
          100: '#E7E0D8',
          200: '#CDC0B4',
          300: '#AA9687',
          400: '#8C7666',
          500: '#715D4F',
          600: '#5C4A3F',
          700: '#4A3B33',
          800: '#392E28',
          900: '#2A221D',
          950: '#1F1916',
        },
        gold: {
          50: '#FBF7EF',
          100: '#F6EDDD',
          200: '#EBD9BB',
          300: '#DFC395',
          400: '#D1AC74',
          450: '#B48A4C',
          500: '#C0965C',
          550: '#997541',
          600: '#A67A45',
          700: '#856037',
          800: '#6A4C2C',
          900: '#563E25',
        },
        caramel: {
          300: '#D9C09B',
          400: '#C3A174',
          500: '#AE8859',
          600: '#977147',
          700: '#7A5A39',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(42,34,29,0.04), 0 8px 24px rgba(42,34,29,0.06)',
      },
    },
  },
  plugins: []
}