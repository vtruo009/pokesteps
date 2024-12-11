import React from 'react';
import { useState } from 'react';
import { TouchableOpacity, View, Image, Text, Modal } from 'react-native';
import { FullWindowOverlay } from 'react-native-screens';
import SVG, { Circle } from 'react-native-svg';
import PokemonCard from './PokemonCard';
import PokemonUnlocked from './PokemonUnlocked';

const RADIUS = 150;
const STROKEWIDTH = 35;

interface ProgressRingProps {
	progress: number;
	goalReached: boolean;
}

const ProgressRing = ({ progress = 0.0, goalReached }: ProgressRingProps) => {
	const [visible, setVisible] = useState(false);
	const innerRadius = RADIUS - STROKEWIDTH / 2;
	const circumference = 2 * Math.PI * innerRadius;

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
					onPress={() => {
						console.log('Goal reached');
						setVisible(true);
					}}
				>
					<Image
						source={require('../assets/images/icon.png')}
						style={{ width: '70%', height: '70%' }}
					/>
				</TouchableOpacity>
			)}
			<PokemonUnlocked visible={visible} setVisible={setVisible} />
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
				<Circle
					cx={RADIUS}
					cy={RADIUS}
					r={innerRadius}
					fill='transparent'
					strokeWidth={STROKEWIDTH}
					stroke='#3C5AA6'
					strokeDasharray={[circumference * progress, circumference]}
					strokeLinecap='round'
					rotation='-90'
					origin={[RADIUS, RADIUS]}
				/>
			</SVG>
		</View>
	);
};

export default ProgressRing;
