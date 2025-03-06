import { Stack } from 'expo-router';

export default function RootLayout() {
	return (
		<Stack>
			<Stack.Screen
				name='(tabs)'
				options={{ headerTitle: 'Pokedex', headerShown: false }}
			/>
			<Stack.Screen
				name='pokemon-details'
				options={{ headerTitle: '', headerShown: false }}
			/>
		</Stack>
	);
}
