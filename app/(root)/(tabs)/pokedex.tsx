import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import PokemonCard from '@/components/PokemonCard';
import { usePokemonContext } from '@/contexts/PokemonContext';
import { SearchBar } from '@rneui/themed';
import { Icon } from 'react-native-elements';
import { useState } from 'react';
import { Pokemon } from '@/app/common/interface/pokemon.mixin';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const filterPokemons = (pokemons: Pokemon[], searchText: string) => {
	return pokemons.filter((pokemon) => {
		return (
			pokemon.name.toLowerCase().includes(searchText.toLowerCase()) &&
			pokemon.unlocked
		);
	});
};

const Pokedex = () => {
	const { state } = usePokemonContext();
	const [searchText, setSearchText] = useState('');

	const handleOnChangeText = (text: string) => {
		setSearchText(text);
	};

	return (
		<GestureHandlerRootView>
			<SafeAreaView className='flex-1 justify-between bg-white'>
				<Text className='text-5xl mx-5 mt-5 font-PixelifySans'>Pokedex</Text>
				<SearchBar
					placeholder='Search...'
					onChangeText={handleOnChangeText}
					value={searchText}
					platform='ios'
					searchIcon={<Icon name='search' type='flaticon' size={24} />}
					clearIcon={false}
					clearButtonMode='while-editing'
					containerStyle={{
						marginHorizontal: 10,
					}}
				/>
				<View className='flex items-center h-full'>
					<FlatList
						data={
							searchText
								? filterPokemons(state.pokemons, searchText)
								: state.pokemons
						}
						renderItem={({ item: pokemon }) => (
							<PokemonCard pokemon={pokemon} disabled={!pokemon.unlocked} />
						)}
						numColumns={2}
						initialNumToRender={10}
						columnWrapperStyle={{
							gap: wp('5%'),
						}}
						contentContainerStyle={{
							paddingBottom: wp('70%'),
							paddingHorizontal: wp('5%'),
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
						style={{
							width: '100%',
							margin: 'auto',
						}}
					/>
				</View>
			</SafeAreaView>
		</GestureHandlerRootView>
	);
};

export default Pokedex;
