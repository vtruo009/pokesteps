import { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser } from '@/app/lib/appwrite';
import { UserPokemon } from '@/app/lib/interface/pokemon.mixin';
import { getUserPokemons } from '@/app/lib/database';

interface UserType {
	email: string;
	has_unlocked_today: boolean;
	id: string;
	user_id: string;
	password: string;
	step_goal: number;
}

interface GlobalContextType {
	isLoggedIn: boolean;
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
	currentUser: UserType | null;
	setCurrentUser: React.Dispatch<React.SetStateAction<UserType | null>>;
	isLoading: boolean;
	pokemons: UserPokemon[];
}

const DEFAULT_STATE: GlobalContextType = {
	isLoggedIn: false,
	setIsLoggedIn: () => null,
	currentUser: null,
	setCurrentUser: () => null,
	isLoading: true,
	pokemons: [],
};

const GlobalContext = createContext<GlobalContextType>(DEFAULT_STATE);

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [currentUser, setCurrentUser] = useState<UserType | null>(null);
	const [pokemons, setPokemons] = useState<UserPokemon[]>([]);

	useEffect(() => {
		getCurrentUser()
			.then((res) => {
				if (res) {
					getUserPokemons(res.user_id)
						.then((pokemons) => {
							setPokemons(pokemons);
						})
						.catch((error) => console.log(error));
					setIsLoggedIn(true);
					setCurrentUser(res);
				} else {
					setIsLoggedIn(false);
					setCurrentUser(null);
				}
			})
			.catch((error) => console.log(error))
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	return (
		<GlobalContext.Provider
			value={{
				isLoggedIn,
				setIsLoggedIn,
				currentUser,
				setCurrentUser,
				isLoading,
				pokemons,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

const useGlobalContext = () => {
	return useContext(GlobalContext);
};

export { GlobalProvider, useGlobalContext };
