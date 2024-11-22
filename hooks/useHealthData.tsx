import { useState, useEffect } from 'react';
import appleHealthKit, {
	HealthInputOptions,
	HealthKitPermissions,
	HealthValue,
} from 'react-native-health';

const useHealthData = () => {
	const [permission, setPermission] = useState(false);
	const [todaySteps, setTodaySteps] = useState(0);
	const [yesterdaySteps, setYesterdaySteps] = useState(0);

	const permissions: HealthKitPermissions = {
		permissions: {
			read: [appleHealthKit.Constants.Permissions.Steps],
			write: [],
		},
	};

	useEffect(() => {
		appleHealthKit.initHealthKit(permissions, (error: string) => {
			if (error) {
				// TODO: Throw exception?
				console.log(error);
				return;
			}
			setPermission(true);
		});
	});

	useEffect(() => {
		if (!permission) return;

		const today = new Date();
		const yesterday = new Date(
			today.getFullYear(),
			today.getMonth(),
			today.getDate() - 1
		);
		const options: HealthInputOptions = {
			startDate: yesterday.toISOString(),
			includeManuallyAdded: true,
		};

		appleHealthKit.getDailyStepCountSamples(
			options,
			(error: string, result: HealthValue[]) => {
				if (error) {
					// TODO: Throw exception?
					console.log('Error getting daily step count', error);
					return;
				}
				console.log('daily step count result', result);
				// TODO: Add check in case there is no data
				setTodaySteps(result[0].value);
				setYesterdaySteps(result[1].value);
			}
		);
	}, [permission]);

	return {
		todaySteps,
		yesterdaySteps,
	};
};

export default useHealthData;
