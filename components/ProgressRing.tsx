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
import { useGlobalContext } from '@/contexts/GlobalContext';
import { unlockPokemon } from '@/app/lib/database';

const RADIUS = wp('35%');
const STROKEWIDTH = 35;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface ProgressRingProps {
	progress: number;
	goalReached: boolean;
}

const ProgressRing = ({ progress = 0.0, goalReached }: ProgressRingProps) => {
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
			{goalReached && (
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
					stroke='bg-[#FFCB05] p-2 w-auto h-auto text-center justify-center rounded-lg'
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
