import { useEffect, useState } from "react";

// Variabile d'ambiente
const API_URL = import.meta.env.VITE_BACKEND_URL;

export default function useGames() {
    const [games, setGames] = useState([]);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Carica tutti i giochi e le categorie una volta sola all'avvio
    useEffect(() => {
        fetch(`${API_URL}/games`)
            .then((res) => res.json())
            .then((data) => {
                setGames(data);
                setIsLoading(false);

                // Estrai categorie uniche in modo semplice
                const categories = [];
                data.forEach((game) => {
                    if (!categories.includes(game.category)) {
                        categories.push(game.category);
                    }
                });
                setCategories(categories);
            })
            .catch((err) => {
                setError(err.message);
                setIsLoading(false);
            });
    }, []);

    // Recupera dettagli di un singolo gioco
    async function fetchGameById(id) {
        try {
            const res = await fetch(`${API_URL}/games/${id}`);
            const data = await res.json();
            return data.game;
        } catch (err) {
            console.error("Errore nel fetch:", err);
            return null;
        }
    }

    // Aggiunge un nuovo gioco
    async function addGame(game) {
        try {
            const res = await fetch(`${API_URL}/games`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(game),
            });
            const data = await res.json();
            setGames((prev) => [...prev, data.game]);
        } catch (err) {
            console.error("Errore nell'aggiunta:", err);
        }
    }

    // Modifica un gioco esistente
    async function updateGame(id, updatedGame) {
        try {
            const res = await fetch(`${API_URL}/games/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedGame),
            });
            const data = await res.json();
            setGames((prev) => prev.map((g) => (g.id === id ? data.game : g)));
        } catch (err) {
            console.error("Errore nella modifica:", err);
        }
    }

    // Elimina un gioco dalla lista
    async function deleteGame(id) {
        try {
            await fetch(`${API_URL}/games/${id}`, { method: "DELETE" });
            setGames((prev) => prev.filter((g) => g.id !== id));
        } catch (err) {
            console.error("Errore nell'eliminazione:", err);
        }
    }

    return {
        games,
        setGames,
        fetchGameById,
        categories,
        error,
        isLoading,
        addGame,
        deleteGame,
        updateGame,
    };
}