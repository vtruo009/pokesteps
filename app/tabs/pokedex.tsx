import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, StyleSheet } from "react-native";
import Pokemon from "@/components/PokemonCard";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import PokemonCard from "@/components/PokemonCard";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


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
		<View style={styles.container}>
			<Text style={styles.title}>
				Van's Pokedex
			</Text>
			<View style={styles.listContainer}>
				<GestureHandlerRootView>
					<FlatList
						data={STARTERS}
						renderItem={({ item }) => (
							<PokemonCard name={item.name} url={item.url} image={item.image} />
						)}
						numColumns={2}
						contentContainerStyle={styles.flatListContent}
						columnWrapperStyle={styles.flatListColumn}
					/>
				</GestureHandlerRootView>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		height: '100%',
		justifyContent: 'space-between',
		backgroundColor: 'white',
	},
	//Pokedex Name
	title: {
		fontSize: wp('10%'),
		marginHorizontal: wp('3%'), //Left margin
		paddingTop: hp('6%'), //Height from top
		fontFamily: 'PixelifySans',
	},
	//Pokemons
	listContainer: {
		flex: 1,
		paddingTop: hp('5.75%'), //Space for search bar, change later
		justifyContent: 'center',
		alignItems: 'center',
	},
	flatListContent: {
		paddingBottom: 0,
	},
	//Column gap
	flatListColumn: {
		gap: wp('1%'),
	}
})

export default Pokedex;
