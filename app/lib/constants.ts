import tailwindConfig from '@/tailwind.config.js';

export const { colors } = tailwindConfig.theme.extend;

// <a target="_blank" href="https://icons8.com/icon/WKMb0hRqjwdP/create">Create</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
export const icons = {
	eye: require('../../assets/icons/eye.png'),
	eyeHide: require('../../assets/icons/eye-hide.png'),
	editButton: require('../../assets/icons/edit-button.png'),
	logout: require('../../assets/icons/logout.png'),
	pokedex: require('../../assets/icons/pokedex.png'),
	sneaker: require('../../assets/icons/sneaker.png'),
	trophy: require('../../assets/icons/trophy.png'),
};

export const images = {
	pokeball: require('../../assets/images/pokeball.png'),
};
