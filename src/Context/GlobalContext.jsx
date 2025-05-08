import { createContext } from 'react';
import useGames from '../Hooks/useGames';
import useFavorites from "../Hooks/useFavorites";

export const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
    // Dati e funzioni dai custom hooks
    const { games, setGames, fetchGameById, categories, isLoading, error, addGame, deleteGame, updateGame } = useGames();
    const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

    return (
        <GlobalContext.Provider
            value={{
                games,          // Lista dei giochi
                setGames,       // Funzione per aggiornare la lista dei giochi
                fetchGameById,  // Funzione per recuperare un gioco per ID
                categories,     // Categorie dei giochi
                favorites,      // Giochi preferiti
                addFavorite,    // Aggiungi un gioco ai preferiti
                removeFavorite, // Rimuovi un gioco dai preferiti
                isFavorite,     // Verifica se un gioco è nei preferiti
                isLoading,      // Stato di caricamento
                error,          // Errore nel caricamento dei dati
                addGame,        // Funzione per aggiungere un gioco
                deleteGame,     // Funzione per eliminare un gioco
                updateGame      // Funzione per aggiornare un gioco
            }}>
            {children}
        </GlobalContext.Provider>
    );
};