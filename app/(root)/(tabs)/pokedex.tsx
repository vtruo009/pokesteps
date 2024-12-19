import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import PokemonCard from '@/components/PokemonCard';
import { usePokemonContext } from '@/contexts/PokemonContext';

const Pokedex = () => {
	const { state } = usePokemonContext();

	return (
		<SafeAreaView className='flex-1 justify-between bg-white px-0'>
			<Text className='text-5xl mx-5 mt-5 mb-3 font-PixelifySans'>Pokedex</Text>
			<GestureHandlerRootView className='h-full'>
				<FlatList
					data={state.pokemons}
					renderItem={({ item: pokemon }) => (
						<PokemonCard pokemon={pokemon} disabled={!pokemon.unlocked} />
					)}
					numColumns={2}
					initialNumToRender={10}
					contentContainerStyle={{
						display: 'flex',
						alignItems: 'center',
					}}
					columnWrapperStyle={{
						gap: 10,
					}}
				/>
			</GestureHandlerRootView>
		</SafeAreaView>
	);
};

export default Pokedex;
