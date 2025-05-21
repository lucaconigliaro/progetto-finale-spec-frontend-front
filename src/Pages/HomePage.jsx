import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
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
}

export default function HomePage() {
    const {
        games,
        categories,
        fetchGameById,
        error,
        deleteGame,
        removeFavorite
    } = useContext(GlobalContext);

    const [searchGame, setSearchGame] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Tutti");
    const [sortBy, setSortBy] = useState("title");
    const [sortOrder, setSortOrder] = useState(1);
    const [gamesToCompare, setGamesToCompare] = useState([]);

    // Riferimento per scrollare alla sezione di confronto
    const compareRef = useRef(null);

    // Debounce per la ricerca giochi
    const debouncedSetSearchQuery = useCallback(debounce(setSearchGame, 1000), []);

    // Aggiungi o rimuovi gioco dalla lista di confronto
    const toggleCompare = useCallback(async (game) => {
        const isAlready = gamesToCompare.some(g => g.id === game.id);
        if (isAlready) {
            setGamesToCompare(prev => prev.filter(g => g.id !== game.id));
        } else if (gamesToCompare.length < 2) {
            const detailedGame = await fetchGameById(game.id);
            if (detailedGame) setGamesToCompare(prev => [...prev, detailedGame]);
        }
    }, [gamesToCompare, fetchGameById]);

    // Svuota la lista di confronto
    const clearCompare = useCallback(() => {
        setGamesToCompare([]);
    }, []);

    // Rimuovi gioco dalla lista di confronto
    const removeFromCompare = useCallback(id => {
        setGamesToCompare(prev => prev.filter(g => g.id !== id));
    }, []);

    // Gestisce l'ordinamento dei giochi
    const handleSort = (field) => {
        if (sortBy === field) {
          setSortOrder(prev => prev * -1);
        } else {
          setSortBy(field);
          setSortOrder(1);
        }
      };

    // Filtra e ordina i giochi
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

    // Scrolla alla sezione di confronto se 2 giochi sono selezionati
    useEffect(() => {
        if (gamesToCompare.length === 2 && compareRef.current) {
            compareRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [gamesToCompare]);

    // Elimina gioco
    const handleDeleteGame = async (id) => {
        if (window.confirm("Sei sicuro di voler eliminare questo gioco?")) {
            await deleteGame(id);
            setGamesToCompare(prev => prev.filter(g => g.id !== id));
            removeFavorite(id);
        }
    };

    if (error) {
        return <div className="text-danger text-center mt-5 pt-5">Errore nel caricamento dei giochi</div>;
    }

    return (
        <div className="container mt-5">
            <div className="d-flex gap-3 mt-5 pt-5 mb-4">
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
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            <div className="d-flex gap-3 align-items-center flex-wrap">
                <h1 className="text-white m-0">I nostri giochi</h1>
                <button onClick={() => handleSort("title")} className="btn btn-outline-primary btn-sm">
                    Titolo {sortBy === "title" && (sortOrder === 1 ? "A-Z ↑" : "Z-A ↓")}
                </button>
                <button onClick={() => handleSort("category")} className="btn btn-outline-primary btn-sm">
                    Categoria {sortBy === "category" && (sortOrder === 1 ? "A-Z ↑" : "Z-A ↓")}
                </button>
            </div>
            <small className="text-warning">Clicca sul pulsante "Confronta" su due giochi per confrontarli</small>

            {filteredAndSortedGames.length > 0 ? (
                <GameList
                    games={filteredAndSortedGames}
                    toggleCompare={toggleCompare}
                    gamesToCompare={gamesToCompare}
                    onDelete={handleDeleteGame}
                />
            ) : (
                <p className="text-white mt-4">Nessun gioco trovato.</p>
            )}

            {gamesToCompare.length > 0 && (
                <div className="mt-5 text-white" ref={compareRef}>
                    <div className="d-flex justify-content-between align-items-center">
                        <h3>Confronta i giochi</h3>
                        <button className="btn btn-sm text-white" onClick={clearCompare}>
                            Chiudi
                        </button>
                    </div>
                    <div className="table-responsive">
                        <CompareTable
                            games={gamesToCompare}
                            removeFromCompare={removeFromCompare}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}