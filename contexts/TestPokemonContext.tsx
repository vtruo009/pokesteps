import { TEST_POKEMONS } from '@/app/utils/constants';
import PokemonCard from '@/components/PokemonCard';
import { usePokemonContext } from '@/contexts/PokemonContext';
import React from 'react';
import { useEffect } from 'react';
import { FlatList, Button } from 'react-native';

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
