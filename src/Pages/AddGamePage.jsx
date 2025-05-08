import { useContext, useMemo, useRef, useState } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { useNavigate } from "react-router-dom";

const PEGI_OPTIONS = ["PEGI 7", "PEGI 12", "PEGI 16", "PEGI 18"];
const REGION_OPTIONS = ["NA", "EU", "ASIA"];
const PLAYER_OPTIONS = ["Single Player", "Multiplayer", "Co-op"];
const CATEGORY_OPTIONS = ["Action-Adventure", "Battle Royale", "MOBA", "Party", "RPG", "Sandbox"];
const PLATFORM_OPTIONS = ["Mobile", "PC", "PS4", "PS5", "Switch", "Xbox One", "Xbox Series X/S"];

export default function AddGamePage() {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState([]);
    const [players, setPlayers] = useState([]);
    const [platform, setPlatform] = useState([]);
    const [releaseYear, setReleaseYear] = useState("");
    const [rating, setRating] = useState("");
    const [developer, setDeveloper] = useState("");
    const [price, setPrice] = useState("");
    const [ageRating, setAgeRating] = useState("");
    const [regionAvailability, setRegionAvailability] = useState([]);
    const [description, setDescription] = useState("");

    const { addGame } = useContext(GlobalContext);
    const navigate = useNavigate();

    const titleError = useMemo(() => {
        const symbols = "!@#$%^&*()_+={}[]:;\"'<>,.?/\\|`~";
        if (!title.trim()) return "Il titolo non può essere vuoto.";
        if ([...title].some(symbol => symbols.includes(symbol))) return "Il titolo non può contenere simboli speciali.";
        return "";
    }, [title]);

    const handleCheckboxChange = (value, list, setList) => {
        if (list.includes(value)) {
            setList(list.filter(item => item !== value));
        } else {
            setList([...list, value]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (titleError) return;

        if (!description.trim()) {
            alert("La descrizione non può essere vuota.");
            return;
        }

        const newGame = {
            title,
            category: category.join(", "),
            platform: platform.join(", "),
            releaseYear: Number(releaseYear),
            rating: Number(rating),
            developer,
            price: Number(price),
            players: players.join(", "),
            ageRating,
            regionAvailability, 
            description,
          };

        try {
            await addGame(newGame);
            alert("Gioco aggiunto con successo!");
            navigate("/");
        } catch (err) {
            alert("Errore nella creazione del gioco: " + err.message);
        }
    };

    return (
        <div className="text-white text-center mt-5 pt-5">
            <h1>Aggiungi un nuovo gioco</h1>
            <form onSubmit={handleSubmit} className="w-75 mx-auto mt-4 text-start">
                {/* Titolo */}
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Titolo</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="form-control"
                    />
                    {titleError && <p className="text-danger">{titleError}</p>}
                </div>

                {/* Categoria */}
                <div className="mb-3">
                    <label className="form-label">Categoria</label>
                    <div className="d-flex flex-wrap gap-3">
                        {CATEGORY_OPTIONS.map(opt => (
                            <div key={opt} className="form-check">
                                <input
                                    type="checkbox"
                                    id={`category-${opt}`}
                                    checked={category.includes(opt)}
                                    onChange={() => handleCheckboxChange(opt, category, setCategory)}
                                    className="form-check-input"
                                />
                                <label htmlFor={`category-${opt}`} className="form-check-label">
                                    {opt}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Piattaforme */}
                <div className="mb-3">
                    <label className="form-label">Piattaforme</label>
                    <div className="d-flex flex-wrap gap-3">
                        {PLATFORM_OPTIONS.map(opt => (
                            <div key={opt} className="form-check">
                                <input
                                    type="checkbox"
                                    id={`platform-${opt}`}
                                    checked={platform.includes(opt)}
                                    onChange={() => handleCheckboxChange(opt, platform, setPlatform)}
                                    className="form-check-input"
                                />
                                <label htmlFor={`platform-${opt}`} className="form-check-label">
                                    {opt}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Anno di uscita */}
                <div className="mb-3">
                    <label htmlFor="releaseYear" className="form-label">Anno di uscita</label>
                    <input
                        type="number"
                        id="releaseYear"
                        value={releaseYear}
                        onChange={(e) => setReleaseYear(e.target.value)}
                        className="form-control"
                    />
                </div>

                {/* Rating */}
                <div className="mb-3">
                    <label htmlFor="rating" className="form-label">Rating (da 1 a 10)</label>
                    <input
                        type="number"
                        id="rating"
                        min="1"
                        max="10"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="form-control"
                    />
                </div>

                {/* Developer */}
                <div className="mb-3">
                    <label htmlFor="developer" className="form-label">Sviluppatore</label>
                    <input
                        type="text"
                        id="developer"
                        value={developer}
                        onChange={(e) => setDeveloper(e.target.value)}
                        className="form-control"
                    />
                </div>

                {/* Prezzo */}
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Prezzo (€)</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="form-control"
                    />
                </div>

                {/* Giocatori */}
                <div className="mb-3">
                    <label className="form-label">Modalità di Gioco</label>
                    <div className="d-flex flex-wrap gap-3">
                        {PLAYER_OPTIONS.map(opt => (
                            <div key={opt} className="form-check">
                                <input
                                    type="checkbox"
                                    id={`players-${opt}`}
                                    checked={players.includes(opt)}
                                    onChange={() => handleCheckboxChange(opt, players, setPlayers)}
                                    className="form-check-input"
                                />
                                <label htmlFor={`players-${opt}`} className="form-check-label">
                                    {opt}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* PEGI */}
                <div className="mb-3">
                    <label htmlFor="ageRating" className="form-label">Classificazione PEGI</label>
                    <select
                        id="ageRating"
                        value={ageRating}
                        onChange={(e) => setAgeRating(e.target.value)}
                        className="form-control"
                    >
                        <option value="">Seleziona un PEGI</option>
                        {PEGI_OPTIONS.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                </div>

                {/* Regioni */}
                <div className="mb-3">
                    <label className="form-label">Disponibile in Regione</label>
                    <div className="d-flex flex-wrap gap-3">
                        {REGION_OPTIONS.map(opt => (
                            <div key={opt} className="form-check">
                                <input
                                    type="checkbox"
                                    id={`region-${opt}`}
                                    checked={regionAvailability.includes(opt)}
                                    onChange={() => handleCheckboxChange(opt, regionAvailability, setRegionAvailability)}
                                    className="form-check-input"
                                />
                                <label htmlFor={`region-${opt}`} className="form-check-label">
                                    {opt}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-control"
                    rows="4"
                />

                <button
                    type="submit"
                    disabled={!!titleError}
                    className="btn btn-success mt-3"
                >
                    Aggiungi Gioco
                </button>
            </form>
        </div>
    );
};