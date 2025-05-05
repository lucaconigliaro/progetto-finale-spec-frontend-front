import { useEffect, useState } from "react";

// Variabile d'ambiente
const API_URL = import.meta.env.VITE_BACKEND_URL;

export default function useGames() {
    const [games, setGames] = useState([]);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Effettuo il fetch dei giochi principali
    useEffect(() => {
        fetch(`${API_URL}/games`)
            .then(res => res.json())
            .then(data => {
                setGames(data);
                setIsLoading(false);

                // Prendo le categorie
                const category = [];
                data.forEach(game => {
                    if (!category.includes(game.category)) {
                        category.push(game.category);
                    }
                });

                // Imposto le categorie
                setCategories(category);
            })
            .catch(err => {
                setError(err.message);
                setIsLoading(false);
            });
    }, []);

    // Async function per il fetch di un gioco specifico
    const fetchGameById = async (id) => {
        try {
          const res = await fetch(`${API_URL}/games/${id}`);
          const data = await res.json();
          return data.game; 
        } catch (error) {
          console.error("Errore nel fetch del gioco:", error);
          return null;
        }
      };

    return { games, fetchGameById, categories, error, isLoading };
};