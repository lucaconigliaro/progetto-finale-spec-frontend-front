// src/Hooks/useFavorites.js
import { useState, useEffect } from "react";

export default function useFavorites() {
    const [favorites, setFavorites] = useState([]);

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