import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import PokemonCard from '@/components/PokemonCard';
import { Pokemon } from '@/app/common/interface/pokemon.mixin';

// TODO: Remove when API is ready
const STARTERS: Pokemon[] = [
	{
		name: 'Bulbasaur',
		id: 1,
		url: 'https://pokeapi.co/api/v2/pokemon/1/',
		image:
			'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
		weight: 0,
		height: 0,
		types: [],
	},
	{
		name: 'Ivysaur',
		id: 2,
		url: 'https://pokeapi.co/api/v2/pokemon/2/',
		image:
			'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
		weight: 0,
		height: 0,
		types: [],
	},
	{
		name: 'Venusaur',
		id: 3,
		url: 'https://pokeapi.co/api/v2/pokemon/3/',
		image:
			'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png',
		weight: 0,
		height: 0,
		types: [],
	},
	{
		name: 'Charmander',
		id: 4,
		url: 'https://pokeapi.co/api/v2/pokemon/4/',
		image:
			'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
		weight: 0,
		height: 0,
		types: [],
	},
	{
		name: 'Charmeleon',
		id: 5,
		url: 'https://pokeapi.co/api/v2/pokemon/5/',
		image:
			'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png',
		weight: 0,
		height: 0,
		types: [],
	},
	{
		name: 'Charizard',
		id: 6,
		url: 'https://pokeapi.co/api/v2/pokemon/6/',
		image:
			'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
		weight: 0,
		height: 0,
		types: [],
	},
	{
		name: 'Squirtle',
		id: 7,
		url: 'https://pokeapi.co/api/v2/pokemon/7/',
		image:
			'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
		weight: 0,
		height: 0,
		types: [],
	},
	{
		name: 'Wartortle',
		id: 8,
		url: 'https://pokeapi.co/api/v2/pokemon/8/',
		image:
			'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png',
		weight: 0,
		height: 0,
		types: [],
	},
	{
		name: 'Blastoise',
		id: 9,
		url: 'https://pokeapi.co/api/v2/pokemon/9/',
		image:
			'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png',
		weight: 0,
		height: 0,
		types: [],
	},
];

const Pokedex = () => {
	return (
		<SafeAreaView className='flex-1 w-full h-full justify-between bg-white'>
			<Text className='text-5xl mx-5 mt-5 mb-3 font-PixelifySans'>
				Van's Pokedex
			</Text>
			<View className='flex flex-1 justify-center items-center'>
				<GestureHandlerRootView>
					<FlatList
						data={STARTERS}
						renderItem={({ item }) => <PokemonCard pokemon={item} />}
						numColumns={2}
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
