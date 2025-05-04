import { useEffect, useState } from "react";

// Variabile d'ambiente
const API_URL = import.meta.env.VITE_BACKEND_URL;

export default function useGames() {
    const [games, setGames] = useState([]);
    const [game, setGame] = useState(null);

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

    // Funzione per ottenere un gioco specifico tramite ID
    const fetchGameById = (id) => {
        fetch(`${API_URL}/games/${id}`)
            .then(res => res.json())
            .then(data => setGame(data.game))
            .catch(() => setError("Gioco non trovato"));
    };

    return { games, game, fetchGameById, error, isLoading };
};