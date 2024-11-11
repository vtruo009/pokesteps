// PokeAPI returns weight in hectogram and height in decimeter
const DM_TO_IN = 3.937;
const IN_IN_FT = 12;
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
	const heightInInches = height * DM_TO_IN;
	const heightInFeet = Math.round(heightInInches / IN_IN_FT).toString();
	const remainingInches = Math.round(heightInInches % IN_IN_FT).toString();
	return `${heightInFeet}' ${remainingInches.padStart(2, '0')}"`;
}
