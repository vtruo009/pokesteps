import { Text, View } from 'react-native';
import React from 'react';
import useHealthData from '@/hooks/useHealthData';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressRing from '@/components/ProgressRing';

const STEP_GOAL = 10000;

export default function StepsHomeScreen() {
	const { todaySteps, yesterdaySteps } = useHealthData();
	const progress = todaySteps / STEP_GOAL;

	return (
		<SafeAreaView className='flex-1 justify-around items-center bg-white'>
			<ProgressRing progress={progress} />
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
