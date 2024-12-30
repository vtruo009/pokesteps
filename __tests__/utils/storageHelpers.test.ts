import { getItemForKey, StorageKeys } from '@/app/utils/storageHelpers';

describe('Storage Helpers', () => {
	it('should get item from storage', async () => {
		const hasLaunched = await getItemForKey(StorageKeys.HAS_LAUNCHED);
		expect(hasLaunched).toBeUndefined();
	});
	// it.each([
	// 	[StorageKeys.HAS_LAUNCHED, 'true'],
	// 	[StorageKeys.POKEMONS, '[]'],
	// 	[StorageKeys.STEP_GOAL, '10000'],
	// ])('should store item in storage', async (key, value) => {});
});
