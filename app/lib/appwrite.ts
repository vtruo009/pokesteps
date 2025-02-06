import { Account, Client, ID } from 'react-native-appwrite';
import { createUserInDatabase } from './database';

export const config = {
	endpoint: 'https://cloud.appwrite.io/v1',
	platform: 'com.vantruong.Pokesteps',
	projectId: '67a121780008aa706a61',
	storageId: '67a1234700051042a105',
};

const client = new Client();

client
	.setEndpoint(config.endpoint)
	.setProject(config.projectId)
	.setPlatform(config.platform);

const account = new Account(client);

export const createUser = async (email: string, password: string) => {
	try {
		const newAccount = await account.create(ID.unique(), email, password);

		if (!newAccount) throw new Error('Failed to create user');

		await signIn(email, password);
		const newUser = await createUserInDatabase(newAccount.$id, email, password);

		return newUser;
	} catch (error) {
		console.log('Error creating user:', error);
		throw error;
	}
};

export const signIn = async (email: string, password: string) => {
	try {
		const session = await account.createEmailPasswordSession(email, password);

		return session;
	} catch (error) {
		console.log('Error signing in:', error);
		throw error;
	}
};
