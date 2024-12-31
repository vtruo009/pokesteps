import { Pokemon } from '@/app/common/interface/pokemon.mixin';
import PokemonCard from '@/components/PokemonCard';
import { render, screen, userEvent } from '@testing-library/react-native';

describe('<PokemonCard />', () => {
	var pokemon: Pokemon = {
		name: 'Pikachu',
		id: 25,
		weight: 60,
		height: 4,
		types: ['electric'],
		unlocked: false,
	};

	it.each([
		['???', 'disabled', false],
		['Pikachu', 'enabled', true],
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
});
