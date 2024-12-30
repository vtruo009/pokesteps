import { calculateWeight, calculateHeight } from '@/app/utils/pokemonHelpers';

describe('Pokemon Helpers', () => {
	it.each([
		[43, '9.5 lbs'],
		[1, '0.2 lb'],
	])(
		'should calculate & format the Pokémon weight from %i hectograms to %s',
		(weight, formattedWeight) => {
			expect(calculateWeight(weight)).toBe(formattedWeight);
		}
	);

	it.each([
		[100, '32\' 10"'],
		[1, '4"'],
		[15.24, '5\' 00"'],
	])(
		'should calculate & format the Pokémon height from %i decimeters to %s',
		(height, formattedHeight) => {
			expect(calculateHeight(height)).toBe(formattedHeight);
		}
	);
});
