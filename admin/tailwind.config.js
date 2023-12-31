/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
		'./src/pages/**/*.js',
		'./src/components/*.js',
		'./src/components/**/*.js',
		'./src/src/views/**/*.js',
		'./src/views/**/**/*.js',
		'./src/*.js',
	],
  theme: {
    extend: {
      colors: {
				primary: {
					50: '#F1FCE0',
					100: '#E2F8C1',
					200: '#D4F5A2',
					300: '#C6F283',
					400: '#B7EE64',
					500: '#A9EB45',
					550: '#7ABF0D',
					600: '#8EDC18',
					700: '#6AA512',
					800: '#476E0C',
					900: '#233706',
				},
				gray: {
					50: '#FFFFFF',
					100: '#ECECEF',
					200: '#D8DADF',
					300: '#C5C7CE',
					400: '#B1B5BE',
					500: '#9EA2AE',
					600: '#81858F',
					700: '#656870',
					800: '#494B52',
					900: '#2C2E33',
				},
				dark: '#1D1E21',
				'dark-tint': '#222328',
				danger: '#FF5D44',
				warning: '#EADC19',
				info: '#768CF7',
			},
    },
  },
  plugins: [],
}
