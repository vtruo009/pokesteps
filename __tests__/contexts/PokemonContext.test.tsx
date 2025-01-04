import React from 'react';
import { render, userEvent, waitFor } from '@testing-library/react-native';
import { PokemonProvider } from '@/contexts/PokemonContext';
import TestPokemonContext, {
	TEST_POKEMONS,
} from '@/contexts/TestPokemonContext';

describe('PokemonContext', () => {
	it('renders correct number of Pokémons in Pokedex', () => {
		const screen = render(<TestPokemonContext />, { wrapper: PokemonProvider });

		const pokedex = screen.getByTestId('pokemon-list');

		expect(pokedex.props.data.length).toBe(3);
	});

	it('should call unlock_pokemon action and update unlocked state of given randomId', async () => {
		const expectedPokemon = TEST_POKEMONS[2];

		const screen = render(<TestPokemonContext />, { wrapper: PokemonProvider });
		const unlockButton = screen.getByRole('button', {
			name: 'Unlock Random Pokémon',
		});
		await userEvent.press(unlockButton);

		const name = screen.getByText('venusaur');
		const pokemonCard = screen.getByTestId(`${expectedPokemon.name}-card`, {});

		await waitFor(() => {
			expect(name.children[0]).toBe(expectedPokemon.name);
			expect(pokemonCard).toBeEnabled();
		});
	});
});
