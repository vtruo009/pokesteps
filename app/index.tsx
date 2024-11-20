import { useEffect } from 'react';
import { Text, SafeAreaView, Button } from 'react-native';
import { getPokemonInfo, getPokemonsLocally } from './common/api/pokemon-calls';
import useHealthData from '../hooks/useHealthData';
import ProgressRing from '@/components/ProgressRing';
import { router } from 'expo-router';
import {
	getItemForKey,
	removeItemForKey,
	storeData,
} from './utils/storageHelper';
import { Pokemon } from './common/interface/pokemon.interface';

const HAS_LAUNCHED = 'HAS_LAUNCHED';
const POKEMONS = 'POKEMONS';

const Home = () => {
	const { todaySteps, yesterdaySteps } = useHealthData();

	// TODO: Move to Pokedex screen or create custom hook
	useEffect(() => {
		const getAllPokemons = async () => {
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
				return pokemons;
			}
		};

		// TODO: Add loaded state to make sure user does not get to the pokedex before data is loaded
		const getData = async () => {
			const hasLaunched = await getItemForKey(HAS_LAUNCHED);
			if (!hasLaunched) {
				const allPokemons = await getAllPokemons();
				if (allPokemons) {
					await storeData(POKEMONS, JSON.stringify(allPokemons));
					console.log('Pokemon data saved to storage...');
				}
				await storeData(HAS_LAUNCHED, 'true');
			}
		};

		getData().catch((err) => console.log(err));
	}, []);

	// TODO: Replace all testing code with <Redirect href='/root/tabs' /> once we verify that everything works
	return (
		<SafeAreaView
			style={{
				flex: 1,
				justifyContent: 'space-evenly',
				alignItems: 'center',
			}}
		>
			<ProgressRing progress={0.2} />
			<Text>today steps: {todaySteps}</Text>
			<Text>yesterday steps: {yesterdaySteps}</Text>
			<Button
				title='clear storage'
				onPress={async () => {
					await removeItemForKey(HAS_LAUNCHED);
					await removeItemForKey(POKEMONS);
				}}
			/>
			<Button
				title='Go to tabs'
				onPress={() => router.navigate('/root/tabs')}
			/>
		</SafeAreaView>
	);
};

export default Home;
