const BASE_URL = process.env.BASE_URL || 'http://localhost:4242';

export const fetchUsers = async (userId: string) => {
	try {
		const res = await fetch(`${BASE_URL}/users/${userId}`);
		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const fetchPokemons = async (userId: string) => {
	try {
		const res = await fetch(`${BASE_URL}/pokemons/${userId}`);
		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};
