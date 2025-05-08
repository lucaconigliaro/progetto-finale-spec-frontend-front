import { useEffect, useState } from "react";

// Variabile d'ambiente per l'API URL
const API_URL = import.meta.env.VITE_BACKEND_URL;

export default function useGames() {
    const [games, setGames] = useState([]);       // Stato per i giochi
    const [categories, setCategories] = useState([]); // Stato per le categorie
    const [error, setError] = useState(null);      // Stato per gli errori
    const [isLoading, setIsLoading] = useState(true); // Stato di caricamento

    // Effettuare il fetch dei giochi e delle categorie
    useEffect(() => {
        fetch(`${API_URL}/games`)
            .then(res => res.json())
            .then(data => {
                setGames(data);
                setIsLoading(false);

                // Estrai le categorie uniche
                const category = [];
                data.forEach(game => {
                    if (!category.includes(game.category)) {
                        category.push(game.category);
                    }
                });
                setCategories(category);  // Imposta le categorie
            })
            .catch(err => {
                setError(err.message);
                setIsLoading(false);
            });
    }, []);

    // Fetch per ottenere i dettagli di un gioco per ID
    const fetchGameById = async (id) => {
        try {
            const res = await fetch(`${API_URL}/games/${id}`);
            const data = await res.json();
            return data.game;  // Ritorna il gioco dettagliato
        } catch (error) {
            console.error("Errore nel fetch del gioco:", error);
            return null;  // In caso di errore, ritorna null
        }
    };

    // Funzione per aggiungere un nuovo gioco
    const addGame = async (game) => {
        try {
            const res = await fetch(`${API_URL}/games`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(game),
            });

            if (!res.ok) throw new Error("Errore nella creazione del gioco");

            const result = await res.json();
            const newGame = result.game;

            if (newGame?.title?.trim()) {
                setGames((prev) => [...prev, newGame]);  // Aggiungi il gioco alla lista
            } else {
                console.error("Gioco ricevuto ma privo di titolo valido:", result);
            }

        } catch (err) {
            console.error("Errore nell'aggiunta del gioco:", err);
        }
    };

    // Funzione per aggiornare un gioco esistente
    const updateGame = async (id, updatedGame) => {
        try {
            const res = await fetch(`${API_URL}/games/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedGame),
            });

            if (!res.ok) throw new Error("Errore nell'aggiornamento del gioco");

            const result = await res.json();
            const updated = result.game ?? result;

            setGames(prev => prev.map(g => (g.id === id ? updated : g))); // Aggiorna il gioco nella lista

        } catch (err) {
            console.error("Errore nella modifica del gioco:", err);
        }
    };

    // Funzione per eliminare un gioco
    const deleteGame = async (id) => {
        try {
            const res = await fetch(`${API_URL}/games/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Errore nella cancellazione del gioco");

            setGames(prev => prev.filter(g => g.id !== id)); // Rimuovi il gioco dalla lista
        } catch (err) {
            console.error("Errore nell'eliminazione del gioco:", err);
        }
    };

    // Ritorna tutti i metodi e stati necessari
    return { 
        games, 
        fetchGameById, 
        categories, 
        error, 
        isLoading, 
        addGame, 
        deleteGame, 
        updateGame 
    };
};