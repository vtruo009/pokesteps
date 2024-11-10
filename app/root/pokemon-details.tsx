import PokemonCard from '@/components/PokemonCard';
import { useRoute } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pokemon } from '../common/interface/pokemon.mixin';

const PokemonDetails = () => {
	const pokemon = useRoute().params as Pokemon;
	return (
		<SafeAreaView className='flex-1 w-full h-full justify-around bg-white'>
			<View className='flex-1 justify-center items-center'>
				<PokemonCard pokemon={pokemon} width={60} height={60} />
				<Text className='text-xl text-gray-500 font-PixelifySans'>{`#${pokemon.id
					?.toString()
					.padStart(4, '0')}`}</Text>
			</View>
		</SafeAreaView>
	);
};

export default PokemonDetails;
