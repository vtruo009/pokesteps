import axios, { AxiosResponse } from 'axios';
import { ApiRequestPrameters } from '../common/interface/api.interface';

// TODO: we should try not to use any types as it is not safe. Need to do more research on how to type this
export const pokemonAPI = async ({
	url,
	config,
}: ApiRequestPrameters): Promise<AxiosResponse<any, any> | undefined> => {
	switch (config.method) {
		case 'GET':
			return await axios.get(url, config);
		case 'POST':
			return await axios.post(url, config);
		case 'DELETE':
			return await axios.delete(url, config);
	}
};
