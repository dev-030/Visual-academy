/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        dosis: ['Dosis']
      },
      boxShadow: {
        'red': '0 0 10px 2px rgba(255, 0, 0, 0.5)',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ['light' , 'dark'],
  },
}

