import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../Context/GlobalContext";

function GameCard({ game, toggleCompare, gamesToCompare }) {
  // Controllo se il gioco è già selezionato
  const isSelected = gamesToCompare.some(g => g.id === game.id); 

  // Disabilito il pulsante se ci sono già 2 giochi selezionati e il gioco corrente non è uno di questi
  const disableCompare = gamesToCompare.length >= 2 && !isSelected;

  const { addFavorite, removeFavorite, isFavorite } = useContext(GlobalContext);
  const isFav = isFavorite(game.id);

  return (
    <div className="card h-100 border-0 shadow small bg-dark text-white" style={{ position: "relative" }}>
      <div className="card-body p-4 d-flex flex-column text-center">
        <strong className="text-truncate" title={game.title}>
          {game.title}
        </strong>
        <span className="text-white text-truncate mb-4" title={game.category}>
          {game.category}
        </span>

        <span
          role="button"
          onClick={() => isFav ? removeFavorite(game.id) : addFavorite(game)}
          title={isFav ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            fontSize: "1.5rem",
            cursor: "pointer",
            zIndex: 2
          }}
        >
          {isFav ? "❤️" : "🤍"}
        </span>

        <div className="mt-auto d-grid gap-2">
          <Link
            to={`/games/${game.id}`}
            className="btn btn-outline-primary btn-sm w-100"
          >
            Dettagli
          </Link>
          <button
            className={`btn ${isSelected ? "btn-warning" : "btn-outline-warning"} btn-sm w-100`}
            onClick={() => toggleCompare(game)}
            disabled={disableCompare && !isSelected}
          >
            {isSelected ? "Rimuovi" : "Confronta"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(GameCard); // Utilizzo memo per evitare il re-rendering non necessario