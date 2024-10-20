import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons'
import Entypo from '@expo/vector-icons/Entypo';

export default function TabLayout() {
  return (
    <Tabs
        screenOptions={{
            tabBarActiveTintColor: '#000',
            headerStyle: {
                backgroundColor: '#fff',
            },
            headerShadowVisible: false,
            headerTintColor: '#000',
            tabBarStyle: {
                backgroundColor: '#fff',
            },
        }}
    >
        <Tabs.Screen
        name='steps'
        options={{
            title: 'Steps',
            tabBarIcon: ({ color, focused }) => (
                <Ionicons name="footsteps" size={24} color="#0000FF" />    
            ),
        }}
        />
        <Tabs.Screen
            name='pokedex'
            options={{
                title: 'Pokedex',
                tabBarIcon: ({ color, focused }) =>(
                    <Entypo name="star" size={24} color="#0000FF" />
                ),
            }}
            />

    </Tabs>
  );
}
