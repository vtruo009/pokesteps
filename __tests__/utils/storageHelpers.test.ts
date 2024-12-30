import {
	getItemForKey,
	removeItemForKey,
	StorageKeys,
	storeData,
} from '@/app/utils/storageHelpers';
import AsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

describe('Storage Helpers', () => {
	beforeEach(async () => {
		await removeItemForKey(StorageKeys.HAS_LAUNCHED);
	});

	it('should store item in storage', async () => {
		expect(await getItemForKey(StorageKeys.HAS_LAUNCHED)).toBeUndefined();
		await storeData(StorageKeys.HAS_LAUNCHED, 'true');
		expect(await getItemForKey(StorageKeys.HAS_LAUNCHED)).toBe('true');
	});

	it('should get item from storage and return undefined', async () => {
		const hasLaunched = await getItemForKey(StorageKeys.HAS_LAUNCHED);
		expect(hasLaunched).toBeUndefined();
		expect(AsyncStorage.getItem).toHaveBeenCalledWith(StorageKeys.HAS_LAUNCHED);
	});

	it('should get item from storage and return a value', async () => {
		const expectedHasLaunched = 'true';
		await storeData(StorageKeys.HAS_LAUNCHED, expectedHasLaunched);
		const hasLaunched = await getItemForKey(StorageKeys.HAS_LAUNCHED);
		expect(hasLaunched).toBeDefined();
		expect(hasLaunched).toBe(expectedHasLaunched);
	});
});
