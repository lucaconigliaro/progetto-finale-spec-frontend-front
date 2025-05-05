import { useCallback, useContext, useMemo, useState } from "react";
import GameList from "../Components/GameList";
import { GlobalContext } from "../Context/GlobalContext";
import CompareTable from "../Components/CompareTable";

// Funzione debounce
function debounce(callback, delay) {
    let timer;
    return (value) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback(value);
        }, delay);
    };
};

export default function HomePage() {
    const { games, categories } = useContext(GlobalContext);
    const [searchGame, setSearchGame] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Tutti");
    const [sortBy, setSortBy] = useState("title");
    const [sortOrder, setSortOrder] = useState(1);
    const [gamesToCompare, setGamesToCompare] = useState([]);

    const API_URL = import.meta.env.VITE_BACKEND_URL;

    const debouncedSetSearchQuery = useCallback(debounce(setSearchGame, 1000), []);

    const toggleCompare = async (game) => {
        const isAlready = gamesToCompare.some(g => g.id === game.id);
        if (isAlready) {
            setGamesToCompare((prev) => prev.filter(g => g.id !== game.id));
        } else if (gamesToCompare.length < 2) {
            try {
                const res = await fetch(`${API_URL}/games/${game.id}`);
                const data = await res.json();
                setGamesToCompare(prev => [...prev, data.game]);
            } catch (err) {
                console.error("Errore nel fetch del gioco:", err);
            }
        }
    };

    const clearCompare = () => {
        setGamesToCompare([]);
    };

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(prev => prev * -1);
        } else {
            setSortBy(field);
            setSortOrder(1);
        }
    };

    const sortIcon = sortOrder === 1 ? "↑" : "↓";

    const filteredAndSortedGames = useMemo(() => {
        let filtered = games.filter(game =>
            game.title.toLowerCase().includes(searchGame.toLowerCase())
        );

        if (selectedCategory !== "Tutti") {
            filtered = filtered.filter(game => game.category === selectedCategory);
        }

        return filtered.sort((a, b) => {
            let comparison = 0;
            if (sortBy === "title") {
                comparison = a.title.localeCompare(b.title);
            } else if (sortBy === "category") {
                comparison = a.category.localeCompare(b.category);
            }
            return comparison * sortOrder;
        });
    }, [games, searchGame, selectedCategory, sortBy, sortOrder]);

    return (
        <div className="container mt-4">
            <div className="d-flex gap-3 mb-4">
                <input
                    type="text"
                    placeholder="Cerca un gioco..."
                    onChange={(e) => debouncedSetSearchQuery(e.target.value)}
                    className="form-control w-25"
                />

                <select
                    className="form-select w-25"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="Tutti">Tutte le categorie</option>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-3 d-flex gap-3">
                <button
                    onClick={() => handleSort("title")}
                    className="btn btn-outline-primary"
                >
                    Ordina per Titolo {sortBy === "title" && sortIcon}
                </button>
                <button
                    onClick={() => handleSort("category")}
                    className="btn btn-outline-primary"
                >
                    Ordina per Categoria {sortBy === "category" && sortIcon}
                </button>
            </div>

            <h1>I nostri giochi</h1>
            <GameList
                games={filteredAndSortedGames}
                toggleCompare={toggleCompare}
                gamesToCompare={gamesToCompare}
            />

            {gamesToCompare.length > 0 && (
                <div className="mt-5">
                    <div className="d-flex justify-content-between align-items-center">
                        <h2>Confronta i giochi</h2>
                        <button
                            className="btn btn-sm "
                            onClick={clearCompare}
                        >
                            Annulla
                        </button>
                    </div>
                    <div className="table-responsive">
                        <CompareTable games={gamesToCompare} />
                    </div>
                </div>
            )}
        </div>
    );
};