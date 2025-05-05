import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../Context/GlobalContext";

export default function GameDetail() {
  const { id } = useParams();
  const { fetchGameById } = useContext(GlobalContext);
  const [game, setGame] = useState(null);
  const [error, setError] = useState(null);

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

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h2 className="card-title">{game.title}</h2>
        <p><strong>Categoria:</strong> {game.category}</p>
        <p><strong>Piattaforma:</strong> {game.platform}</p>
        <p><strong>Anno:</strong> {game.releaseYear}</p>
        <p><strong>Rating:</strong> {game.rating}</p>
        <p><strong>Sviluppatore:</strong> {game.developer}</p>
        <p><strong>Prezzo:</strong> {game.price}€</p>
        <p><strong>Giocatori:</strong> {game.players}</p>
        <p><strong>Età consigliata:</strong> {game.ageRating}</p>
        <p><strong>Disponibilità:</strong> {game.regionAvailability?.join(", ")}</p>
        <p><strong>Descrizione:</strong> {game.description}</p>
      </div>
    </div>
  );
}