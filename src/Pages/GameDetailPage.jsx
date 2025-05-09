import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../Context/GlobalContext";

export default function GameDetail() {
  const { id } = useParams();
  const { fetchGameById } = useContext(GlobalContext);
  const [game, setGame] = useState(null);
  const [error, setError] = useState(null);
  const { addFavorite, removeFavorite, isFavorite } = useContext(GlobalContext);

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

  if (error) return <h2>Errore: {error}</h2>;
  if (!game) return <h2>Caricamento in corso...</h2>;

  const isFav = isFavorite(game.id);

  // Funzione per gestire i valori nulli o mancanti
  const displayValue = (value, fallback = "N/A") => {
    return value ? value : fallback;
  };

  // Gestione del prezzo
  const displayPrice = (price) => {
    return price ? `${price}€` : "N/A";
  };

  return (
    <div className="container card mt-2 pt-5 bg-dark text-white">
      <div className="card-body">
        <h2 className="card-title">{displayValue(game.title)}</h2>
        <p><strong>Categoria:</strong> {displayValue(game.category)}</p>
        <p><strong>Piattaforma:</strong> {displayValue(game.platform)}</p>
        <p><strong>Anno:</strong> {displayValue(game.releaseYear)}</p>
        <p><strong>Rating:</strong> {displayValue(game.rating)}</p>
        <p><strong>Sviluppatore:</strong> {displayValue(game.developer)}</p>
        <p><strong>Prezzo:</strong> {displayPrice(game.price)}</p>
        <p><strong>Giocatori:</strong> {displayValue(game.players)}</p>
        <p><strong>Età consigliata:</strong> {displayValue(game.ageRating)}</p>
        <p><strong>Disponibilità:</strong> {displayValue(game.regionAvailability?.join(", "))}</p>
        <p><strong>Descrizione:</strong> {displayValue(game.description)}</p>
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
};