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
