/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // questo percorso copre i file sorgente più comuni
    "./index.html",               // aggiungi questo se usi Vite o hai un file HTML root
  ],
  theme: {
    extend: {
      fontFamily: {
        'pacifico': ['Pacifico', 'cursive'],
        'poppins': ['Poppins', 'sans-serif'],
        'dancing': ['Dancing Script', 'cursive']
      },
    }, 
  },
  plugins: [],
}