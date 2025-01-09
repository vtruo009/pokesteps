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

		const input = screen.getByPlaceholderText('Enter your new step goal');
		await userEvent.type(input, '5000');
		await userEvent.press(screen.getByText('Save'));

		expect(mockedSetVisible).toHaveBeenCalledWith(false);
		expect(mockedSetStepGoal).toHaveBeenCalledWith(5000);
	});

	it('should not save new step goal and display error message if input is less than 3000', async () => {
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

		const input = screen.getByPlaceholderText('Enter your new step goal');
		await userEvent.type(input, '2000');
		await userEvent.press(screen.getByText('Save'));
		const errorMessage = screen.getByText('Must be at least 3000 steps');

		expect(errorMessage).toBeVisible();
		expect(mockedSetVisible).not.toHaveBeenCalled();
		expect(mockedSetStepGoal).not.toHaveBeenCalled();
	});
});
