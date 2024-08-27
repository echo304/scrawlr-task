/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'darkgray': "#343A40",
        'cobalt-blue': "#253CF2",
        'almost-white': "#F4F6F8",
        'lightgray': "#E5E8FD",
      }
    },
  },
  plugins: [],
}

