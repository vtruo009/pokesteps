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
		},
	},
	plugins: [],
};
