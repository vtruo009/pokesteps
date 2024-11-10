import { Pokemon } from '@/app/common/interface/pokemon.mixin';
import { router } from 'expo-router';
import { Image, TouchableOpacity, Text, View, Dimensions } from 'react-native';

interface PokemonCardProps {
	pokemon: Pokemon;
	height?: number;
	width?: number;
}

// TODO: Change to open Pokemon details screen
const handlePress = (pokemon: Pokemon) => {
	console.log(`${pokemon.name} details`);
	// router.push('/root/pokemon-details');
	router.navigate({
		pathname: '/root/pokemon-details',
		params: { ...pokemon },
	});
};

const PokemonCard = ({
	pokemon,
	height = 36,
	width = 36,
}: PokemonCardProps) => {
	const windowWidth = Dimensions.get('window').width;

	return (
		<View className='flex justify-center items-center'>
			<TouchableOpacity
				className={`rounded-full mx-[20px] mt-[25px] mb-[10px] p-2 bg-gray-200 w-${width} h-${height} flex justify-center items-center`}
				onPress={() => handlePress(pokemon)}
			>
				<Image
					source={{ uri: pokemon.image }}
					className='w-full h-full rounded-full'
					resizeMode='contain'
				/>
			</TouchableOpacity>
			<Text
				className={`text-center font-PixelifySans ${
					width == 36 ? '' : 'text-3xl'
				}`}
			>
				{pokemon.name}
			</Text>
		</View>
	);
};

export default PokemonCard;
