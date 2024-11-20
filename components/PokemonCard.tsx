import { Pokemon } from '@/app/common/interface/pokemon.interface';
import { Image, TouchableOpacity, Text, View, Dimensions } from 'react-native';

// TODO: Change to open Pokemon details screen
const handlePress = (pokemon: Pokemon) => {
	console.log(`${pokemon.name} details`);
};

const IMAGE_URL =
	'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

const PokemonCard = (pokemon: Pokemon) => {
	const windowWidth = Dimensions.get('window').width;

	return (
		<View>
			<TouchableOpacity
				className='rounded-full mx-[20px] mt-[25px] mb-[10px] p-2 bg-gray-200 w-36 h-36 flex justify-center items-center'
				disabled={!pokemon.unlocked}
				onPress={() => handlePress(pokemon)}
			>
				<Image
					source={{
						uri: `${IMAGE_URL}${pokemon.unlocked ? pokemon.id : '0'}.png`,
					}}
					className='w-full h-full rounded-full'
					resizeMode='contain'
				/>
			</TouchableOpacity>
			<Text className='text-center font-PixelifySans capitalize'>
				{pokemon.unlocked ? pokemon.name : '???'}
			</Text>
		</View>
	);
};

export default PokemonCard;
