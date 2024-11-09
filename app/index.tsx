import { useState } from 'react';
import { Text, SafeAreaView, Button } from 'react-native';
import { getPokemonInfo } from './common/api/pokemon-calls';
import useHealthData from '../hooks/useHealthData';
import ProgressRing from '@/components/ProgressRing';
import { Redirect, router } from 'expo-router';

const Home = () => {
	// Next few lines of code are just for reference. Can be removed once everyone gets more accustomed to using call structure.
	const [pokemon, setPokemon] = useState('pokemon');
	const { todaySteps, yesterdaySteps } = useHealthData();

	const testGetPokemon = async () => {
		const dittoInfo = await getPokemonInfo('ditto');
		if (dittoInfo.data) {
			console.log(dittoInfo.data);
			setPokemon(dittoInfo.data.name);
		}
	};

	const clearPokemon = () => {
		console.log('CLEAR');
		setPokemon('');
	};
	// can delete this ^ once comfortable

	// TODO: Replace all testing code with <Redirect href='/root/tabs' /> once we verify that everything works
	return (
		<SafeAreaView
			style={{
				flex: 1,
				justifyContent: 'space-evenly',
				alignItems: 'center',
			}}
		>
			<ProgressRing progress={0.2} />
			<Text>pokemon is {pokemon}</Text>
			<Button title='test get ditto' onPress={testGetPokemon} />
			<Button title='clear pokemon' onPress={clearPokemon} />
			<Text>today steps: {todaySteps}</Text>
			<Text>yesterday steps: {yesterdaySteps}</Text>
			<Button
				title='Go to tabs'
				onPress={() => router.navigate('/root/tabs')}
			/>
		</SafeAreaView>
	);
};

export default Home;
