import { Tabs } from 'expo-router';
import { View, Image, ImageSourcePropType } from 'react-native';

const TabIcon = ({
	source,
	focused,
}: {
	source: ImageSourcePropType;
	focused: boolean;
}) => {
	return (
		<View
			className={`flex flex-row justify-center items-center w-full h-full ${
				focused ? 'bg-gray-300' : ''
			}`}
		>
			<View
				className={`rounded-[55px] w-14 h-12 items-center justify-center ${
					focused ? 'bg-white' : ''
				}`}
			>
				<Image
					source={source}
					tintColor={focused ? 'black' : 'white'}
					resizeMode='contain'
					className='w-7 h-7'
				/>
			</View>
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
					backgroundColor: '#FFCB05',
					borderRadius: 50,
					paddingBottom: 0,
					marginBottom: 25,
					marginHorizontal: 120,
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
						<TabIcon
							focused={focused}
							source={require('../../../assets/icons/footstep.png')}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name='pokedex'
				options={{
					title: 'Pokedex',
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon
							focused={focused}
							source={require('../../../assets/icons/pokedex.png')}
						/>
					),
				}}
			/>
		</Tabs>
	);
}

export default TabLayout;
