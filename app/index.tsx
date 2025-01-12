import { useEffect } from 'react';
import {
	getPokemonDetails,
	getPokemonsLocally,
} from './common/api/pokemon-calls';
import { Redirect } from 'expo-router';
import {
	getItemForKey,
	loadData,
	setItemForKey,
	initializeData,
} from './utils/storageHelpers';
import { Pokemon } from './common/interface/pokemon.mixin';
import { StorageKeys } from './utils/storageHelpers';
import { usePokemonContext } from '@/contexts/PokemonContext';
import { transformPokemonDetails } from './utils/pokemonHelpers';

const Home = () => {
	const pokemonContext = usePokemonContext();

	useEffect(() => {
		// TODO: Add loaded state to make sure user does not get to the pokedex before data is loaded
		const getData = async () => {
			const hasLaunched = await getItemForKey(StorageKeys.HAS_LAUNCHED);
			let allPokemons: Pokemon[] = [];
			let lockedPokemonIds: Set<number> = new Set<number>();

			if (!hasLaunched) {
				// const results = await getPokemons();
				const results = getPokemonsLocally();
				try {
					allPokemons = await transformPokemonDetails(results);
					lockedPokemonIds = new Set(allPokemons.map((pokemon) => pokemon.id));
					await initializeData(allPokemons, lockedPokemonIds);
				} catch (error) {
					console.log('Error initializing data:', error);
				}
			} else {
				try {
					const { pokemons, lockedIds } = (await loadData()) ?? {
						pokemons: [],
						lockedIds: {} as Set<number>,
					};

					if (pokemons.length === 0 || lockedIds.size === 0) {
						throw new Error('Empty data');
					}

					allPokemons = pokemons;
					lockedPokemonIds = lockedIds;
				} catch (error) {
					console.log('Error loading data:', error);
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
