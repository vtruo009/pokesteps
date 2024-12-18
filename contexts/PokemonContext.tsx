import { Pokemon } from '@/app/common/interface/pokemon.mixin';
import PokemonType from '@/components/PokemonType';
import React from 'react';

interface PokemonType {
	randomId: number;
	pokemons: Pokemon[];
}

interface Action {
	type: 'add_pokemons' | 'unlock_pokemon';
	payload: PokemonType;
}

const DEFAULT_STATE: PokemonType = {
	randomId: 0,
	pokemons: [],
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
			return { ...state, pokemons: [...payload.pokemons] };
		case 'unlock_pokemon':
			state.pokemons[payload.randomId].unlocked = true;
			return { ...state, randomId: payload.randomId };
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
