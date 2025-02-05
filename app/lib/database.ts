import { fetchAPI } from './fetch';
/********************* USERS TABLE *********************/
export const createUserInDatabase = async (
	id: string,
	email: string,
	password: string
) => {
	try {
		console.log('Creating user...');
		const response = await fetchAPI(`/(api)/users/create`, {
			method: 'POST',
			body: JSON.stringify({ userId: id, email, password }),
		});

		return response.data[0];
	} catch (error) {
		console.log('Error inserting user into database:', error);
		throw error;
	}
};

export const getUser = async (userId: string) => {
	try {
		console.log('Fetching user data...');
		const user = await fetchAPI(`/(api)/users/${userId}`, {
			method: 'GET',
		});

		return user.data[0];
	} catch (error) {
		throw new Error(`Error getting user from database: ${error}`);
	}
};

/********************* POKEMONS TABLE *********************/
export const getRandomPokemonId = async (userId: string | undefined) => {
	try {
		if (!userId) {
			throw new Error('User ID not found');
		}

		const response = await fetchAPI(
			`/(api)/pokemons/get-locked-pokemons/${userId}`,
			{
				method: 'GET',
			}
		);

		if (response.error) {
			throw new Error(response.error);
		}

		return Math.ceil(Math.random() * response.data.length);
	} catch (error) {
		throw new Error(`Error getting random pokemon id from database: ${error}`);
	}
};

export const getUserPokemons = async (userId: string) => {
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
