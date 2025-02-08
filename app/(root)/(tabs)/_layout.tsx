import { colors, icons } from '@/app/lib/constants';
import { Tabs } from 'expo-router';
import { View, Image, ImageSourcePropType } from 'react-native';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const TabIcon = ({
	source,
	focused,
}: {
	source: ImageSourcePropType;
	focused: boolean;
}) => {
	return (
		<View
			className={`rounded-[55px] w-14 h-12 items-center justify-center ${
				focused ? 'bg-ghostWhite' : ''
			}`}
		>
			<Image
				source={source}
				tintColor='black'
				resizeMode='contain'
				className='w-7 h-7'
			/>
		</View>
	);
};

function TabLayout() {
	return (
		<Tabs
			initialRouteName='index'
			screenOptions={{
				tabBarShowLabel: false,
				tabBarStyle: {
					backgroundColor: colors.yellow,
					borderRadius: 50,
					paddingBottom: 0,
					marginBottom: hp('3%'),
					marginHorizontal: wp('30%'),
					height: 65,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-around',
					flexDirection: 'row',
					position: 'absolute',
				},
			}}
		>
			<Tabs.Screen
				name='steps'
				options={{
					title: 'Steps',
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon focused={focused} source={icons.sneaker} />
					),
				}}
			/>
			<Tabs.Screen
				name='pokedex'
				options={{
					title: 'Pokedex',
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon focused={focused} source={icons.trophy} />
					),
				}}
			/>
		</Tabs>
	);
}

export default TabLayout;
