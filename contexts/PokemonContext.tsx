import { Pokemon } from '@/app/lib/interface/pokemon.mixin';
import { StorageKeys, setItemForKey } from '@/app/lib/utils/storageHelpers';
import PokemonType from '@/components/PokemonType';
import { store } from 'expo-router/build/global-state/router-store';
import React from 'react';

interface PokemonType {
	randomId: number;
	pokemons: Pokemon[];
	lockedPokemonIds: Set<number>;
}

interface Action {
	type: 'add_pokemons' | 'unlock_pokemon';
	payload: PokemonType;
}

const DEFAULT_STATE: PokemonType = {
	randomId: 0,
	pokemons: [],
	lockedPokemonIds: new Set(),
};

const PokemonContext = React.createContext<{
	state: PokemonType;
	dispatch: React.Dispatch<Action>;
}>({
	state: DEFAULT_STATE,
	dispatch: () => null,
});

function pokemonReducer(state: PokemonType, action: Action): PokemonType {
	const { type, payload } = action;

	switch (type) {
		case 'add_pokemons':
			return {
				...state,
				pokemons: [...payload.pokemons],
				lockedPokemonIds: payload.lockedPokemonIds,
			};
		case 'unlock_pokemon':
			state.pokemons[payload.randomId].unlocked = true;
			state.lockedPokemonIds.delete(payload.randomId);
			setItemForKey(StorageKeys.POKEMONS, JSON.stringify(state.pokemons)).catch(
				(error) => console.log('Error saving Pokémons', error)
			);
			setItemForKey(
				StorageKeys.LOCKED_POKEMON_IDS,
				[...state.lockedPokemonIds].join(',')
			).catch((error) => console.log('Error saving locked Pokémon IDs', error));
			return {
				randomId: payload.randomId,
				pokemons: [...state.pokemons],
				lockedPokemonIds: state.lockedPokemonIds,
			};
		default:
			return state;
	}
}

function PokemonProvider({ children }: { children: React.ReactNode }) {
	const [state, dispatch] = React.useReducer(pokemonReducer, DEFAULT_STATE);

	return (
		<PokemonContext.Provider value={{ state, dispatch }}>
			{children}
		</PokemonContext.Provider>
	);
}

function usePokemonContext() {
	return React.useContext(PokemonContext);
}

export { PokemonProvider, usePokemonContext };
