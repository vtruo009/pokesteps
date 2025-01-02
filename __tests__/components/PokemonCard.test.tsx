import { Pokemon } from '@/app/common/interface/pokemon.mixin';
import PokemonCard from '@/components/PokemonCard';
import {
	render,
	screen,
	userEvent,
	waitFor,
} from '@testing-library/react-native';
import { router } from 'expo-router';

jest.mock('expo-router', () => ({
	router: {
		push: jest.fn(() => console.debug('pushed')),
	},
}));

describe('<PokemonCard />', () => {
	var pokemon: Pokemon = {
		name: 'pikachu',
		id: 25,
		weight: 60,
		height: 4,
		types: ['electric'],
		unlocked: false,
	};

	it.each([
		['???', 'disabled', false],
		['pikachu', 'enabled', true],
	])(
		`should render %s and corresponding image, and button should be %s when unlocked is %s`,
		(expectedText, _, unlocked) => {
			render(
				<PokemonCard pokemon={{ ...pokemon, unlocked }} disabled={!unlocked} />
			);

			const name = screen.getByRole('text');
			const image = screen.getByRole('image');
			const button = screen.getByRole('button');

			expect(name.children[0]).toEqual(expectedText);
			expect(image.props.source.uri).toBe(
				`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
					unlocked ? pokemon.id : 0
				}.png`
			);
			unlocked ? expect(button).toBeEnabled() : expect(button).toBeDisabled();
		}
	);

	it('should call handlePress when button is pressed with the correct Pokémon', async () => {
		render(<PokemonCard pokemon={pokemon} disabled={false} />);

		const button = screen.getByTestId(`${pokemon.name}-card`);
		await userEvent.press(button);

		await waitFor(() =>
			expect(router.push).toHaveBeenCalledWith({
				pathname: '/(root)/pokemon-details',
				params: { pokemon: JSON.stringify(pokemon) },
			})
		);
	});
});
