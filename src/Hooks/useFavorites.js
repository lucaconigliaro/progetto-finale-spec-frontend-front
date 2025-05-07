import { useEffect, useState } from "react";

export default function useFavorites() {
    const [favorites, setFavorites] = useState(() => {
        const stored = localStorage.getItem("favorites");
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const addFavorite = (game) => {
        if (!favorites.find(fav => fav.id === game.id)) {
            setFavorites(prev => [...prev, game]);
        }
    };

    const removeFavorite = (id) => {
        setFavorites(prev => prev.filter(fav => fav.id !== id));
    };

    const isFavorite = (id) => {
        return favorites.some(fav => fav.id === id);
    };

    return {
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
    };
};