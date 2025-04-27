// tailwind.config.js
module.exports = {
    content: [
      './src/**/*.{html,js,jsx,ts,tsx}',
    ],
    theme: {
      extend: {
        colors: {
          'primary': '#3490dc',
          'secondary': '#ffed4a',
          'danger': '#e3342f',
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }
  