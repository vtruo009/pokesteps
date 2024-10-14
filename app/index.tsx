import { useState } from "react";
import { Text, SafeAreaView, Button } from "react-native";
import { getPokemonInfo } from "./common/api/pokemon-calls";

const Home = () => {
	// Next few lines of code are just for reference. Can be removed once everyone gets more accustomed to using call structure.
	const [pokemon, setPokemon] = useState("pokemon")

	const testGetPokemon = async () => {
		const dittoInfo = await getPokemonInfo('ditto')
		if(dittoInfo.data){
			setPokemon(dittoInfo.data.name)
		}
	}

	const clearPokemon = () => {
		setPokemon('')
	}
	// can delete this ^ once comfortable

	return (
		<SafeAreaView>
			<Text>
				pokemon is {pokemon}
			</Text>
			<Button title="test get ditto" onPress={testGetPokemon}/>
			<Button title="clear pokemon" onPress={clearPokemon}/>
		</SafeAreaView>
	);
};

export default Home;
