import { createContext } from 'react';
import useGames from '../Hooks/useGames';

export const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
    const { games, isLoading, error } = useGames();

    return (
        <GlobalContext.Provider value={{ games, isLoading, error }}>
            {children}
        </GlobalContext.Provider>
    );
};