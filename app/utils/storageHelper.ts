import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: string) => {
	try {
		await AsyncStorage.setItem(key, JSON.stringify(value));
	} catch (error) {
		console.log('Error saving data', error);
	}
};

export const getItemForKey = async (key: string) => {
	try {
		const value = await AsyncStorage.getItem(key);
		if (value !== null) {
			return JSON.parse(value);
		}
	} catch (error) {
		console.log('Error getting data', error);
	}
};

export const removeItemForKey = async (key: string) => {
	try {
		await AsyncStorage.removeItem(key);
	} catch (error) {
		console.log('Error removing data', error);
	}
};
