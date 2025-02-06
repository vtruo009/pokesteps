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
