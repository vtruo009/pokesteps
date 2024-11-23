import { Button, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import useHealthData from '@/hooks/useHealthData';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressRing from '@/components/ProgressRing';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const STEP_GOAL = 10000;

export default function StepsHomeScreen() {
	// const { todaySteps, yesterdaySteps } = useHealthData();
	const todaySteps = 7500;
	const yesterdaySteps = 4000;
	const progress = todaySteps / STEP_GOAL;

	return (
		<SafeAreaView className='relative flex-1 justify-around items-center bg-white'>
			<StatusBar style='dark' />
			<TouchableOpacity className='absolute top-20 right-10' onPress={() => {}}>
				<Image
					source={require('../../../assets/icons/edit-button.png')}
					style={{ width: 32, height: 32 }}
				/>
			</TouchableOpacity>
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
