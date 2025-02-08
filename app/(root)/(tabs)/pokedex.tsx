import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import PokemonCard from '@/components/PokemonCard';
import { SearchBar, Icon } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { UserPokemon } from '@/app/lib/interface/pokemon.mixin';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useGlobalContext } from '@/contexts/GlobalContext';
import { colors } from '@/app/lib/constants';

const filterPokemons = (pokemons: UserPokemon[], searchText: string) => {
	return pokemons.filter((pokemon) => {
		return (
			pokemon.name.toLowerCase().includes(searchText.toLowerCase()) &&
			pokemon.user_id != null
		);
	});
};

const Pokedex = () => {
	const { pokemons } = useGlobalContext();
	const insets = useSafeAreaInsets();
	const [searchText, setSearchText] = useState('');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (pokemons.length > 0) {
			setLoading(false);
		}
	}, [pokemons]);

	const handleOnChangeText = (text: string) => {
		setSearchText(text);
	};

	return (
		<View
			className='flex-1 justify-between bg-ghostWhite'
			style={{
				paddingTop: insets.top,
				paddingRight: insets.right,
				paddingLeft: insets.left,
			}}
		>
			<Text className='mx-5 font-JetBrainsMono' style={{ fontSize: wp('10%') }}>
				Pokedex
			</Text>
			<SearchBar
				placeholder='Search...'
				onChangeText={handleOnChangeText}
				value={searchText}
				platform='ios'
				searchIcon={<Icon name='search' type='flaticon' size={24} />}
				clearIcon={false}
				clearButtonMode='while-editing'
				containerStyle={{
					backgroundColor: colors.ghostWhite,
					marginHorizontal: 16,
					padding: 0,
				}}
				inputContainerStyle={{
					height: 64,
					backgroundColor: colors.ghostWhite,
					borderWidth: 2,
					borderBottomWidth: 2,
					borderColor: 'black',
					borderStyle: 'solid',
					borderRadius: 16,
				}}
				inputStyle={{
					width: '100%',
					backgroundColor: colors.ghostWhite,
				}}
			/>
			{loading ? (
				<ActivityIndicator size='large' style={{ flex: 1 }} />
			) : (
				<View className='flex-1 w-full h-full items-center'>
					<FlatList
						data={searchText ? filterPokemons(pokemons, searchText) : pokemons}
						renderItem={({ item: pokemon }) => (
							<PokemonCard
								pokemon={pokemon}
								disabled={pokemon.user_id == null}
							/>
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
