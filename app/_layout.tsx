import { PokemonProvider } from '@/contexts/PokemonContext';
import { ThemeProvider } from '@rneui/themed';
import { useFonts } from 'expo-font';
import { Stack, Tabs } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded] = useFonts({
		JetBrainsMonoExtraLight: require('../assets/fonts/JetBrainsMono-ExtraLight.ttf'),
		JetBrainsMono: require('../assets/fonts/JetBrainsMono-Regular.ttf'),
		JetBrainsMonoMedium: require('../assets/fonts/JetBrainsMono-Medium.ttf'),
		JetBrainsMonoSemiBold: require('../assets/fonts/JetBrainsMono-SemiBold.ttf'),
		JetBrainsMonoBold: require('../assets/fonts/JetBrainsMono-Bold.ttf'),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<ThemeProvider>
			<PokemonProvider>
				<Stack>
					<Stack.Screen name='index' options={{ headerShown: false }} />
					<Stack.Screen name='(root)' options={{ headerShown: false }} />
					<Stack.Screen name='+not-found' />
				</Stack>
			</PokemonProvider>
		</ThemeProvider>
	);
}
