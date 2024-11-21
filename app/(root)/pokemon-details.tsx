import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';
import { Pokemon } from '../common/interface/pokemon.interface';
import PokemonCard from '@/components/PokemonCard';
import { useRoute } from '@react-navigation/native';
import { calculateHeight, calculateWeight } from '../utils/pokemonHelpers';

const PokemonDetails = () => {
	const pokemon = JSON.parse(useRoute().params?.pokemon) as Pokemon;

	return (
		<SafeAreaView className='flex-1 justify-around items-center bg-white'>
			<View className='flex items-center'>
				<PokemonCard pokemon={pokemon} width={60} height={60} />
				<Text className='text-xl text-gray-500 font-PixelifySans'>{`#${pokemon.id
					?.toString()
					.padStart(4, '0')}`}</Text>
			</View>
			<View className=''>
				<Text className='text-xl font-PixelifySans'>{`Height: ${calculateHeight(
					pokemon.height!
				)}`}</Text>
				<Text className='text-xl font-PixelifySans'>{`Weight: ${calculateWeight(
					pokemon.weight!
				)}`}</Text>
			</View>
		</SafeAreaView>
	);
};

export default PokemonDetails;
