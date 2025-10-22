/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Custom Lendr color palette
        'dark-purple': '#3c3744',
        'deep-blue': '#090c9b', 
        'primary-blue': '#3066be',
        'light-blue': '#b4c5e4',
        'cream': '#fbfff1',
        // Set primary as the main blue
        primary: {
          50: '#f0f7ff',
          100: '#e0efff',
          200: '#b4c5e4',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3066be', // Main primary color
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#090c9b',
          900: '#3c3744',
        }
      },
      boxShadow: {
        input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
      },
    },
  },
  plugins: [],
}