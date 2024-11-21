import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import PokemonCard from '@/components/PokemonCard';
import { getItemForKey } from '@/app/utils/storageHelper';
import { useEffect, useState } from 'react';
import { Pokemon } from '@/app/common/interface/pokemon.interface';

const Pokedex = () => {
	const [pokemons, setPokemons] = useState<Pokemon[]>([]);

	useEffect(() => {
		const getData = async () => {
			const data = await getItemForKey('POKEMONS');
			if (data) {
				console.log('Retrieved data from storage...');
				setPokemons(JSON.parse(data));
			}
		};

		getData().catch((err) => console.log(err));
	}, []);

	return (
		<SafeAreaView className='flex-1 w-full h-full justify-between bg-white'>
			<Text className='text-5xl mx-5 mt-5 mb-3 font-PixelifySans'>
				My Pokedex
			</Text>
			<View className='flex flex-1 justify-center items-center'>
				<GestureHandlerRootView>
					<FlatList
						data={pokemons}
						renderItem={({ item: pokemon }) => <PokemonCard {...pokemon} />}
						numColumns={2}
						initialNumToRender={10}
						contentContainerStyle={{
							paddingHorizontal: 20,
						}}
						columnWrapperStyle={{
							gap: 15,
						}}
					/>
				</GestureHandlerRootView>
			</View>
		</SafeAreaView>
	);
};

export default Pokedex;
