// tailwind.config.js

module.exports = {
	content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				PixelifySans: ["PixelifySans", "sans-serif"],
				PixelifySemiBold: ["PixelifySans-SemiBold", "sans-serif"],
				PixelifyBold: ["PixelifySans-Bold", "sans-serif"],
				PixelifyMedium: ["PixelifySans-Medium", "sans-serif"],
			},
		},
	},
	plugins: [],
};
