import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import PokemonCard from '@/components/PokemonCard';
import { usePokemonContext } from '@/contexts/PokemonContext';
import { SearchBar, Icon } from '@rneui/themed';
import { useEffect, useState } from 'react';
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
	const insets = useSafeAreaInsets();
	const { state } = usePokemonContext();
	const [searchText, setSearchText] = useState('');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (state.pokemons.length > 0) {
			setLoading(false);
		}
	}, [state.pokemons]);

	const handleOnChangeText = (text: string) => {
		setSearchText(text);
	};

	return (
		<View
			className='flex-1 justify-between bg-white'
			style={{
				paddingTop: insets.top,
				paddingRight: insets.right,
				paddingLeft: insets.left,
			}}
		>
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
			{loading ? (
				<ActivityIndicator size='large' style={{ flex: 1 }} />
			) : (
				<View className='flex-1 w-full h-full items-center'>
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
						contentContainerStyle={{
							paddingBottom: wp('25%'),
							paddingHorizontal: 0,
							marginHorizontal: 0,
						}}
					/>
				</View>
			)}
		</View>
	);
};

export default Pokedex;
