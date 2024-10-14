import axios, { AxiosResponse } from "axios";
import { ApiRequestPrameters } from "../interface/api.interface";

const createAPI = (baseUrl: string, headers?: Record<string,string>) => axios.create({
    baseURL: baseUrl,
    timeout: 1000,
    headers: headers
})

const pokemonApiInstance = createAPI('https://pokeapi.co/api/v2/')

// TODO: we should try not to use any types as it is not safe. Need to do more research on how to type this
export const pokemonAPI = async({method, url, config}: ApiRequestPrameters): Promise<AxiosResponse<any, any> | undefined> => {
    switch(method){
        case 'GET':
            return await pokemonApiInstance.get(url, config)
        case 'POST':
            return await pokemonApiInstance.post(url, config)
        case 'DELETE':
            return await pokemonApiInstance.delete(url, config)
    }
}