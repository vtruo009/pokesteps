import { useState } from 'react';
import {
	View,
	Text,
	TextInput,
	Pressable,
	TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ErrorMessage from './ErrorMessage';
import { APP_COLOR } from '@/app/lib/constants';

interface EditStepGoalsProps {
	currentStepGoal: number | undefined;
	visible: boolean;
	setVisible: React.Dispatch<React.SetStateAction<boolean>>;
	setStepGoal: React.Dispatch<React.SetStateAction<number>>;
}

const EditStepGoal = ({
	currentStepGoal,
	visible,
	setVisible,
	setStepGoal,
}: EditStepGoalsProps) => {
	const [value, setValue] = useState('');
	const [errorType, setErrorType] = useState('');

	const onCancel = () => {
		setErrorType('');
		setVisible(false);
	};

	const onSave = async () => {
		const newGoal = parseInt(value);
		if (Number.isNaN(newGoal)) {
			setErrorType('blank');
		} else if (newGoal < 3000) {
			setErrorType('invalid');
		} else {
			setStepGoal(newGoal);
			setVisible(false);
		}
	};

	return (
		<Modal
			isVisible={visible}
			avoidKeyboard
			hasBackdrop
			backdropColor='gray'
			animationIn='zoomIn'
			animationInTiming={600}
			animationOut='zoomOut'
			animationOutTiming={600}
			style={{ justifyContent: 'center', alignItems: 'center' }}
		>
			<View
				className='m-10 bg-white rounded-lg items-center justify-center'
				style={{ width: wp('80%'), height: 'auto', padding: wp('5%') }}
			>
				<Text className='text-3xl m-1 font-JetBrainsMonoBold'>
					Edit Step Goal
				</Text>
				<Text className='text-lg m-1 font-JetBrainsMonoBold'>
					Current: {currentStepGoal}
				</Text>
				{errorType === '' ? null : <ErrorMessage errorType={errorType} />}
				<TextInput
					placeholder='Enter new step goal'
					keyboardType='number-pad'
					className='w-full border-2 border-black-200 rounded-lg px-4 py-2 m-1 font-JetBrainsMonoExtraLight'
					autoFocus
					clearButtonMode='while-editing'
					style={{ width: wp('50%'), height: 'auto' }}
					onChangeText={(text) => setValue(text)}
				/>
				<View className='flex flex-row justify-evenly items-center pt-2 px-4 w-full'>
					<TouchableOpacity
						className='w-2/5 border border-gray-300 rounded-xl px-3 py-2 m-1'
						onPress={onCancel}
					>
						<Text className='text-center font-JetBrainsMonoSemiBold'>
							Cancel
						</Text>
					</TouchableOpacity>
					<Pressable
						className='w-2/5 rounded-xl px-3 py-2 m-1'
						onPress={onSave}
						style={{
							backgroundColor: APP_COLOR.yellow,
						}}
					>
						<Text className='text-center font-JetBrainsMonoSemiBold'>Save</Text>
					</Pressable>
				</View>
			</View>
		</Modal>
	);
};

export default EditStepGoal;
