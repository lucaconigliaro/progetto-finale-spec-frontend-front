import { useEffect, useState } from "react";

export default function useFavorites() {
    const [favorites, setFavorites] = useState(() => {
        const stored = localStorage.getItem("favorites");
        return stored ? JSON.parse(stored) : [];
    });

    // Salva ogni cambiamento dei preferiti nel localStorage
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    // Aggiunge un gioco ai preferiti
    const addFavorite = (game) => {
        if (!favorites.find((fav) => fav.id === game.id)) {
            setFavorites((prev) => [...prev, game]);
        }
    };

    // Rimuove un gioco dai preferiti
    const removeFavorite = (id) => {
        setFavorites((prev) => prev.filter((fav) => fav.id !== id));
    };

    // Verifica se un gioco è già presente nei preferiti,
    const isFavorite = (id) => {
        return favorites.some(fav => fav.id === id);
    };

    return {
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
    };
}