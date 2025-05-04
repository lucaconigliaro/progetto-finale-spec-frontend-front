import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../Context/GlobalContext";

export default function GameDetail() {
  const { id } = useParams();
  const { game, fetchGameById, error } = useContext(GlobalContext);

  useEffect(() => {
    if (id) {
      fetchGameById(id); // Recupero i dettagli del gioco tramite l'ID
    }
  }, [id]);

  if (error) return <h2>Errore: {error}</h2>;
  if (!game) return <h2>Gioco non trovato</h2>;

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
};