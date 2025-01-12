import EditStepGoal from '@/components/EditStepGoal';
import { render, userEvent } from '@testing-library/react-native';
import React from 'react';

describe('<EditStepGoal />', () => {
	it('should save new step goal', async () => {
		const mockedSetVisible = jest
			.fn()
			.mockImplementation(() => [true, jest.fn()]);
		const mockedSetStepGoal = jest
			.fn()
			.mockImplementation(() => [3000, jest.fn()]);
		const screen = render(
			<EditStepGoal
				currentStepGoal={3000}
				visible={true}
				setVisible={mockedSetVisible}
				setStepGoal={mockedSetStepGoal}
			/>
		);

		const input = screen.getByPlaceholderText('Enter new step goal');
		await userEvent.type(input, '5000');
		await userEvent.press(screen.getByText('Save'));

		expect(mockedSetVisible).toHaveBeenCalledWith(false);
		expect(mockedSetStepGoal).toHaveBeenCalledWith(5000);
	});

	it.each([
		['2000', 'Must be at least 3000 steps'],
		['', 'Please enter a number'],
	])(
		"should not save when input is '%s' and display the corresponding error message: %s",
		async (userInput, errorMsg) => {
			const mockedSetVisible = jest.fn(),
				mockedSetStepGoal = jest.fn();
			const screen = render(
				<EditStepGoal
					currentStepGoal={3000}
					visible={true}
					setVisible={mockedSetVisible}
					setStepGoal={mockedSetStepGoal}
				/>
			);

			const input = screen.getByPlaceholderText('Enter new step goal');
			await userEvent.type(input, userInput);
			await userEvent.press(screen.getByText('Save'));
			const errorMessage = screen.getByText(errorMsg);

			expect(errorMessage).toBeVisible();
			expect(mockedSetVisible).not.toHaveBeenCalled();
			expect(mockedSetStepGoal).not.toHaveBeenCalled();
		}
	);
});
