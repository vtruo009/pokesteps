import React, { useEffect } from 'react';
import { useState } from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import SVG, { Circle } from 'react-native-svg';
import PokemonUnlocked from './PokemonUnlocked';
import Animated, {
	useAnimatedProps,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { usePokemonContext } from '@/contexts/PokemonContext';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { APP_COLOR } from '@/app/utils/constants';
import {
	getItemForKey,
	setItemForKey,
	StorageKeys,
} from '@/app/utils/storageHelpers';

const RADIUS = wp('35%');
const STROKEWIDTH = 35;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface ProgressRingProps {
	progress: number;
	goalMet: boolean;
}

const resetPress = () => {
	const reset = new Date();
	reset.setHours(24, 0, 0, 0);
	const timeToMidnight = reset.getTime() - Date.now();
	console.log('timeToMidnight:', timeToMidnight);
	setTimeout(async () => {
		console.log('Resetting press...');
		await setItemForKey(StorageKeys.HAS_UNLOCKED, 'false');
		resetPress();
	}, timeToMidnight);
};

const ProgressRing = ({ progress = 0.0, goalMet }: ProgressRingProps) => {
	const { state, dispatch } = usePokemonContext();
	const [overlayVisible, setOverlayVisible] = useState(false);
	const [disabled, setDisabled] = useState(false);
	const innerRadius = RADIUS - STROKEWIDTH / 2;
	const circumference = 2 * Math.PI * innerRadius;
	const fill = useSharedValue(0);

	const animatedProps = useAnimatedProps(() => ({
		strokeDasharray: [circumference * fill.value, circumference],
	}));

	// useEffect(() => {
	// 	const interval = setInterval(() => {
	// 		console.log('Check if it is time to reset...');
	// 		resetPress();
	// 	}, 60000);
	// 	return () => clearInterval(interval);
	// }, []);

	useEffect(() => {
		fill.value = withTiming(progress, { duration: 2000 });
	}, [progress]);

	useEffect(() => {
		const getHasUnlocked = async () => {
			const hasUnlocked = await getItemForKey(StorageKeys.HAS_UNLOCKED);
			setDisabled(hasUnlocked === 'true');
		};

		getHasUnlocked().catch((error) => console.log(error));
	});

	const handlePress = async () => {
		const randomId = Math.ceil(Math.random() * state.lockedPokemonIds.size);

		dispatch({
			type: 'unlock_pokemon',
			payload: { ...state, randomId },
		});

		setDisabled(true);
		await setItemForKey(StorageKeys.HAS_UNLOCKED, 'true');
		setOverlayVisible(true);
	};

	return (
		<View
			style={{
				width: RADIUS * 2,
				height: RADIUS * 2,
				alignSelf: 'center',
				justifyContent: 'center',
				marginTop: '10%',
			}}
		>
			{goalMet && (
				<TouchableOpacity
					testID='pokeball-button'
					style={{
						width: RADIUS * 2,
						height: RADIUS * 2,
						borderRadius: RADIUS,
						justifyContent: 'center',
						alignItems: 'center',
						position: 'absolute',
						zIndex: 1,
					}}
					disabled={disabled}
					onPress={handlePress}
				>
					<Image
						source={require('../assets/images/pokeball.png')}
						style={{ width: '70%', height: '70%' }}
					/>
				</TouchableOpacity>
			)}
			<PokemonUnlocked
				visible={overlayVisible}
				setVisible={setOverlayVisible}
			/>
			<SVG>
				<Circle
					cx={RADIUS}
					cy={RADIUS}
					r={innerRadius}
					fill='transparent'
					strokeWidth={STROKEWIDTH}
					strokeLinecap='round'
					stroke='black'
					opacity={0.4}
				/>
				<AnimatedCircle
					cx={RADIUS}
					cy={RADIUS}
					r={innerRadius}
					fill='transparent'
					strokeWidth={STROKEWIDTH}
					stroke={`${goalMet ? APP_COLOR.yellow : APP_COLOR.blue}`}
					animatedProps={animatedProps}
					strokeLinecap='round'
					rotation='-90'
					origin={[RADIUS, RADIUS]}
				/>
			</SVG>
		</View>
	);
};

export default ProgressRing;
