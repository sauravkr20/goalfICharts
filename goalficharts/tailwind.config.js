/** @type {import('tailwindcss').Config} */
export const content = [
	"./src/**/*.{js,jsx,ts,tsx}", // Add this line
];
export const theme = {
	extend: {
		fontFamily: {
			sans: ["Inter", "sans-serif"], // Set Inter as the default font
		},
	},
};
export const plugins = [];
