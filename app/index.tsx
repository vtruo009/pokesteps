import { Redirect } from "expo-router";

const Home = () => {
	return <Redirect href={"/tabs/pokedex"} />;
};

export default Home;
