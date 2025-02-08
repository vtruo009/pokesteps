import { Account, Client, ID } from 'react-native-appwrite';
import { createUserInDatabase, getUser } from './database';
import { fetchUser } from './fetch';

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

export const getAccount = async () => {
	try {
		const currentAccount = await account.get();

		return currentAccount;
	} catch (error) {
		console.log('Error getting account:', error);
		throw error;
	}
};

export const getCurrentUser = async () => {
	try {
		const currentAccount = await getAccount();

		if (!currentAccount) throw Error;

		const currentUser = await fetchUser(currentAccount.$id);

		if (!currentUser) throw Error;

		return currentUser;
	} catch (error) {
		console.log('Error getting current user:', error);
		throw error;
	}
};

export const signOut = async () => {
	try {
		const session = await account.deleteSession('current');

		return session;
	} catch (error) {
		console.log('Error signing out:', error);
		throw error;
	}
};
