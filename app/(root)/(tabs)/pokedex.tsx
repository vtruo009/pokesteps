import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import PokemonCard from '@/components/PokemonCard';
import { usePokemonContext } from '@/contexts/PokemonContext';

const Pokedex = () => {
	const { state } = usePokemonContext();

	return (
		<GestureHandlerRootView>
			<SafeAreaView className='flex-1 justify-between bg-white'>
				<Text className='text-5xl mx-5 mt-5 mb-3 font-PixelifySans'>
					Pokedex
				</Text>
				<View className='flex items-center'>
					<FlatList
						data={state.pokemons}
						renderItem={({ item: pokemon }) => (
							<PokemonCard pokemon={pokemon} disabled={!pokemon.unlocked} />
						)}
						numColumns={2}
						initialNumToRender={10}
						columnWrapperStyle={{
							gap: 15,
						}}
						contentContainerStyle={{
							paddingBottom: 150,
						}}
					/>
				</View>
			</SafeAreaView>
		</GestureHandlerRootView>
	);
};

export default Pokedex;
