import { createContext } from 'react';
import useGames from '../Hooks/useGames';
import useFavorites from "../Hooks/useFavorites";

export const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
    const { games, game, fetchGameById, categories, isLoading, error } = useGames();
    const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

    return (
        <GlobalContext.Provider
            value={{
                games,
                game,
                fetchGameById,
                categories,
                favorites,
                addFavorite,
                removeFavorite,
                isFavorite,
                isLoading,
                error
            }}>
            {children}
        </GlobalContext.Provider>
    );
};