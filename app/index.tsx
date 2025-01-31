import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { Pokemon } from './common/interface/pokemon.mixin';
import { usePokemonContext } from '@/contexts/PokemonContext';
import { fetchAPI } from './lib/fetch';
import DeviceInfo from 'react-native-device-info';

const Home = () => {
	const pokemonContext = usePokemonContext();

	useEffect(() => {
		// TODO: Add loaded state to make sure user does not get to the pokedex before data is loaded
		const createUser = async () => {
			try {
				const deviceUID = await DeviceInfo.getUniqueId();
				console.log('Creating user...');
				const reponse = await fetchAPI(`/(api)/users/create`, {
					method: 'POST',
					body: JSON.stringify({ deviceId: deviceUID }),
				});
				console.log('POST user response:', reponse);
			} catch (error) {
				console.log('Error creating user:', error);
				throw error;
			}
		};
		const getUserData = async () => {
			try {
				console.log('Fetching user data...');
				const deviceUID = await DeviceInfo.getUniqueId();
				const response = await fetchAPI(`/(api)/users/${deviceUID}`, {
					method: 'GET',
				});
				console.log('GET user response:', response);
			} catch (error) {
				console.log('Error fetching users:', error);
				throw error;
			}
		};

		const getPokemonData = async () => {
			try {
				console.log('Fetching pokemon data...');
				const response = await fetchAPI(`/(api)/pokemons/load`, {
					method: 'GET',
				});

				const lockedPokemonIds: Set<number> = new Set<number>(
					response.data.map((pokemon: Pokemon) => pokemon.id)
				);

				pokemonContext.dispatch({
					type: 'add_pokemons',
					payload: {
						randomId: 0,
						pokemons: response.data,
						lockedPokemonIds,
					},
				});
			} catch (error) {
				console.log('Error fetching pokemons:', error);
				throw error;
			}
		};

		createUser().catch((err) => console.log(err));
		getUserData().catch((err) => console.log(err));
		getPokemonData().catch((err) => console.log(err));
	}, []);

	return <Redirect href='/(root)/(tabs)/steps' />;
};

export default Home;
