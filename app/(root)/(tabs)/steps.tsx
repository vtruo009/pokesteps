import { Text, TouchableOpacity, View, Image, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import useHealthData from '@/hooks/useHealthData';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressRing from '@/components/ProgressRing';
import { StatusBar } from 'expo-status-bar';
import {
	getItemForKey,
	StorageKeys,
	setItemForKey,
} from '@/app/utils/storageHelpers';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import EditStepGoal from '@/components/EditStepGoal';

const textSizes = {
	xl: hp('1.5%'),
	'2xl': hp('2%'),
	'4xl': hp('5%'),
	'6xl': hp('7%'),
};

export default function StepsHomeScreen() {
	const { todaySteps, yesterdaySteps } = useHealthData();
	const [stepGoal, setStepGoal] = useState(3000);
	const [goalReached, setGoalReached] = useState(false);
	const [visible, setVisible] = useState(false);
	const progress = todaySteps / stepGoal;

	useEffect(() => {
		const getStepGoal = async () => {
			const data = await getItemForKey('STEP_GOAL');
			if (data) {
				console.log('Retrieved step goal from storage...', data);
				setStepGoal(JSON.parse(data));
			} else {
				console.log('Step goal not found in storage...');
				setItemForKey(StorageKeys.STEP_GOAL, '10000');
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
		setItemForKey(StorageKeys.STEP_GOAL, JSON.stringify(stepGoal)).catch(
			(error) => console.log(error)
		);
	}, [todaySteps, stepGoal]);

	return (
		<SafeAreaView className='relative flex-1 justify-around items-center bg-white pb-20'>
			<StatusBar style='dark' />
			<TouchableOpacity
				style={{ position: 'absolute', top: hp('10%'), right: wp('10%') }}
				onPress={() => setVisible(true)}
			>
				<Image
					source={require('../../../assets/icons/edit-button.png')}
					style={{ width: 32, height: 32 }}
				/>
			</TouchableOpacity>
			<EditStepGoal
				visible={visible}
				setVisible={setVisible}
				currentStepGoal={stepGoal}
				setStepGoal={setStepGoal}
			/>
			<ProgressRing progress={progress} goalReached={goalReached} />
			<View className='flex justify-center items-center font-JetBrainsMono'>
				<Text
					className='font-JetBrainsMono'
					style={{ fontSize: textSizes['6xl'] }}
				>
					{todaySteps.toLocaleString()}
				</Text>
				<Text
					className='font-JetBrainsMono'
					style={{ fontSize: textSizes['2xl'] }}
				>
					steps
				</Text>
			</View>
			<View className='flex justify-center items-center font-JetBrainsMono'>
				<Text
					className='font-JetBrainsMono'
					style={{ fontSize: textSizes['4xl'] }}
				>
					{yesterdaySteps.toLocaleString()}
				</Text>
				<Text className='font-JetBrainsMono' style={{ fontSize: textSizes.xl }}>
					yesterday
				</Text>
			</View>
		</SafeAreaView>
	);
}
