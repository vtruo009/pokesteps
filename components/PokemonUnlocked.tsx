import { router } from 'expo-router';
import { Pressable, Text, View, Image } from 'react-native';
import { Overlay, Icon } from '@rneui/themed';
import { UserPokemon } from '@/app/lib/interface/pokemon.mixin';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface PokemonUnlockedProps {
	newPokemon: UserPokemon;
	visible: boolean;
	setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const position = {
	top: hp('3%'),
	right: wp('3%'),
};

const PokemonUnlocked = ({
	newPokemon,
	visible,
	setVisible,
}: PokemonUnlockedProps) => {
	return (
		<Overlay
			isVisible={visible}
			backdropStyle={{
				backgroundColor: 'rgba(0, 0, 0, 0.9)',
			}}
			overlayStyle={{
				backgroundColor: 'trasparent',
				width: '100%',
			}}
			fullScreen={true}
		>
			<View className='flex-1 justify-center items-center w-full h-full gap-y-24'>
				<Pressable
					onPress={() => {
						setVisible(false);
					}}
					style={{
						top: position.top,
						right: position.right,
						position: 'absolute',
					}}
				>
					<Icon
						name='close'
						type='ionicons'
						color='white'
						size={wp('9%')}
						className='relative z-10'
					/>
				</Pressable>
				<Text
					className=' text-white text-center font-JetBrainsMono'
					style={{ fontSize: wp('10%') }}
				>
					{`${newPokemon.name.toUpperCase()} UNLOCKED!`}
				</Text>
				<Image
					source={{
						uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${newPokemon.id}.png`,
					}}
					alt='pokemon'
					className='rounded-full'
					style={{ width: wp('60%'), height: wp('60%') }}
				/>
				<Pressable
					onPress={() => {
						router.replace('/(root)/(tabs)/pokedex');
						setVisible(false);
					}}
					className='p-2 w-auto h-auto text-center justify-center rounded-lg bg-yellow'
				>
					<Text
						className='text-black font-JetBrainsMonoBold uppercase'
						style={{ fontSize: wp('4%') }}
					>
						View in Pokedex
					</Text>
				</Pressable>
			</View>
		</Overlay>
	);
};

export default PokemonUnlocked;
