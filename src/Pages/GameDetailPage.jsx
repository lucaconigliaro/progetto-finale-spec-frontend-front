import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../Context/GlobalContext";

export default function GameDetail() {
  const { id } = useParams();
  const { fetchGameById, addFavorite, removeFavorite, isFavorite } = useContext(GlobalContext);
  const [game, setGame] = useState(null);
  const [error, setError] = useState(null);

  // Funzione per gestire i valori nulli o mancanti
  const displayValue = (value, fallback = "N/A") => value || fallback;

  // Funzione per gestire il prezzo
  const displayPrice = (price) => (price ? `${price}€` : "Free to Play");

  useEffect(() => {
    const loadGame = async () => {
      const result = await fetchGameById(id);
      if (result) {
        setGame(result);
      } else {
        setError("Gioco non trovato");
      }
    };

    loadGame();
  }, [id]);

  if (error) {
    return (
      <div className="container mt-5 pt-5 text-center">
        <div className="alert alert-danger" role="alert">
          <h2>{error}</h2>
          <p>Controlla l'URL o torna alla <a href="/" className="alert-link">Home</a>.</p>
        </div>
      </div>
    );
  }

  if (!game) return <h2 className="text-center mt-5">Caricamento in corso...</h2>;

  // Controlla se un gioco è presente nei preferiti
  const isFav = isFavorite(game.id);

  return (
    <div className="container card mt-2 pt-5 bg-dark text-white">
      <div className="card-body">
        <h2 className="card-title">{displayValue(game.title)}</h2>
        <p><strong>Categoria:</strong> {displayValue(game.category)}</p>
        <p><strong>Piattaforma:</strong> {displayValue(game.details.platform.join(", "))}</p>
        <p><strong>Anno:</strong> {displayValue(game.details.releaseYear)}</p>
        <p><strong>Rating:</strong> {displayValue(game.details.rating)}</p>
        <p><strong>Sviluppatore:</strong> {displayValue(game.details.developer)}</p>
        <p><strong>Prezzo:</strong> {displayPrice(game.details.price)}</p>
        <p><strong>Giocatori:</strong> {displayValue(game.details.players.join(", "))}</p>
        <p><strong>Età consigliata:</strong> {displayValue(game.details.ageRating)}</p>
        <p><strong>Disponibilità:</strong> {displayValue(game.details.regionAvailability.join(", "))}</p>
        <p><strong>Descrizione:</strong> {displayValue(game.details.description)}</p>
      </div>
      <div>
        <button
          className="btn btn-outline-primary btn-sm mb-3 align-content-center"
          onClick={() => isFav ? removeFavorite(game.id) : addFavorite(game)} >
          {isFav ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
        </button>
      </div>
    </div>
  );
}