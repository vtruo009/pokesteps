import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native";
import Pokemon from "@/components/PokemonCard";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import PokemonCard from "@/components/PokemonCard";

// TODO: Remove when API is ready
const STARTERS = [
	{
		name: "Bulbasaur",
		url: "https://pokeapi.co/api/v2/pokemon/1/",
		image:
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
	},
	{
		name: "Ivysaur",
		url: "https://pokeapi.co/api/v2/pokemon/2/",
		image:
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
	},
	{
		name: "Venusaur",
		url: "https://pokeapi.co/api/v2/pokemon/3/",
		image:
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
	},
	{
		name: "Charmander",
		url: "https://pokeapi.co/api/v2/pokemon/4/",
		image:
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
	},
	{
		name: "Charmeleon",
		url: "https://pokeapi.co/api/v2/pokemon/5/",
		image:
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png",
	},
	{
		name: "Charizard",
		url: "https://pokeapi.co/api/v2/pokemon/6/",
		image:
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
	},
	{
		name: "Squirtle",
		url: "https://pokeapi.co/api/v2/pokemon/7/",
		image:
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
	},
	{
		name: "Wartortle",
		url: "https://pokeapi.co/api/v2/pokemon/8/",
		image:
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png",
	},
	{
		name: "Blastoise",
		url: "https://pokeapi.co/api/v2/pokemon/9/",
		image:
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png",
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
						renderItem={({ item }) => (
							<PokemonCard name={item.name} url={item.url} image={item.image} />
						)}
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
