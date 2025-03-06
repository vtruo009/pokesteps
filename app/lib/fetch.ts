import Constants from 'expo-constants';

const BASE_URL =
	process.env.EXPO_PUBLIC_BASE_URL || Constants.expoConfig?.extra?.BASE_URL;

export const fetchUsers = async (url: string, config?: RequestInit) => {
	if (!url) throw new Error(`Invalid url provided to fetchUsers: ${url}`);
	try {
		const res = await fetch(`${BASE_URL}/users/${url}`, {
			headers: {
				'Content-Type': 'application/json',
			},
			...config,
		});
		const response = await res.json();
		return response.data[0] || response.data;
	} catch (error) {
		console.error('fetchUsers error:', (error as Error).message);
		throw error;
	}
};

export const fetchPokemons = async (url: string, config?: RequestInit) => {
	if (!url) throw new Error(`Invalid url provided to fetchPokemons: ${url}`);
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
		console.error('fetchPokemons error:', error);
		throw error;
	}
};

export const fetchAccounts = async (url: string, config?: RequestInit) => {
	if (!url) throw new Error(`Invalid url provided to fetchAccounts: ${url}`);
	try {
		const res = await fetch(`${BASE_URL}/accounts/${url}`, {
			headers: {
				'Content-Type': 'application/json',
			},
			...config,
		});
		if (res) {
			const response = await res.json();
			return response.data[0] || response.data;
		}

		return null;
	} catch (error) {
		console.log('fetchAccounts error:', error);
	}
};
