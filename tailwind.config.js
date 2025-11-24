/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2D5016', // Dark green
          dark: '#1A3009',
          light: '#4A7A2A',
        },
        secondary: {
          DEFAULT: '#F4A261', // Light orange
          dark: '#E76F51',
          light: '#F9C784',
        },
        neutral: {
          DEFAULT: '#F5F1E8', // Light beige
          dark: '#E8E0D1',
          light: '#FAF8F3',
        },
        accent: {
          DEFAULT: '#8B4513', // Brown
        },
      },
      fontFamily: {
        sans: ['system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
