import { useContext, useMemo, useState } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { useNavigate } from "react-router-dom";

const PEGI_OPTIONS = ["PEGI 7", "PEGI 12", "PEGI 16", "PEGI 18"];
const REGION_OPTIONS = ["NA", "EU", "ASIA"];
const PLAYER_OPTIONS = ["Single Player", "Multiplayer", "Co-op"];
const CATEGORY_OPTIONS = ["Action-Adventure", "Battle Royale", "MOBA", "Party", "RPG", "Sandbox"];
const PLATFORM_OPTIONS = ["Mobile", "PC", "PS4", "PS5", "Switch", "Xbox One", "Xbox Series X/S"];

export default function AddGamePage() {
    // Stato per i campi del modulo
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

    // Validazione del titolo
    const titleError = useMemo(() => {
        const symbols = "!@#$%^&*()_+={}[]:;\"'<>,.?/\\|`~";
        if (!title.trim()) return "Il titolo non può essere vuoto.";
        if ([...title].some(symbol => symbols.includes(symbol))) return "Il titolo non può contenere simboli speciali.";
        return "";
    }, [title]);

    // Validazione dello sviluppatore
    const developerError = useMemo(() => {
        if (!developer.trim()) return "Il nome dello sviluppatore è obbligatorio.";
        return "";
    }, [developer]);

    // Validazione del rating
    const ratingError = useMemo(() => {
        const num = Number(rating);
        if (!rating) return "Il rating è obbligatorio.";
        if (num < 1 || num > 10) return "Il rating deve essere tra 1 e 10.";
        return "";
    }, [rating]);

    // Validazione del prezzo
    const priceError = useMemo(() => {
        const num = Number(price);
        if (price === "") return "Il prezzo è obbligatorio.";
        if (num < 0) return "Il prezzo non può essere negativo.";
        return "";
    }, [price]);

    // Validazione dell'anno di uscita
    const releaseYearError = useMemo(() => {
        const year = Number(releaseYear);
        if (!releaseYear) return "L'anno di uscita è obbligatorio.";
        if (year < 1970 || year > 2030) return `L'anno deve essere tra 1970 e 2030.`;
        return "";
    }, [releaseYear]);

    // Validazione della descrizione
    const descriptionError = useMemo(() => {
        if (!description.trim()) return "La descrizione è obbligatoria.";
        return "";
    }, [description]);

    // Validazione della classificazione PEGI
    const ageRatingError = useMemo(() => {
        if (!ageRating) return "La classificazione PEGI è obbligatoria.";
        return "";
    }, [ageRating]);

    // Controllo se il modulo è valido
    const formValid = [titleError, developerError, ratingError, priceError, releaseYearError, descriptionError, ageRatingError].every(err => !err);

    // Gestione dei checkbox
    const handleCheckboxChange = (value, list, setList) => {
        if (list.includes(value)) {
            setList(list.filter(item => item !== value));
        } else {
            setList([...list, value]);
        }
    };

    // Gestione dell'invio del modulo
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formValid) return;

        // Formattazione del testo (es. capitalizzazione)
        const format = (text) => text.trim().replace(/^(\w)/, (_, c) => c.toUpperCase());

        const newGame = {
            title: format(title),
            category: category.join(", "),
            platform: platform.join(", "),
            releaseYear: Number(releaseYear),
            rating: Number(rating),
            developer: format(developer),
            price: Number(price),
            players: players.join(", "),
            ageRating,
            regionAvailability,
            description: format(description)
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
            <p className="text-warning">* I campi con l'asterisco sono obbligatori</p>
            <form onSubmit={handleSubmit} className="w-50 mx-auto mt-4 text-start bg-dark p-4 rounded shadow">
                {/* Campo per il titolo */}
                <div className="mb-3 w-75">
                    <label htmlFor="title" className="form-label">Titolo *</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="form-control"
                    />
                    {titleError && <p className="text-danger m-0 small">{titleError}</p>}
                </div>

                {/* Checkbox per le categorie */}
                <div className="mb-3 w-75">
                    <label className="form-label">Categoria</label>
                    <div className="d-flex flex-wrap gap-2">
                        {CATEGORY_OPTIONS.map(opt => (
                            <div key={opt} className="form-check">
                                <input
                                    type="checkbox"
                                    id={`category-${opt}`}
                                    checked={category.includes(opt)}
                                    onChange={() => handleCheckboxChange(opt, category, setCategory)}
                                    className="form-check-input"
                                />
                                <label htmlFor={`category-${opt}`} className="form-check-label">{opt}</label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Checkbox per le piattaforme */}
                <div className="mb-3 w-75">
                    <label className="form-label">Piattaforme</label>
                    <div className="d-flex flex-wrap gap-2">
                        {PLATFORM_OPTIONS.map(opt => (
                            <div key={opt} className="form-check">
                                <input
                                    type="checkbox"
                                    id={`platform-${opt}`}
                                    checked={platform.includes(opt)}
                                    onChange={() => handleCheckboxChange(opt, platform, setPlatform)}
                                    className="form-check-input"
                                />
                                <label htmlFor={`platform-${opt}`} className="form-check-label">{opt}</label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Campo per l'anno di uscita */}
                <div className="mb-3 w-75">
                    <label htmlFor="releaseYear" className="form-label">Anno di uscita *</label>
                    <input
                        type="number"
                        id="releaseYear"
                        value={releaseYear}
                        onChange={(e) => setReleaseYear(e.target.value)}
                        className="form-control"
                    />
                    {releaseYearError && <p className="text-danger m-0 small">{releaseYearError}</p>}
                </div>

                {/* Campo per il rating */}
                <div className="mb-3 w-75">
                    <label htmlFor="rating" className="form-label">Rating (1-10) *</label>
                    <input
                        type="number"
                        id="rating"
                        min="1"
                        max="10"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="form-control"
                    />
                    {ratingError && <p className="text-danger m-0 small">{ratingError}</p>}
                </div>

                {/* Campo per lo sviluppatore */}
                <div className="mb-3 w-75">
                    <label htmlFor="developer" className="form-label">Sviluppatore *</label>
                    <input
                        type="text"
                        id="developer"
                        value={developer}
                        onChange={(e) => setDeveloper(e.target.value)}
                        className="form-control"
                    />
                    {developerError && <p className="text-danger m-0 small">{developerError}</p>}
                </div>

                {/* Campo per il prezzo */}
                <div className="mb-3 w-75">
                    <label htmlFor="price" className="form-label">Prezzo (€) *</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="form-control"
                    />
                    {priceError && <p className="text-danger m-0 small">{priceError}</p>}
                </div>

                {/* Checkbox per le modalità di gioco */}
                <div className="mb-3 w-75">
                    <label className="form-label">Modalità di Gioco</label>
                    <div className="d-flex flex-wrap gap-2">
                        {PLAYER_OPTIONS.map(opt => (
                            <div key={opt} className="form-check">
                                <input
                                    type="checkbox"
                                    id={`players-${opt}`}
                                    checked={players.includes(opt)}
                                    onChange={() => handleCheckboxChange(opt, players, setPlayers)}
                                    className="form-check-input"
                                />
                                <label htmlFor={`players-${opt}`} className="form-check-label">{opt}</label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Select per la classificazione PEGI */}
                <div className="mb-3 w-75">
                    <label htmlFor="ageRating" className="form-label">Classificazione PEGI *</label>
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
                    {ageRatingError && <p className="text-danger m-0 small">{ageRatingError}</p>}
                </div>

                {/* Checkbox per la disponibilità regionale */}
                <div className="mb-3 w-75">
                    <label className="form-label">Disponibile in Regione</label>
                    <div className="d-flex flex-wrap gap-2">
                        {REGION_OPTIONS.map(opt => (
                            <div key={opt} className="form-check">
                                <input
                                    type="checkbox"
                                    id={`region-${opt}`}
                                    checked={regionAvailability.includes(opt)}
                                    onChange={() => handleCheckboxChange(opt, regionAvailability, setRegionAvailability)}
                                    className="form-check-input"
                                />
                                <label htmlFor={`region-${opt}`} className="form-check-label">{opt}</label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Campo per la descrizione */}
                <div className="mb-3 w-75">
                    <label htmlFor="description" className="form-label">Descrizione *</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="form-control"
                        rows="4"
                    />
                    {descriptionError && <p className="text-danger m-0 small">{descriptionError}</p>}
                </div>

                {/* Pulsante per inviare il modulo */}
                <button
                    type="submit"
                    disabled={!formValid}
                    className="btn btn-outline-primary btn-sm w-50"
                >
                    Aggiungi Gioco
                </button>
            </form>
        </div>
    );
};