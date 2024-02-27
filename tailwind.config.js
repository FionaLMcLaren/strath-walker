/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      'yellow': '#fdd756',
      'turquoise': '#51bab4',
      'pink': '#f5b5c3',
      'white': '#fff',
      'light-grey': '#f0f0f0',
      'dark-grey': '262525',
      'black': '#000',
    },
  },
  plugins: [],
}

