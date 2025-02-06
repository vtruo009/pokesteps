import { GlobalProvider } from '@/contexts/GlobalContext';
import { ThemeProvider } from '@rneui/themed';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
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
		JetBrainsMonoExtraBold: require('../assets/fonts/JetBrainsMono-ExtraBold.ttf'),
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
		<GlobalProvider>
			<ThemeProvider>
				<Stack>
					<Stack.Screen name='index' options={{ headerShown: false }} />
					<Stack.Screen name='(root)' options={{ headerShown: false }} />
					<Stack.Screen name='(auth)' options={{ headerShown: false }} />
					<Stack.Screen name='+not-found' />
				</Stack>
			</ThemeProvider>
		</GlobalProvider>
	);
}
