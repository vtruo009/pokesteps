import Constants from 'expo-constants';

const BASE_URL = Constants.expoConfig?.extra?.BASE_URL || process.env.BASE_URL;

export const fetchUsers = async (url: string, config?: RequestInit) => {
	if (!url) throw new Error(`No url provided: ${url}`);
	try {
		const res = await fetch(`${BASE_URL}/users/${url}`, {
			headers: {
				'Content-Type': 'application/json',
			},
			...config,
		});
		const response = await res.json();
		return response.data;
	} catch (error) {
		console.error('Fetch error:', (error as Error).message);
		throw error;
	}
};

export const fetchPokemons = async (url: string, config?: RequestInit) => {
	if (!url) throw new Error(`No url provided: ${url}`);
	try {
		const res = await fetch(`${BASE_URL}/pokemons/${url}`, {
			headers: {
				'Content-Type': 'application/json',
			},
			...config,
		});
		const response = await res.json();
		return response.data;
	} catch (error) {
		console.error('Fetch error:', error);
		throw error;
	}
};
