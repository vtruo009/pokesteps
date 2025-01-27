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

		const getStepCounts = (
			date: Date,
			setStepCount: React.Dispatch<React.SetStateAction<number>>
		) => {
			const options: HealthInputOptions = {
				date: date.toISOString(),
				includeManuallyAdded: true,
			};

			appleHealthKit.getStepCount(
				options,
				(error: string, result: HealthValue) => {
					if (error) {
						// TODO: Throw exception?
						console.log('Error getting step count', error);
						return;
					}
					console.log(`${date.toDateString()} step count:`, result.value);
					setStepCount(Math.round(result.value));
				}
			);
		};

		const today = new Date();
		const yesterday = new Date(
			today.getFullYear(),
			today.getMonth(),
			today.getDate() - 1
		);

		getStepCounts(yesterday, setYesterdaySteps);
		const interval = setInterval(() => {
			getStepCounts(today, setTodaySteps);
			console.log('A minute has passed. Updating step count...', today);
		}, 60000);
		return () => clearInterval(interval);
	}, [permission]);

	return {
		todaySteps,
		yesterdaySteps,
	};
};

export default useHealthData;
