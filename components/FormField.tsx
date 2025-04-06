import { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { icons } from '@/app/lib/constants';
import { Link } from 'expo-router';
import { useRoute } from '@react-navigation/native';

const FormField = ({
	label,
	placeholder,
	value,
	handleChangeText,
	otherStyles,
	...props
}: any) => {
	const [showPassword, setShowPassword] = useState(false);
	const route = useRoute();

	return (
		<View className={`space-y-2 ${otherStyles}`}>
			<Text className='text-md font-JetBrainsMono text-left'>{label}</Text>
			<View className='w-full h-16 px-4 rounded-2xl border-2 border-black-200 flex flex-row items-center'>
				<TextInput
					className='flex-1 text-black font-JetBrainsMono'
					placeholder={placeholder}
					placeholderTextColor='#7B7B8B'
					value={value}
					onChangeText={handleChangeText}
					secureTextEntry={label.includes('Password') && !showPassword}
					{...props}
				/>
				{label.includes('Password') && (
					<TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
						<Image
							source={showPassword ? icons.eyeHide : icons.eye}
							className='w-6 h-6'
							resizeMode='contain'
						/>
					</TouchableOpacity>
				)}
			</View>
			{label === 'Password' && route.name === 'sign-in' && (
				<Link
					href='./reset-password'
					className='font-JetBrainsMonoExtraBold text-sm text-blue text-right px-2'
				>
					Forgot password?
				</Link>
			)}
		</View>
	);
};

export default FormField;
