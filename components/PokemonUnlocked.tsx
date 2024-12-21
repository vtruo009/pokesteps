import { router } from 'expo-router';
import { Pressable, Text, View, Image } from 'react-native';
import { Icon, Overlay } from 'react-native-elements';
import { usePokemonContext } from '@/contexts/PokemonContext';
import { Pokemon } from '@/app/common/interface/pokemon.mixin';

interface PokemonUnlockedProps {
	visible: boolean;
	setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const PokemonUnlocked = ({ visible, setVisible }: PokemonUnlockedProps) => {
	const { state } = usePokemonContext();
	const newPokemon: Pokemon = state.pokemons[state.randomId];

	return (
		<Overlay
			isVisible={visible}
			backdropStyle={{
				backgroundColor: 'rgba(0, 0, 0, 0.9)',
			}}
			overlayStyle={{
				backgroundColor: 'trasparent',
				width: 'auto',
			}}
		>
			<View className='flex-1 justify-center items-center w-full h-full gap-y-24'>
				<Pressable
					onPress={() => {
						console.log('close overlay');
						setVisible(false);
					}}
					className='w-auto h-auto absolute top-20 right-0'
				>
					<Icon
						name='close'
						type='ionicons'
						color='white'
						size={30}
						className='relative z-10'
					/>
				</Pressable>
				<Text className='text-5xl text-white text-center font-PixelifySans'>
					{`${newPokemon?.name.toUpperCase()} UNLOCKED!`}
				</Text>
				<Image
					source={{
						uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${newPokemon?.id}.png`,
					}}
					alt='pokemon'
					className='w-[200px] h-[200px] bg-gray-50 rounded-full'
				/>
				<Pressable
					onPress={() => {
						router.replace('/(root)/(tabs)/pokedex');
						setVisible(false);
					}}
					className='bg-[#FFCB05] p-2 w-auto h-auto text-center justify-center rounded-lg'
				>
					<Text className='text-black font-PixelifySans uppercase'>
						View in Pokedex
					</Text>
				</Pressable>
			</View>
		</Overlay>
	);
};

export default PokemonUnlocked;
