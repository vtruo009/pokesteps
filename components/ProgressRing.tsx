import React from 'react';
import { View } from 'react-native';
import SVG, { Circle } from 'react-native-svg';

interface ProgressRingProps {
	radius?: number;
	strokeWidth?: number;
	progress: number;
}

const ProgressRing = ({
	radius = 150,
	strokeWidth = 35,
	progress = 0.0,
}: ProgressRingProps) => {
	const innerRadius = radius - strokeWidth / 2;
	const circumference = 2 * Math.PI * innerRadius;

	return (
		<View
			style={{
				width: radius * 2,
				height: radius * 2,
				alignSelf: 'center',
				justifyContent: 'center',
				marginTop: '10%',
			}}
		>
			<SVG>
				<Circle
					cx={radius}
					cy={radius}
					r={innerRadius}
					fill='transparent'
					strokeWidth={strokeWidth}
					strokeLinecap='round'
					stroke='black'
					opacity={0.4}
				/>
				<Circle
					cx={radius}
					cy={radius}
					r={innerRadius}
					fill='transparent'
					strokeWidth={strokeWidth}
					stroke='#3C5AA6'
					strokeDasharray={[circumference * progress, circumference]}
					strokeLinecap='round'
					rotation='-90'
					origin={[radius, radius]}
				/>
			</SVG>
		</View>
	);
};

export default ProgressRing;
