export const TEST_POKEMONS = [
	{
		id: 1,
		name: 'bulbasaur',
		unlocked: false,
		weight: 69,
		height: 7,
		types: ['grass', 'poison'],
	},
	{
		id: 2,
		name: 'ivysaur',
		unlocked: false,
		weight: 130,
		height: 10,
		types: ['grass', 'poison'],
	},
	{
		id: 3,
		name: 'venusaur',
		unlocked: false,
		weight: 1000,
		height: 20,
		types: ['grass', 'poison'],
	},
];

export const GET_POKEMON_INFO_RESPONSE = {
	id: TEST_POKEMONS[2].id,
	name: TEST_POKEMONS[2].name,
	weight: TEST_POKEMONS[2].weight,
	height: TEST_POKEMONS[2].height,
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
};

export const GET_POKEMONS_RESPONSE = {
	id: TEST_POKEMONS[2].id,
	name: TEST_POKEMONS[2].name,
	weight: TEST_POKEMONS[2].weight,
	height: TEST_POKEMONS[2].height,
	types: ['grass', 'poison'],
	unlocked: false,
};

export const icons = {
	eye: require('../../assets/icons/eye.png'),
	eyeHide: require('../../assets/icons/eye-hide.png'),
};
