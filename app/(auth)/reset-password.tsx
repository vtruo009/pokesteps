import { useState } from 'react';
import FormField from '@/components/FormField';
import {
	SafeAreaView,
	View,
	TouchableOpacity,
	Text,
	Alert,
} from 'react-native';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { resetPassword } from '../lib/appwrite';
import { router } from 'expo-router';

const ResetPassword = ({ email }: { email: string }) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [form, setForm] = useState({
		email: '',
		newPassword: '',
		confirmNewPassword: '',
	});

	const handlePasswordReset = async () => {
		if (!form.newPassword || !form.confirmNewPassword) {
			Alert.alert('Error', 'Please fill in all the fields');
			return;
		}

		if (form.newPassword !== form.confirmNewPassword) {
			Alert.alert('Error', 'Passwords do not match');
			return;
		}

		setIsSubmitting(true);

		try {
			const response = await resetPassword(form.email, form.newPassword);
			if (response) {
				Alert.alert('Success', 'Password reset successfully');
				router.replace('/(auth)/sign-in');
			}
		} catch (error) {
			console.log('Error resetting password:', error);
			throw error;
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<SafeAreaView
			className='bg-ghostWhite flex-1 text-start'
			style={{ paddingHorizontal: wp('10%'), paddingTop: hp('5%') }}
		>
			<Text className='text-4xl font-JetBrainsMono'>Reset Password</Text>
			<View className='flex flex-col justify-center items-center w-full mt-14'>
				<FormField
					label='Email'
					textContentType='emailAddress'
					value={form.email}
					handleChangeText={(text: string) => setForm({ ...form, email: text })}
					autoCapitalize='none'
					otherStyles='mb-5'
				/>
				<FormField
					label='New Password'
					value={form.newPassword}
					handleChangeText={(text: string) =>
						setForm({ ...form, newPassword: text })
					}
					autoCapitalize='none'
					textContentType='password'
					otherStyles='mb-5'
				/>
				<FormField
					label='Confirm Password'
					value={form.confirmNewPassword}
					handleChangeText={(text: string) =>
						setForm({ ...form, confirmNewPassword: text })
					}
					textContentType='password'
					autoCapitalize='none'
					otherStyles='mb-7'
				/>
				<TouchableOpacity
					onPress={handlePasswordReset}
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
						Reset Password
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default ResetPassword;
