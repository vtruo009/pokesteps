import { View, TouchableOpacity, Text } from 'react-native';
import { createUser } from '../lib/appwrite';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { APP_COLOR } from '../lib/constants';
import FormField from '@/components/FormField';

const SignUp = () => {
	const [form, setForm] = useState({
		name: '',
		email: '',
		password: '',
	});

	const handleSignUp = () => {
		createUser(form.name, form.email, form.password);
	};

	return (
		<SafeAreaView
			className='bg-white flex-1 text-start'
			style={{ paddingHorizontal: wp('10%'), paddingTop: hp('5%') }}
		>
			<Text className='text-4xl font-JetBrainsMono'>Sign Up</Text>
			<View className='flex flex-col justify-center items-center w-full mt-14'>
				<FormField
					label='Username'
					value={form.name}
					handleChangeText={(text: string) => setForm({ ...form, name: text })}
					autoCapitalize='words'
					otherStyles='mb-5'
				/>
				<FormField
					label='Email'
					value={form.email}
					handleChangeText={(text: string) => setForm({ ...form, email: text })}
					textContentType='emailAddress'
					keyboardType='email-address'
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
					onPress={handleSignUp}
					className='rounded-md mt-5'
					style={{
						width: wp('50%'),
						height: hp('5%'),
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: APP_COLOR.yellow,
					}}
				>
					<Text className='text-md font-JetBrainsMono text-center my-2'>
						Sign Up
					</Text>
				</TouchableOpacity>
				<View className='flex flex-row gap-x-1 justify-center items-center mt-2'>
					<Text className='font-JetBrainsMono text-sm'>
						Already have an account?
					</Text>
					<Text
						className='font-JetBrainsMonoExtraBold text-sm'
						style={{ color: APP_COLOR.blue }}
					>
						Sign in
					</Text>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default SignUp;
