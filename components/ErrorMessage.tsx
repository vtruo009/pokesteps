import { Text } from 'react-native';

const STEP_GOAL_ERROR_MESSAGE: { [key: string]: string } = {
	invalid: 'Must be at least 3000 steps',
	blank: 'Please enter a number',
};

const ErrorMessage = ({ errorType }: { errorType: string }) => {
	return (
		<Text className='text-md m-1 text-red-500'>
			{STEP_GOAL_ERROR_MESSAGE[errorType]}
		</Text>
	);
};

export default ErrorMessage;
