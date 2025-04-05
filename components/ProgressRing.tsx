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
import { colors, images } from '@/app/lib/constants';
import { fetchPokemons } from '@/app/lib/fetch';

const RADIUS = wp('35%');
const STROKEWIDTH = 35;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface ProgressRingProps {
	progress: number;
	goalMet: boolean;
}

const ProgressRing = ({ progress = 0.0, goalMet }: ProgressRingProps) => {
	const { currentUser, pokemons, setPokemons } = useGlobalContext();
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

	const unlockPokemon = async () => {
		try {
			const lockedPokemonIds = await fetchPokemons(
				`${currentUser?.user_id}/locked-pokemon-ids`,
				{
					method: 'GET',
				}
			);
			const randomIndex = Math.ceil(Math.random() * lockedPokemonIds.length);
			setNewPokemonId(lockedPokemonIds[randomIndex]);

			await fetchPokemons(`${currentUser?.user_id}/unlock-pokemon`, {
				method: 'POST',
				body: JSON.stringify({
					newPokemonId: lockedPokemonIds[randomIndex],
				}),
			});

			const userPokemons = await fetchPokemons(`${currentUser?.user_id}`, {
				method: 'GET',
			});
			setPokemons(userPokemons);
		} catch (error) {
			console.log('Error unlocking pokemon:', error);
			throw error;
		}
	};

	const handlePress = async () => {
		try {
			setDisabled(true);
			setOverlayVisible(true);
			await unlockPokemon();
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
						source={images.pokeball}
						style={{ width: '70%', height: '70%' }}
					/>
				</TouchableOpacity>
			)}
			{newPokemonId != 0 && (
				<PokemonUnlocked
					newPokemon={pokemons.find((pokemon) => pokemon.id === newPokemonId)!}
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
					stroke={goalMet ? colors.yellow : colors.blue}
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
