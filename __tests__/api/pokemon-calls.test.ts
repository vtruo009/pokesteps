import { getPokemonInfo } from '@/app/common/api/pokemon-calls';
import {
	GET_POKEMON_INFO_RESPONSE,
	TEST_POKEMONS,
} from '../../app/utils/constants';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Pokemon Calls', () => {
	it('should get information of specified Pokémon', async () => {
		const req = {
			url: `https://pokeapi.co/api/v2/pokemon/3/`,
			config: {
				method: 'GET',
			},
		};
		mockedAxios.get.mockResolvedValue({
			status: 200,
			data: {
				id: 3,
				name: 'venusaur',
				weight: 1000,
				height: 20,
				types: [
					{
						slot: 1,
						type: {
							name: 'grass',
							url: 'https://pokeapi.co/api/v2/type/12/',
						},
					},
					{
						slot: 2,
						type: {
							name: 'poison',
							url: 'https://pokeapi.co/api/v2/type/4/',
						},
					},
				],
			},
		});

		const response = await getPokemonInfo(req.url);

		expect(axios.get).toHaveBeenCalledTimes(1);
		expect(axios.get).toHaveBeenCalledWith(req.url, req.config);
		expect(response.data).toEqual(GET_POKEMON_INFO_RESPONSE);
	});

	it.todo('shoudl get all Pokémons');
});
