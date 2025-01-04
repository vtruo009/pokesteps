import PokemonType from '@/components/PokemonType';
import { render, screen } from '@testing-library/react-native';

describe('<PokemonType />', () => {
	it('should render the Pokémon type(s)', () => {
		render(<PokemonType type='Electric' />);

		const type = screen.getByRole('text');

		expect(type.children[0]).toEqual('Electric');
	});
});
