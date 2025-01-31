import { getPokemonDetails } from '@/app/(api)/pokemon-calls';
import { Pokemon } from '@/app/common/interface/pokemon.mixin';

// PokeAPI returns weight in hectogram and height in decimeter
const DM_TO_FT = 0.328084;
const INCH_IN_FT = 12;
const KG_MULTIPLIER = 0.1;
const KG_TO_POUND = 2.2;

export function calculateWeight(weight: number) {
	const weightInKG = weight * KG_MULTIPLIER;
	const weightInPound = weightInKG * KG_TO_POUND;
	return weightInPound <= 1
		? `${weightInPound.toFixed(1)} lb`
		: `${weightInPound.toFixed(1)} lbs`;
}

export function calculateHeight(height: number) {
	const feet = height * DM_TO_FT;
	const wholeFeet = Math.floor(feet);
	const remainingFeet = feet - wholeFeet;
	const inches = Math.round(remainingFeet * INCH_IN_FT);

	return `${wholeFeet > 1 ? `${wholeFeet}\' ` : ''}${
		wholeFeet === 0 && inches < 10
			? `${inches}`
			: inches.toString().padStart(2, '0')
	}"`;
}

// export async function transformPokemonDetails(results: any): Promise<void> {
// 	try {
// 		for (const pokemon of results) {
// 			const pokemonInfo = await getPokemonDetails(pokemon.url);
// 			if (pokemonInfo.data) {
// 				const response = await fetch('/(api)/pokemons', {
// 					method: 'POST',
// 					body: JSON.stringify({
// 						id: pokemonInfo.data.id,
// 						name: pokemonInfo.data.name,
// 						types: pokemonInfo.data.types.map((type) => type.type.name),
// 						weight: pokemonInfo.data.weight,
// 						height: pokemonInfo.data.height,
// 					}),
// 				});
// 				if (!response.ok) {
// 					new Error(`HTTP error! status: ${response.status}`);
// 				}
// 			}
// 		}
// 	} catch (error) {
// 		throw new Error(`Error transforming pokemon data: ${error}`);
// 	}
// }
