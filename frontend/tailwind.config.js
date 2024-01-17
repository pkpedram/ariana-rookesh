/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./Core/*.{js,ts,jsx,tsx,mdx}",
    "./Core/**/*.{js,ts,jsx,tsx,mdx}",
    "./Core/**/**/*.{js,ts,jsx,tsx,mdx}",
    "./Data/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      '3xl': {'max': '2560px'},
      // => @media (max-width: 2560px) { ... }

      '2xl': {'max': '1735px'},
      // => @media (max-width: 1735px) { ... }

      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      "2lg": {'max': '1185px'},
      // => @media (max-width: 1185px) { ... }


      'lg': {'max': '1023px'},
      // => @media (max-width: 1023px) { ... }

      '2md': {'max': '871px'},
      // => @media (max-width: 875px) { ... }


      'md': {'max': '767px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '700px'},
      // => @media (max-width: 700px) { ... }
      'smmd': {'max': '450px'},
      'xs': {'max': '400px'},
      // => @media (max-width: 400px) { ... }
      'xxs': {'max': '350px'},
      // => @media (max-width: 400px) { ... }
    },
    extend: {
      colors: {
        main: {
          blue: "#00a2a4"
        },

        light: {
          gray: '#f5f5f5'
        }
      },
    },
  },
  plugins: [],
};
