/********************* POKEMONS TABLE *********************/
export const getUserPokemons = async (userId: string | undefined) => {
	try {
		console.log('Fetching pokemon data...');
		const response = await fetchAPI(`/(api)/pokemons/load/${userId}`, {
			method: 'GET',
		});

		return response.data;
	} catch (error) {
		throw new Error(
			`Error getting current user's pokemons from database: ${error}`
		);
	}
};

export const unlockPokemon = async (userId: string | undefined) => {
	try {
		console.log('Unlocking pokemon...');
		const { data: lockedPokemonIds } = await fetchAPI(
			`/(api)/pokemons/get-locked-pokemons/${userId}`,
			{
				method: 'GET',
			}
		);

		const randomId = Math.ceil(Math.random() * lockedPokemonIds.length);

		await fetchAPI('/(api)/pokemons/unlock', {
			method: 'POST',
			body: JSON.stringify({
				userId,
				randomId,
			}),
		});

		return randomId;
	} catch (error) {
		throw new Error(`Error unlocking pokemon: ${error}`);
	}
};
