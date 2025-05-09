import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../Context/GlobalContext";

function GameCard({ game, toggleCompare, gamesToCompare, onDelete }) {
  const { addFavorite, removeFavorite, isFavorite } = useContext(GlobalContext);
  const [showOptions, setShowOptions] = useState(false);
  const cardRef = useRef(null);

  const isSelected = gamesToCompare.some(g => g.id === game.id);    // Selezione del comparatore
  const disableCompare = gamesToCompare.length >= 2 && !isSelected; // Se ci sono 2 giochi, disabilita i bottoni
  const isFav = isFavorite(game.id);

  const toggleOptions = () => setShowOptions(!showOptions); // Bottone opzioni
  const handleCancelClick = () => setShowOptions(false);   // Chiudi opzioni
 

  return (
    <div 
      ref={cardRef} className="card h-100 border-0 shadow small bg-dark text-white" style={{ position: "relative" }}>
      <div className="card-body p-4 d-flex flex-column text-center">
        <strong className="text-truncate" title={game.title}>{game.title}</strong>
        <span className="text-white text-truncate mb-4" title={game.category}>{game.category}</span>

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
          <Link to={`/games/${game.id}`} className="btn btn-outline-primary btn-sm w-100">Dettagli</Link>

          <button
            className={`btn ${isSelected ? "btn-warning" : "btn-outline-warning"} btn-sm w-100`}
            onClick={() => toggleCompare(game)}
            disabled={disableCompare && !isSelected}
          >
            {isSelected ? "Rimuovi" : "Confronta"}
          </button>

          <button
            className="btn btn-outline-secondary btn-sm w-100 mt-2 position-relative" onClick={toggleOptions} title="Opzioni">
            <i className="fas fa-cogs"></i>
          </button>

          {showOptions && (
            <>
              <div className="position-absolute top-0 left-0 w-100 h-100 bg-dark bg-opacity-75" style={{ zIndex: 1, backdropFilter: "blur(5px)" }}/>
              <div className="position-absolute top-50 start-50 translate-middle d-flex flex-column align-items-center" style={{ zIndex: 2 }}>
                <button onClick={() => onDelete(game.id)} className="btn btn-outline-danger btn-sm">Elimina</button>
                <button onClick={handleCancelClick} className="btn btn-outline-secondary btn-sm mt-2">Annulla</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default React.memo(GameCard);