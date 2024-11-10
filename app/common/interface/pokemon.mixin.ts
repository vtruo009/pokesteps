export enum PokemonTypes {
	NORMAL = 'normal',
	FIRE = 'fire',
	WATER = 'water',
	GRASS = 'grass',
	ELECTRIC = 'electric',
	POISON = 'poison',
	GROUND = 'ground',
	ROCK = 'rock',
	FAIRY = 'fairy',
	FIGHTING = 'fighting',
	PSYCHIC = 'psychic',
	BUG = 'bug',
	GHOST = 'ghost',
	STEEL = 'steel',
	DRAGON = 'dragon',
	ICE = 'ice',
	DARK = 'dark',
}

export interface Pokemon {
	name: string;
	url: string;
	image: string;
	id?: number;
	weight?: number;
	height?: number;
	types?: PokemonTypes[];
}
