/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
// import colors from 'tailwindcss/colors';

export default {
	content: [
		'./src/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		colors: {
			yellow: '#ffff00',
			dark: '#0a0a0a',
			white: '#dddddd',
			darkGray: '#242424',
			gray: '#777',
			lightGray: '#bbb',
			ldPurple: '#5b40f6',
			bgdGray: '#131313',

			transparent: 'transparent',
			current: 'currentColor',
			black: colors.black,
			white: colors.white,
			gray: colors.gray,
			emerald: colors.emerald,
			indigo: colors.indigo,
			green: colors.green,
			red: colors.red,
			//   yellow: colors.yellow,
		},
		extend: {
			fontFamily: {
				logo: 'Lobster',
			},
		},
	},
	plugins: [require('tailwind-scrollbar-hide')],
};
