import { Image, TouchableOpacity, Text, View, StyleSheet} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// TODO: Change to open Pokemon details screen
const handlePress = (pokemon: { name: string; url: string; image: string }) => {
	console.log(`${pokemon.name} details`);
};

const PokemonCard = (pokemon: { name: string; url: string; image: string }) => {
	return (
		<View style={styles.cardContainer}>
			<TouchableOpacity
				style={styles.touchable}
				onPress={() => handlePress(pokemon)}
			>
				<Image
					source={{ uri: pokemon.image }}
					style={styles.image}
					resizeMode='contain'
				/>
			</TouchableOpacity>
			<Text style={styles.name}>{pokemon.name}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	cardContainer: {
		alignItems: 'center',
		marginBottom: hp('2%'),
	},
	//Touchable Circle
	touchable: {
		borderRadius: wp('18'),
		marginHorizontal: wp('5%'),
		marginTop: hp('2'),
		backgroundColor: '#D9D9D9',
		width: wp('36%'),
		height: wp('36%'),
		justifyContent: 'center',
		alignItems: 'center',
	},
	//Pokemon image
	image: {
		width: '100%',
		height: '100%',
		borderRadius: wp('18%'),
	},
	//Pokemon names
	name: {
		textAlign: 'center',
		fontFamily: 'PixelifySans',
		fontSize: wp('4%'),
		marginTop: hp('1%')
	},
})

export default PokemonCard;
