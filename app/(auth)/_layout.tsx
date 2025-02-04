import React from 'react';
import { Stack } from 'expo-router';

const AuthLayout = () => {
	return (
		<>
			<Stack>
				<Stack.Screen name='sign-up' options={{ headerShown: false }} />
			</Stack>
		</>
	);
};

export default AuthLayout;
