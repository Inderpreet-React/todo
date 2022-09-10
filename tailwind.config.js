/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js}"],
	theme: {
		extend: {
			colors: {
				loadingbg: "rgb(88,28,135,0.4)",
			},
		},
	},
	plugins: [require("@tailwindcss/forms")],
};
