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
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { APP_COLOR } from '@/app/lib/constants';
import { setItemForKey, StorageKeys } from '@/app/lib/utils/storageHelpers';
import { useGlobalContext } from '@/contexts/GlobalContext';
import { unlockPokemon } from '@/app/lib/database';

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
	const { currentUser, pokemons } = useGlobalContext();
	const [newPokemonId, setNewPokemonId] = useState(0);
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

	const handlePress = async () => {
		try {
			const randomPokemonId = await unlockPokemon(currentUser?.user_id);

			setNewPokemonId(randomPokemonId);
			setDisabled(true);
			setOverlayVisible(true);
		} catch (error) {
			console.log(error);
		}
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
					disabled={disabled || currentUser?.has_unlocked_today}
					onPress={handlePress}
				>
					<Image
						source={require('../assets/images/pokeball.png')}
						style={{ width: '70%', height: '70%' }}
					/>
				</TouchableOpacity>
			)}
			{overlayVisible && (
				<PokemonUnlocked
					newPokemon={pokemons[newPokemonId]}
					visible={overlayVisible}
					setVisible={setOverlayVisible}
				/>
			)}
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
