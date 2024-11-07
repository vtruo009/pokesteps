import { Image, TouchableOpacity, Text, View, Dimensions } from "react-native";

// TODO: Change to open Pokemon details screen
const handlePress = (pokemon: { name: string; url: string; image: string }) => {
	console.log(`${pokemon.name} details`);
};

const PokemonCard = (pokemon: { name: string; url: string; image: string }) => {
	const windowWidth = Dimensions.get("window").width;

	return (
		<View>
			<TouchableOpacity
				className='rounded-full mx-[20px] mt-[25px] mb-[10px] p-2 bg-gray-200 w-36 h-36 flex justify-center items-center'
				onPress={() => handlePress(pokemon)}
			>
				<Image
					source={{ uri: pokemon.image }}
					className='w-full h-full rounded-full'
					resizeMode='contain'
				/>
			</TouchableOpacity>
			<Text className='text-center font-PixelifySans'>{pokemon.name}</Text>
		</View>
	);
};

export default PokemonCard;
