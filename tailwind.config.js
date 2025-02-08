// tailwind.config.js

module.exports = {
	content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				JetBrainsMonoExtraLight: ['JetBrainsMono-ExtraLight', 'monospace'],
				JetBrainsMono: ['JetBrainsMono', 'monospace'],
				JetBrainsMonoMedium: ['JetBrainsMono-Medium', 'monospace'],
				JetBrainsMonoSemiBold: ['JetBrainsMono-SemiBold', 'monospace'],
				JetBrainsMonoBold: ['JetBrainsMono-Bold', 'monospace'],
				JetBrainsMonoExtraBold: ['JetBrainsMono-ExtraBold', 'monospace'],
			},
			colors: {
				blue: '#3C5AA6',
				yellow: '#FFCB05',
				ghostWhite: '#F8F7FF',
				mutedOrange: '#FFF7ED',
			},
		},
	},
	plugins: [],
};
