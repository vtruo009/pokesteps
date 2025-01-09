import { useState } from 'react';
import {
	View,
	Text,
	TextInput,
	Pressable,
	TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';

import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface EditStepGoalsProps {
	currentStepGoal: number;
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
	const [valid, setValid] = useState(true);

	const handlePress = async () => {
		const newGoal = parseInt(value);
		if (newGoal < 3000) {
			setValid(false);
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
		>
			<View className='m-10 bg-white rounded-lg items-center justify-center p-5'>
				<Text className='text-3xl m-1 font-JetBrainsMonoBold'>
					Edit Step Goal
				</Text>
				<Text className='text-lg m-1 font-JetBrainsMonoMedium'>
					Current: {currentStepGoal}
				</Text>
				{valid ? null : (
					<Text className='text-md m-1 text-red-500'>
						Must be at least 3000 steps
					</Text>
				)}
				<TextInput
					placeholder='Enter new step goal'
					keyboardType='number-pad'
					className='border border-gray-300 rounded-md px-3 py-2 m-1  font-JetBrainsMonoExtraLight'
					autoFocus
					clearButtonMode='while-editing'
					style={{ width: wp('50%'), height: 'auto' }}
					onChangeText={(text) => setValue(text)}
				/>
				<View className='flex flex-row justify-evenly items-center pt-2 px-4 w-full'>
					<TouchableOpacity
						className='w-2/5 border border-gray-300 rounded-xl px-3 py-2 m-1'
						onPress={() => setVisible(false)}
					>
						<Text className='text-center font-JetBrainsMonoSemiBold'>
							Cancel
						</Text>
					</TouchableOpacity>
					<Pressable
						className='w-2/5 rounded-xl bg-[#FFCB05] px-3 py-2 m-1'
						onPress={handlePress}
					>
						<Text className='text-center font-JetBrainsMonoSemiBold'>Save</Text>
					</Pressable>
				</View>
			</View>
		</Modal>
	);
};

export default EditStepGoal;
