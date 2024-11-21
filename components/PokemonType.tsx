import { View, Text } from 'react-native';
import { PokemonTypeColors } from '@/app/common/interface/pokemon.mixin';

const PokemonType = ({ type }: { type: string }) => {
	return (
		<View
			style={{
				width: 100,
				height: 35,
				backgroundColor:
					PokemonTypeColors[
						type.toUpperCase() as keyof typeof PokemonTypeColors
					],
				borderRadius: 6,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				marginHorizontal: 6,
			}}
		>
			<Text className='font-PixelifySans text-lg uppercase'>{type}</Text>
		</View>
	);
};

export default PokemonType;
