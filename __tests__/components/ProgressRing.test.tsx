import React from 'react';
import { render, userEvent } from '@testing-library/react-native';
import ProgressRing from '@/components/ProgressRing';

jest.mock('@rneui/themed', () => ({
	Overlay: jest.fn(() => <></>),
	Icon: jest.fn(() => <></>),
}));

describe('<ProgressRing />', () => {
	it('should render the progress ring without Pokéball button when goal is not reached', () => {
		const screen = render(<ProgressRing progress={0.5} goalMet={false} />);

		const pokeball = screen.queryByRole('button');

		expect(pokeball).not.toBeVisible();
	});

	it('should render the progress ring with Pokéball button when goal is reached', () => {
		const screen = render(<ProgressRing progress={1} goalMet={true} />);

		const pokeball = screen.getByTestId('pokeball-button');

		expect(pokeball).toBeVisible();
		expect(pokeball).toBeEnabled();
	});

	it('should disable the Pokéball button and display overlay when it is pressed once', async () => {
		const screen = render(<ProgressRing progress={1} goalMet={true} />);

		const pokeball = screen.getByTestId('pokeball-button');
		await userEvent.press(pokeball);

		expect(pokeball).toBeDisabled();
	});
});
