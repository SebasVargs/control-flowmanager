/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,css}"
  ],
  theme: {
    extend: {
      colors: {
        'my-color-1': "#012E40",
        'my-color-2': "#024959",
        'my-color-3': "#026773",
        'my-color-4': "#3CA6A6",
        'my-color-5': "#F2E3D5"

      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, #012E40, #026773)',
      }
    },
  },
  plugins: [],
}

