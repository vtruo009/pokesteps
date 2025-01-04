import useHealthData from '@/hooks/useHealthData';
import { renderHook } from '@testing-library/react-native';
import React from 'react';
import appleHealthKit from 'react-native-health';

jest.mock('react-native-health', () => ({
	getAuthStatus: jest.fn(),
	getStepCount: jest.fn(),
	Constants: {
		Permissions: {
			Steps: 'Steps',
		},
	},
	initHealthKit: jest.fn().mockResolvedValue(true),
}));

describe('useHealthData', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should initalize appleHealthKit and get step count', () => {
		jest
			.spyOn(React, 'useState')
			.mockImplementationOnce(() => [true, jest.fn()]);
		jest.spyOn(React, 'useState').mockImplementationOnce(() => [0, jest.fn()]);
		jest.spyOn(React, 'useState').mockImplementationOnce(() => [0, jest.fn()]);

		renderHook(useHealthData);

		expect(appleHealthKit.initHealthKit).toHaveBeenCalled();
		expect(appleHealthKit.getStepCount).toHaveBeenCalledTimes(2);
	});
});
