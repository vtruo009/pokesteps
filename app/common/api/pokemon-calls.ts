import { HttpStatusCode } from "axios";
import { pokemonAPI } from "./api";
import { ApiResponse } from "../interface/api.interface";

interface getPokemonInfoResponse {
	name: string;
}

export const getPokemonInfo = async (
	pokemonName: string
): Promise<ApiResponse<getPokemonInfoResponse>> => {
	const getPokemonURL = `pokemon/${pokemonName}`;
	const response = await pokemonAPI({ method: "GET", url: getPokemonURL });
	if (response?.status === HttpStatusCode.Ok) {
		return { data: response.data };
	} else {
		//TODO: how to type response structure for error and valid responses
		return { error: "something to indicate error here" };
	}
};
