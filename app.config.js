import 'dotenv/config';

export default {
	expo: {
		name: 'Pokesteps',
		slug: 'Pokesteps',
		version: '2.0.0',
		orientation: 'portrait',
		icon: 'assets/images/appstore/appstore.png',
		scheme: 'myapp',
		userInterfaceStyle: 'automatic',
		splash: {
			resizeMode: 'contain',
			backgroundColor: '#ffffff',
		},
		ios: {
			supportsTablet: true,
			bundleIdentifier: 'com.vantruong.Pokesteps',
			package: 'com.vantruong.Pokesteps',
		},
		web: {
			bundler: 'metro',
			output: 'server',
			favicon: './assets/images/favicon.png',
		},
		plugins: [
			[
				'expo-router',
				{
					origin: 'https://pokesteps.vercel.app/',
				},
			],
			'react-native-health',
		],
		experiments: {
			typedRoutes: true,
		},
		extra: {
			router: {
				origin: false,
			},
			eas: {
				projectId: '1164e768-406f-4500-b7aa-056842cbfdc3',
			},
			BASE_URL: process.env.BASE_URL,
			APPWRITE_API_ENDPOINT: process.env.APPWRITE_API_ENDPOINT,
			APPWRITE_PROJECT_ID: process.env.APPWRITE_PROJECT_ID,
			APPWRITE_PLATFORM: process.env.APPWRITE_PLATFORM,
		},
	},
};
