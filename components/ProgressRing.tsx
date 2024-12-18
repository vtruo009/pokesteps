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

const RADIUS = 150;
const STROKEWIDTH = 35;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface ProgressRingProps {
	progress: number;
	goalReached: boolean;
}

const ProgressRing = ({ progress = 0.0, goalReached }: ProgressRingProps) => {
	const { state, dispatch } = usePokemonContext();
	const [overlayVisible, setOverlayVisible] = useState(false);
	const innerRadius = RADIUS - STROKEWIDTH / 2;
	const circumference = 2 * Math.PI * innerRadius;
	const fill = useSharedValue(0);

	const animatedProps = useAnimatedProps(() => ({
		strokeDasharray: [circumference * fill.value, circumference],
	}));

	useEffect(() => {
		fill.value = withTiming(progress, { duration: 2000 });
	}, [progress]);

	const handlePress = () => {
		const randomId = Math.ceil(Math.random() * 151);

		dispatch({
			type: 'unlock_pokemon',
			payload: { ...state, randomId },
		});

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
			{goalReached && (
				<TouchableOpacity
					style={{
						width: RADIUS * 2,
						height: RADIUS * 2,
						borderRadius: RADIUS,
						justifyContent: 'center',
						alignItems: 'center',
						position: 'absolute',
						zIndex: 1,
					}}
					onPress={handlePress}
				>
					<Image
						source={require('../assets/images/icon.png')}
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
					stroke='#3C5AA6'
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
