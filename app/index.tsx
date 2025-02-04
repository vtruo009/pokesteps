import { Redirect } from 'expo-router';
import 'react-native-url-polyfill/auto';
import { useGlobalContext } from '@/contexts/GlobalContext';
import SignUp from './(auth)/sign-up';

const Home = () => {
	const { isLoading, isLoggedIn } = useGlobalContext();

	if (!isLoading && isLoggedIn) return <Redirect href='/(root)/(tabs)/steps' />;

	return <SignUp />;
};

export default Home;
