import { useEffect } from 'react';
import { getPokemonInfo, getPokemonsLocally } from './common/api/pokemon-calls';
import { Redirect } from 'expo-router';
import { getItemForKey, storeData } from './utils/storageHelper';
import { Pokemon } from './common/interface/pokemon.mixin';
import { StorageKeys } from './utils/storageHelper';
import { usePokemonContext } from '@/contexts/PokemonContext';

const Home = () => {
	const pokemonContext = usePokemonContext();

	useEffect(() => {
		const getAllPokemons = async (): Promise<Pokemon[]> => {
			const pokemons: Pokemon[] = [];
			// const results = await getPokemons();
			const results = getPokemonsLocally();
			if (results) {
				for (const pokemon of results) {
					const pokemonInfo = await getPokemonInfo(pokemon.url);
					if (pokemonInfo.data) {
						const pokemon: Pokemon = {
							id: pokemonInfo.data.id,
							name: pokemonInfo.data.name,
							weight: pokemonInfo.data.weight,
							height: pokemonInfo.data.height,
							types: pokemonInfo.data.types.map((type) => type.type.name),
							unlocked: false,
						};
						pokemons.push(pokemon);
					}
				}
			}
			return pokemons;
		};

		// TODO: Add loaded state to make sure user does not get to the pokedex before data is loaded
		const getData = async () => {
			const hasLaunched = await getItemForKey(StorageKeys.HAS_LAUNCHED);
			let allPokemons: Pokemon[] = [];

			if (!hasLaunched) {
				allPokemons = await getAllPokemons();
				if (allPokemons) {
					console.log('Saving pokemon data to storage...');
					await storeData(StorageKeys.POKEMONS, JSON.stringify(allPokemons));
					console.log('Pokemon data saved to storage...');
				}
				await storeData(StorageKeys.HAS_LAUNCHED, 'true');
			} else {
				const data = await getItemForKey(StorageKeys.POKEMONS);
				if (data) {
					allPokemons = JSON.parse(data);
				}
			}

			pokemonContext.dispatch({
				type: 'add_pokemons',
				payload: {
					randomId: 0,
					pokemons: allPokemons,
				},
			});
		};

		getData().catch((err) => console.log(err));
	}, []);

	return <Redirect href='/(root)/(tabs)/steps' />;
};

export default Home;
