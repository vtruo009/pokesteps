import { View, TouchableOpacity, Text, Alert } from 'react-native';
import { getCurrentUser } from '../lib/appwrite';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FormField from '@/components/FormField';
import { Link, router } from 'expo-router';
import { signIn } from '../lib/appwrite';
import { useGlobalContext } from '@/contexts/GlobalContext';

const SignIn = () => {
	const { setCurrentUser, setIsLoggedIn } = useGlobalContext();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [form, setForm] = useState({
		email: '',
		password: '',
	});

	const handleSignIn = async () => {
		if (!form.email || !form.password)
			Alert.alert('Error', 'Missing required field(s)');

		setIsSubmitting(true);

		try {
			await signIn(form.email, form.password);
			const user = await getCurrentUser();

			setCurrentUser(user);
			setIsLoggedIn(true);

			router.replace('/(root)/(tabs)/steps');
		} catch (error) {
			Alert.alert('Error', `${(error as Error).message}`);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<SafeAreaView
			className='bg-ghostWhite flex-1 text-start'
			style={{ paddingHorizontal: wp('10%'), paddingTop: hp('5%') }}
		>
			<Text className='text-4xl font-JetBrainsMono'>Sign In</Text>
			<View className='flex flex-col justify-center items-center w-full mt-14'>
				<FormField
					label='Email'
					value={form.email}
					handleChangeText={(text: string) => setForm({ ...form, email: text })}
					autoCapitalize='none'
					otherStyles='mb-5'
				/>
				<FormField
					label='Password'
					value={form.password}
					handleChangeText={(text: string) =>
						setForm({ ...form, password: text })
					}
					textContentType='password'
					autoCapitalize='none'
					otherStyles='mb-7'
				/>
				<TouchableOpacity
					onPress={handleSignIn}
					className={`rounded-xl mt-5 bg-yellow items-center justify-center ${
						isSubmitting ? 'opacity-50' : ''
					}`}
					style={{
						width: wp('50%'),
						height: hp('5%'),
					}}
					disabled={isSubmitting}
				>
					<Text className='text-md font-JetBrainsMonoExtraBold text-center my-2'>
						Sign In
					</Text>
				</TouchableOpacity>
				<View className='flex flex-row gap-x-1 justify-center items-center mt-2'>
					<Text className='font-JetBrainsMono text-sm'>
						Don't have an account?
					</Text>
					<Link
						href='./sign-up'
						className='font-JetBrainsMonoExtraBold text-sm text-blue'
					>
						Sign up
					</Link>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default SignIn;
