import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pokemon } from '../interface/pokemon.mixin';

export enum StorageKeys {
	HAS_LAUNCHED = 'HAS_LAUNCHED',
	POKEMONS = 'POKEMONS',
	STEP_GOAL = 'STEP_GOAL',
	LOCKED_POKEMON_IDS = 'LOCKED_POKEMON_IDS',
}

export const setItemForKey = async (key: string, value: string) => {
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

export const initializeData = async (lockedPokemonIds: Set<number>) => {
	try {
		await setItemForKey(
			StorageKeys.LOCKED_POKEMON_IDS,
			[...lockedPokemonIds].join(',')
		);
	} catch (error) {
		throw error;
	}
};

export const loadData = async (): Promise<
	{ pokemons: Pokemon[]; lockedIds: Set<number> } | undefined
> => {
	try {
		const pokemons = await getItemForKey(StorageKeys.POKEMONS);
		const lockedPokemonIds = await getItemForKey(
			StorageKeys.LOCKED_POKEMON_IDS
		);

		if (pokemons && lockedPokemonIds) {
			return {
				pokemons: JSON.parse(pokemons),
				lockedIds: new Set(lockedPokemonIds.split(',').map(Number)),
			};
		}
	} catch (error) {
		throw error;
	}
};
