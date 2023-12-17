/** @type {import('tailwindcss').Config} */
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
		},
		extend: {
			fontFamily: {
				logo: 'Lobster',
			},
		},
	},
	plugins: [],
};
