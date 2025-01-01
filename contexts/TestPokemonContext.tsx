import PokemonCard from '@/components/PokemonCard';
import { usePokemonContext } from '@/contexts/PokemonContext';
import React from 'react';
import { useEffect } from 'react';
import { FlatList, Button } from 'react-native';

export const TEST_POKEMONS = [
	{
		id: 1,
		name: 'bulbasaur',
		unlocked: false,
		weight: 69,
		height: 7,
		types: ['grass', 'poison'],
	},
	{
		id: 2,
		name: 'ivysaur',
		unlocked: false,
		weight: 130,
		height: 10,
		types: ['grass', 'poison'],
	},
	{
		id: 3,
		name: 'venusaur',
		unlocked: false,
		weight: 1000,
		height: 20,
		types: ['grass', 'poison'],
	},
];

const TestPokemonContext = () => {
	const { state, dispatch } = usePokemonContext();

	useEffect(() => {
		dispatch({
			type: 'add_pokemons',
			payload: {
				randomId: 0,
				pokemons: TEST_POKEMONS,
			},
		});
	}, []);

	const handlePress = () => {
		dispatch({
			type: 'unlock_pokemon',
			payload: {
				randomId: 2,
				pokemons: TEST_POKEMONS,
			},
		});
	};

	return (
		<>
			<FlatList
				testID='pokemon-list'
				data={state.pokemons}
				renderItem={({ item: pokemon }) => (
					<PokemonCard pokemon={pokemon} disabled={!pokemon.unlocked} />
				)}
				numColumns={2}
				initialNumToRender={10}
			/>
			<Button title='Unlock Random Pokémon' onPress={handlePress} />
		</>
	);
};

export default TestPokemonContext;
