/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./Components/**/*.{js,ts,jsx,tsx}",
    "./Pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f6f8f6',
          100: '#e8ede8',
          200: '#d1dbd1',
          300: '#a8baa8',
          400: '#7d997d',
          500: '#5a7a5a',
          600: '#466146',
          700: '#374d37',
          800: '#2e3f2e',
        },
        beige: {
          50: '#faf9f7',
          100: '#f5f3ef',
        }
      }
    },
  },
  plugins: [],
}