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

	return <Redirect href='/(root)/(tabs)/steps' />;
};

export default Home;
