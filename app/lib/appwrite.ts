import { Account, Client, ID } from 'react-native-appwrite';
import { fetchAccounts, fetchUsers } from './fetch';
import Constants from 'expo-constants';

export const config = {
	endpoint:
		Constants.expoConfig?.extra?.APPWRITE_API_ENDPOINT ||
		process.env.EXPO_PUBLIC_APPWRITE_API_ENDPOINT ||
		'',
	platform:
		Constants.expoConfig?.extra?.APPWRITE_PLATFORM ||
		process.env.EXPO_PUBLIC_APPWRITE_PLATFORM ||
		'',
	projectId:
		Constants.expoConfig?.extra?.APPWRITE_PROJECT_ID ||
		process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID ||
		'',
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
		const newUser = await fetchUsers(newAccount.$id, {
			method: 'POST',
			body: JSON.stringify({ email, password }),
		});

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

		const currentUser = await fetchUsers(currentAccount.$id, {
			method: 'GET',
		});

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

export const resetPassword = async (email: string, newPassword: string) => {
	try {
		const user = await fetchAccounts(email, {
			method: 'GET',
		});

		if (!user) throw new Error('User not found');

		await signIn(email, user.password);
		const response = await account.updatePassword(newPassword, user.password);
		if (!response) throw new Error('Failed to reset password');
		await signOut();

		await fetchAccounts(`${user}/password`, {
			method: 'PATCH',
			body: JSON.stringify({ password: newPassword }),
		});

		return null;
	} catch (error) {
		console.log('Error resetting password:', error);
		throw error;
	}
};
