/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        'primary' : '#09122C',
        'secondary' :'#0D0842',
        'blackBG':'#F3F3F3'

      },
      fontFamily:{
        'primary': ['Montserrat', 'serif'],
        'secondary':['Nunito Sans', 'serif']

      }
    },
  },
  plugins: [],
}

