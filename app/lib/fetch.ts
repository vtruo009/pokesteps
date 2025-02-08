const BASE_URL = process.env.BASE_URL || 'http://localhost:4242';

export const fetchUsers = async (url: string, config?: RequestInit) => {
	try {
		const res = await fetch(`${BASE_URL}/users/${url}`, {
			headers: {
				'Content-Type': 'application/json',
			},
			...config,
		});
		const data = await res.json();
		return data;
	} catch (error) {
		console.error('Fetch error:', error);
		throw error;
	}
};

export const fetchPokemons = async (url: string, config?: RequestInit) => {
	try {
		const res = await fetch(`${BASE_URL}/pokemons/${url}`, {
			headers: {
				'Content-Type': 'application/json',
			},
			...config,
		});
		const data = await res.json();
		return data;
	} catch (error) {
		console.error('Fetch error:', error);
		throw error;
	}
};
