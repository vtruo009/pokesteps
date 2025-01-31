import { HttpStatusCode } from 'axios';
import { pokemonAPI } from './api';
import { ApiResponse } from '../common/interface/api.interface';

interface getPokemonInfoResponse {
	id: number;
	name: string;
	weight: number;
	height: number;
	types: {
		type: {
			name: string;
		};
	}[];
}

interface getPokemonsResponse {
	name: string;
	url: string;
}

export const getPokemonDetails = async (
	url: string
): Promise<ApiResponse<getPokemonInfoResponse>> => {
	const response = await pokemonAPI({ url, config: { method: 'GET' } });
	if (response?.status === HttpStatusCode.Ok) {
		return {
			data: {
				id: response.data.id,
				name: response.data.name,
				weight: response.data.weight,
				height: response.data.height,
				types: response.data.types,
			},
		};
	} else {
		//TODO: how to type response structure for error and valid responses
		return { error: 'something to indicate error here' };
	}
};

export const getPokemons = async (): Promise<
	ApiResponse<getPokemonsResponse[]>
> => {
	const url = 'pokemon?limit=151';
	const response = await pokemonAPI({ url, config: { method: 'GET' } });
	if (response?.status === HttpStatusCode.Ok) {
		return { data: response.data.results };
	} else {
		return { error: 'Error getting all Pokemons' };
	}
};

// TODO: Remove when database is ready
// export const getPokemonsLocally = () => {
// 	const data = require('../data/pokemons.json');
// 	return data.results;
// };
