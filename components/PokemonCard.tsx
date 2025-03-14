import { UserPokemon } from '@/app/lib/interface/pokemon.mixin';
import { router } from 'expo-router';
import { Image, TouchableOpacity, Text, View } from 'react-native';

interface PokemonCardProps {
	pokemon: UserPokemon;
	width?: number;
	disabled?: boolean;
}

const IMAGE_URL =
	'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

const handlePress = (pokemon: UserPokemon) => {
	console.log(`${pokemon.name} details`);
	router.push({
		pathname: '/(root)/pokemon-details',
		params: { pokemon: JSON.stringify(pokemon) },
	});
};

const PokemonCard = ({
	pokemon,
	width = 36,
	disabled = false,
}: PokemonCardProps) => {
	return (
		<View className='flex justify-center items-center'>
			{/*TODO: Determine styling format; TW does not like dynamic classNames like w-${width} */}
			<TouchableOpacity
				testID={`${pokemon.name}-card`}
				className={`flex justify-center items-center rounded-full mx-[20px] mt-[25px] mb-[10px] p-2 bg-white ${
					width == 36 ? 'w-36 h-36' : 'w-60 h-60'
				}`}
				disabled={disabled}
				onPress={() => handlePress(pokemon)}
				accessibilityRole='button'
			>
				<Image
					source={{
						uri: `${IMAGE_URL}${
							pokemon.user_id != null ? pokemon.id : '0'
						}.png`,
					}}
					className='w-full h-full rounded-full'
					resizeMode='contain'
					alt='pokemon image'
					accessibilityRole='image'
				/>
			</TouchableOpacity>
			<Text
				className={`text-center font-JetBrainsMono capitalize ${
					width == 36 ? '' : 'text-3xl'
				}`}
			>
				{pokemon.user_id != null ? pokemon.name : '???'}
			</Text>
		</View>
	);
};

export default PokemonCard;
