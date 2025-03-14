export interface Pokemon {
	id: number;
	name: string;
	weight: number;
	height: number;
	types: string[];
}

export interface UserPokemon extends Pokemon {
	user_id: string;
	pokemon_id: number;
}

export interface UserPokemon extends Pokemon {
	user_id: string;
	pokemon_id: number;
}

export enum PokemonTypeColors {
	NORMAL = '#A8A77A',
	FIRE = '#EE8130',
	WATER = '#6390F0',
	ELECTRIC = '#F7D02C',
	GRASS = '#7AC74C',
	ICE = '#96D9D6',
	FIGHTING = '#C22E28',
	POISON = '#A33EA1',
	GROUND = '#E2BF65',
	FLYING = '#A98FF3',
	PSYCHIC = '#F95587',
	BUG = '#A6B91A',
	ROCK = '#B6A136',
	GHOST = '#735797',
	DRAGON = '#6F35FC',
	DARK = '#705746',
	STEEL = '#B7B7CE',
	FAIRY = '#D685AD',
}
