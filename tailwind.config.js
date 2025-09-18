/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: '#D21B21',
          dark: '#B0151A',
          light: '#E8313A',
        },
        secondary: {
          DEFAULT: '#FFE043',
          dark: '#E6CA3C',
          light: '#FFE766',
        },
        accent: {
          DEFAULT: '#FFA600',
          dark: '#E69400',
          light: '#FFB333',
        },
      },
    },
  },
  plugins: [],
}
