// Needed because the PokeAPI states that weight is returned in hectogram and height is in decimeter
const M_MULTIPLIER = 0.1;
const M_TO_FT = 3.28;
const KG_MULTIPLIER = 0.1;
const KG_TO_POUND = 2.2;

export function calculateWeight(weight: number) {
	const weightInKG = weight * KG_MULTIPLIER;
	const weightInPound = weightInKG * KG_TO_POUND;
	return weightInPound <= 1
		? `${weightInPound.toFixed(1)} lb`
		: `${weightInPound.toFixed(1)} lbs`;
}

export function calcualteHeight(height: number) {
	const heightInMeter = height;
}
