import { Text, TouchableOpacity, View, Image, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import useHealthData from '@/hooks/useHealthData';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressRing from '@/components/ProgressRing';
import { StatusBar } from 'expo-status-bar';
import {
	getItemForKey,
	StorageKeys,
	storeData,
} from '@/app/utils/storageHelper';

export default function StepsHomeScreen() {
	const { todaySteps, yesterdaySteps } = useHealthData();
	const [stepGoal, setStepGoal] = useState(10000);
	const [goalReached, setGoalReached] = useState(false);
	const progress = todaySteps / stepGoal;

	useEffect(() => {
		const getStepGoal = async () => {
			const data = await getItemForKey('STEP_GOAL');
			if (data) {
				console.log('Retrieved step goal from storage...', data);
				setStepGoal(JSON.parse(data));
			} else {
				console.log('Step goal not found in storage...');
				storeData(StorageKeys.STEP_GOAL, '10000');
			}
		};

		getStepGoal().catch((error) => console.log(error));
	}, []);

	useEffect(() => {
		if (todaySteps >= stepGoal) {
			setGoalReached(true);
		} else {
			setGoalReached(false);
		}
	}, [todaySteps, stepGoal]);

	const handlePress = () => {
		console.log('Editing step goal...');
		Alert.prompt(
			'Edit Step Goal',
			`Current step goal: ${stepGoal}\nEnter your new step goal`,
			[
				{
					text: 'Cancel',
					onPress: () => console.log('Cancel pressed'),
					style: 'cancel',
				},
				{
					text: 'Save',
					onPress: async (newGoal) => {
						console.log('New goal saved:', newGoal);
						if (newGoal) {
							setStepGoal(parseInt(newGoal));
							await storeData(StorageKeys.STEP_GOAL, newGoal);
						}
					},
				},
			]
		);
	};

	return (
		<SafeAreaView className='relative flex-1 justify-around items-center bg-white'>
			<StatusBar style='dark' />
			<TouchableOpacity
				className='absolute top-20 right-10'
				onPress={handlePress}
			>
				<Image
					source={require('../../../assets/icons/edit-button.png')}
					style={{ width: 32, height: 32 }}
				/>
			</TouchableOpacity>
			<ProgressRing progress={progress} goalReached={goalReached} />
			<View className='flex justify-center items-center font-PixelifySans'>
				<Text className='text-6xl font-PixelifySans'>
					{todaySteps.toLocaleString()}
				</Text>
				<Text className='text-2xl font-PixelifySans'>steps</Text>
			</View>
			<View className='flex justify-center items-center font-PixelifySans'>
				<Text className='text-4xl font-PixelifySans'>
					{yesterdaySteps.toLocaleString()}
				</Text>
				<Text className='text-xl font-PixelifySans'>yesterday</Text>
			</View>
		</SafeAreaView>
	);
}
