import { Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import useHealthData from '@/hooks/useHealthData';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressRing from '@/components/ProgressRing';
import { StatusBar } from 'expo-status-bar';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import EditStepGoal from '@/components/EditStepGoal';
import { signOut } from '@/app/lib/appwrite';
import { router } from 'expo-router';
import { useGlobalContext } from '@/contexts/GlobalContext';
import { updateHasUnlockedToday } from '@/app/lib/database';

const textSizes = {
	xl: hp('1.5%'),
	'2xl': hp('2%'),
	'4xl': hp('5%'),
	'6xl': hp('7%'),
};

const handleSignOut = async () => {
	try {
		const session = await signOut();
		if (session) {
			console.log('Signed out successfully');
			router.replace('/(auth)/sign-in');
		}
	} catch (error) {
		console.log('Error signing out:', error);
	}
};

export default function StepsHomeScreen() {
	const { todaySteps, yesterdaySteps } = useHealthData();
	const { currentUser } = useGlobalContext();
	const [stepGoal, setStepGoal] = useState(currentUser?.step_goal || 3000);
	const [goalReached, setGoalReached] = useState(false);
	const [visible, setVisible] = useState(false);
	const progress = todaySteps / stepGoal;

	useEffect(() => {
		if (todaySteps >= stepGoal) {
			setGoalReached(true);
		} else {
			setGoalReached(false);
		}
	}, [todaySteps, stepGoal]);

	useEffect(() => {
		const resetPress = () => {
			const reset = new Date();
			reset.setHours(24, 0, 0, 0);
			const timeToMidnight = reset.getTime() - Date.now();
			setTimeout(async () => {
				console.log('Resetting press...');
				await updateHasUnlockedToday(currentUser?.user_id);
			}, timeToMidnight);
		};

		resetPress();
	}, []);

	return (
		<SafeAreaView className='relative flex-1 justify-around items-center bg-white pb-20'>
			<StatusBar style='dark' />
			<TouchableOpacity
				style={{ position: 'absolute', top: hp('10%'), left: wp('10%') }}
				onPress={() => setVisible(true)}
			>
				<Image
					source={require('../../../assets/icons/edit-button.png')}
					style={{ width: 32, height: 32 }}
				/>
			</TouchableOpacity>
			<TouchableOpacity
				style={{ position: 'absolute', top: hp('10%'), right: wp('10%') }}
				onPress={handleSignOut}
			>
				<Image
					source={require('../../../assets/icons/logout.png')}
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
