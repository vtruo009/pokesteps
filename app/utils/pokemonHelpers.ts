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
	console.log(feet);
	const wholeFeet = Math.floor(feet);
	const remainingFeet = feet - wholeFeet;
	const inches = Math.round(remainingFeet * INCH_IN_FT);

	return `${wholeFeet > 1 ? `${wholeFeet}\' ` : ''}${
		wholeFeet === 0 && inches < 10
			? `${inches}`
			: inches.toString().padStart(2, '0')
	}"`;
}
