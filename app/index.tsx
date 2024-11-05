import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, Button } from "react-native";
import { getPokemonInfo } from "./common/api/pokemon-calls";
import appleHealthKit, {
	HealthInputOptions,
	HealthKitPermissions,
	HealthValue,
} from "react-native-health";

const Home = () => {
	// Next few lines of code are just for reference. Can be removed once everyone gets more accustomed to using call structure.
	const [pokemon, setPokemon] = useState("pokemon");
	const [permission, setPermission] = useState(false);
	const [todaySteps, setTodaySteps] = useState(0);
	const [yesterdaySteps, setYesterdaySteps] = useState(0);

	const permissions: HealthKitPermissions = {
		permissions: {
			read: [appleHealthKit.Constants.Permissions.Steps],
			write: [],
		},
	};

	let today = new Date(2024, 10, 3);

	useEffect(() => {
		appleHealthKit.initHealthKit(permissions, (error: string) => {
			if (error) {
				// TODO: Throw exception?
				console.log(error);
				return;
			}
			setPermission(true);
		});
	});

	useEffect(() => {
		if (!permission) {
			return;
		}

		const options: HealthInputOptions = {
			date: today.toISOString(),
			includeManuallyAdded: true,
		};

		appleHealthKit.getStepCount(
			options,
			(error: string, result: HealthValue) => {
				if (error) {
					// TODO: Throw exception?
					console.log(error);
					return;
				}
				setTodaySteps(result.value);
				console.log(result);
			}
		);
	}, [permission]);

	const testGetPokemon = async () => {
		const dittoInfo = await getPokemonInfo("ditto");
		if (dittoInfo.data) {
			console.log(dittoInfo.data);
			setPokemon(dittoInfo.data.name);
		}
	};

	const clearPokemon = () => {
		console.log("CLEAR");
		setPokemon("");
	};
	// can delete this ^ once comfortable

	const [dateEntered, setDateEntered] = useState("2022-01-01");

	return (
		<SafeAreaView>
			<Text>pokemon is {pokemon}</Text>
			<Button title='test get ditto' onPress={testGetPokemon} />
			<Button title='clear pokemon' onPress={clearPokemon} />
			<Text>today steps: {todaySteps}</Text>
		</SafeAreaView>
	);
};

export default Home;
