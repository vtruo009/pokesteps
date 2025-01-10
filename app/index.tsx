import { useEffect } from 'react';
import { getPokemonInfo, getPokemonsLocally } from './common/api/pokemon-calls';
import { Redirect } from 'expo-router';
import { getItemForKey, setItemForKey } from './utils/storageHelpers';
import { Pokemon } from './common/interface/pokemon.mixin';
import { StorageKeys } from './utils/storageHelpers';
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
			let lockedPokemonIds: Set<number> = new Set();

			if (!hasLaunched) {
				allPokemons = await getAllPokemons();
				lockedPokemonIds = new Set(allPokemons.map((pokemon) => pokemon.id));
				if (allPokemons) {
					console.log('Saving pokemon data to storage...');
					await setItemForKey(
						StorageKeys.POKEMONS,
						JSON.stringify(allPokemons)
					);
					await setItemForKey(
						StorageKeys.LOCKED_POKEMON_IDS,
						[...lockedPokemonIds].join(',')
					);
					console.log('Pokemon data saved to storage...');
				}
				await setItemForKey(StorageKeys.HAS_LAUNCHED, 'true');
			} else {
				const pokemonsData = await getItemForKey(StorageKeys.POKEMONS);
				const lockedPokemonIdsData = await getItemForKey(
					StorageKeys.LOCKED_POKEMON_IDS
				);
				if (pokemonsData) {
					allPokemons = JSON.parse(pokemonsData);
				}
				if (lockedPokemonIdsData) {
					lockedPokemonIds = new Set(
						lockedPokemonIdsData.split(',').map(Number)
					);
				}
			}

			pokemonContext.dispatch({
				type: 'add_pokemons',
				payload: {
					randomId: 0,
					pokemons: allPokemons,
					lockedPokemonIds,
				},
			});
		};

		getData().catch((err) => console.log(err));
	}, []);

	return <Redirect href='/(root)/(tabs)/steps' />;
};

export default Home;
