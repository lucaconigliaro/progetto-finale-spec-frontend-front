import { useEffect, useState } from "react";

// Variabile d'ambiente
const API_URL = import.meta.env.VITE_BACKEND_URL;

export default function useGames() {
    const [games, setGames] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Effettuo il fetch dei giochi principali
    useEffect(() => {
        fetch(`${API_URL}/games`)
            .then(res => res.json())
            .then(data => {
                setGames(data);
                setIsLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setIsLoading(false);
            });
    }, []);

    return { games, error, isLoading };
};