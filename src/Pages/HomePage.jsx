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
};

export default function HomePage() {
    const { games, categories, fetchGameById } = useContext(GlobalContext);
    const [searchGame, setSearchGame] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Tutti");
    const [sortBy, setSortBy] = useState("title");
    const [sortOrder, setSortOrder] = useState(1);
    const [gamesToCompare, setGamesToCompare] = useState([]);
    const compareRef = useRef(null);

    const debouncedSetSearchQuery = useCallback(debounce(setSearchGame, 1000), []);

    // Toggle per aggiungere o rimuovere un gioco dalla lista di confronto
    const toggleCompare = async (game) => {
        const isAlready = gamesToCompare.some(g => g.id === game.id); // Controllo se almeno un gioco è già selezionato
        if (isAlready) {
            setGamesToCompare(prev => prev.filter(g => g.id !== game.id));  // Se è già selezionato, lo rimuovo
        } else if (gamesToCompare.length < 2) { // Se non è selezionato e ci sono meno di 2 giochi
            const detailedGame = await fetchGameById(game.id); 
            if (detailedGame) {
                setGamesToCompare(prev => [...prev, detailedGame]); // Aggiungo il gioco alla lista di cofronto
            }
        }
    };

    // Funzione per resettare la lista di confronto
    const clearCompare = () => {
        setGamesToCompare([]);
    };

    // Funzione per ordinare i giochi
    const handleSort = (field) => {
        if (sortBy === field) { // Se il campo è uguale a quello selezionato
            setSortOrder(prev => prev * -1); // Inverto l'ordine
        } else {
            setSortBy(field); // Altrimenti imposto il nuovo campo
            setSortOrder(1); 
        }
    };

    // Funzione per filtrare e ordinare i giochi, useMemo per evitare ricalcoli non necessari
    const filteredAndSortedGames = useMemo(() => {
        let filtered = games.filter(game =>
            game.title.toLowerCase().includes(searchGame.toLowerCase()) // Filtro i giochi in base al titolo
        );

        if (selectedCategory !== "Tutti") {
            filtered = filtered.filter(game => game.category === selectedCategory); // Filtro in base alla categoria
        }

        // Ordinamento dei giochi 
        return filtered.sort((a, b) => {
            let comparison = 0; // Inizializzo la variabile di confronto
            if (sortBy === "title") { // Se il campo è il titolo
                comparison = a.title.localeCompare(b.title); // Confronto i titoli
            } else if (sortBy === "category") { // Se invece il campo è la categoria
                comparison = a.category.localeCompare(b.category); // Confronto le categorie
            }
            return comparison * sortOrder; // Moltiplico per l'ordine di ordinamento
        });
    }, [games, searchGame, selectedCategory, sortBy, sortOrder]); // Ricalcolo solo quando cambiano questi valori

    // Effetto per scrollare alla sezione di confronto quando ci sono 2 giochi selezionati
    useEffect(() => {
        if (gamesToCompare.length === 2 && compareRef.current) {
            compareRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [gamesToCompare]);

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
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>

            </div>

            <div className="d-flex gap-3 align-items-center flex-wrap">
                <h1 className="text-white  m-0">I nostri giochi</h1>
                <button
                    onClick={() => handleSort("title")}
                    className="btn btn-outline-primary btn-sm"
                >
                    Titolo {sortBy === "title" && (sortOrder === 1 ? "A-Z ↑" : "Z-A ↓")}
                </button>
                <button
                    onClick={() => handleSort("category")}
                    className="btn btn-outline-primary btn-sm"
                >
                    Categoria {sortBy === "category" && (sortOrder === 1 ? "A-Z ↑" : "Z-A ↓")}
                </button>
            </div>
            <GameList
                games={filteredAndSortedGames}
                toggleCompare={toggleCompare}
                gamesToCompare={gamesToCompare}
            />

            {gamesToCompare.length > 0 && (
                <div className="mt-5 text-white"
                    ref={compareRef}>
                    <div className="d-flex justify-content-between align-items-center">
                        <h3>Confronta i giochi</h3>
                        <button
                            className="btn btn-sm text-white"
                            onClick={clearCompare}
                        >
                            Chiudi
                        </button>
                    </div>
                    <div className="table-responsive">
                        <CompareTable games={gamesToCompare}
                            removeFromCompare={(id) =>
                                setGamesToCompare(prev => prev.filter(g => g.id !== id))
                            } />
                    </div>
                </div>
            )}
        </div>
    );
};