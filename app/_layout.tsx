import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded] = useFonts({
		PixelifySans: require("../assets/fonts/PixelifySans-Regular.ttf"),
		PixeifySansMedium: require("../assets/fonts/PixelifySans-Medium.ttf"),
		PixelifySansSemiBold: require("../assets/fonts/PixelifySans-SemiBold.ttf"),
		PixelifySansBold: require("../assets/fonts/PixelifySans-Bold.ttf"),
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
		<Stack>
			<Stack.Screen name='index' options={{ headerShown: false }} />
			<Stack.Screen name='+not-found' />
		</Stack>
	);
}