import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import {
	getItemForKey,
	loadData,
	initializeData,
} from './lib/utils/storageHelpers';
import { Pokemon } from './common/interface/pokemon.mixin';
import { StorageKeys } from './lib/utils/storageHelpers';
import { usePokemonContext } from '@/contexts/PokemonContext';
import { fetchAPI } from './lib/fetch';

const Home = () => {
	const pokemonContext = usePokemonContext();

	useEffect(() => {
		// TODO: Add loaded state to make sure user does not get to the pokedex before data is loaded
		const getData = async () => {
			const hasLaunched = await getItemForKey(StorageKeys.HAS_LAUNCHED);
			let allPokemons: Pokemon[] = [];
			let lockedPokemonIds: Set<number> = new Set<number>();

			if (!hasLaunched) {
				try {
					const { data: allPokemons } = await fetchAPI('/(api)/pokemons', {
						method: 'GET',
					});
					lockedPokemonIds = new Set(
						allPokemons.map((pokemon: Pokemon) => pokemon.id)
					);
					await initializeData(lockedPokemonIds);
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
