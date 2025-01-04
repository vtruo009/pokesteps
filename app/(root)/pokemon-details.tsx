import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';
import { Pokemon } from '../common/interface/pokemon.mixin';
import PokemonCard from '@/components/PokemonCard';
import { useRoute } from '@react-navigation/native';
import { calculateHeight, calculateWeight } from '../utils/pokemonHelpers';
import PokemonType from '@/components/PokemonType';

const PokemonDetails = () => {
	const pokemon = JSON.parse(useRoute().params?.pokemon) as Pokemon;

	return (
		<SafeAreaView className='flex-1 justify-evenly items-center bg-white'>
			<View className='flex items-center'>
				<PokemonCard pokemon={pokemon} width={60} disabled={true} />
				<Text className='text-xl text-gray-500 font-PixelifySans'>
					{`#${pokemon.id?.toString().padStart(4, '0')}`}
				</Text>
			</View>
			<View className='flex flex-row'>
				{pokemon.types.map((type, index) => (
					<PokemonType key={index} type={type} />
				))}
			</View>
			<View>
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
