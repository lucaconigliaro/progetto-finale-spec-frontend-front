import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../Context/GlobalContext";

function GameCard({ game, toggleCompare, gamesToCompare, onEdit, onDelete }) {
  // Verifica se il gioco è già selezionato per il confronto
  const isSelected = gamesToCompare.some(g => g.id === game.id);

  // Disabilita il bottone "Confronta" se ci sono già 2 giochi selezionati
  const disableCompare = gamesToCompare.length >= 2 && !isSelected;

  // Gestisce i preferiti
  const { addFavorite, removeFavorite, isFavorite } = useContext(GlobalContext);
  const isFav = isFavorite(game.id);

  // Stato per il menu opzioni
  const [showOptions, setShowOptions] = useState(false);
  const cardRef = useRef(null);

  // Toggle visibilità del menu opzioni
  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  // Chiude il menu se si clicca fuori dalla card
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div 
      ref={cardRef} 
      className="card h-100 border-0 shadow small bg-dark text-white" 
      style={{ position: "relative" }}
    >
      <div className="card-body p-4 d-flex flex-column text-center">
        {/* Titolo e categoria del gioco */}
        <strong className="text-truncate" title={game.title}>
          {game.title}
        </strong>
        <span className="text-white text-truncate mb-4" title={game.category}>
          {game.category}
        </span>

        {/* Icona per aggiungere/rimuovere dai preferiti */}
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
          {/* Bottone per navigare ai dettagli */}
          <Link
            to={`/games/${game.id}`}
            className="btn btn-outline-primary btn-sm w-100"
          >
            Dettagli
          </Link>

          {/* Bottone per confrontare i giochi */}
          <button
            className={`btn ${isSelected ? "btn-warning" : "btn-outline-warning"} btn-sm w-100`}
            onClick={() => toggleCompare(game)}
            disabled={disableCompare && !isSelected}
          >
            {isSelected ? "Rimuovi" : "Confronta"}
          </button>

          {/* Bottone per mostrare il menu opzioni */}
          <button
            className="btn btn-outline-secondary btn-sm w-100 mt-2 position-relative"
            onClick={toggleOptions}
            title="Opzioni"
          >
            <i className="fas fa-cogs"></i> 
          </button>

          {/* Overlay per il menu opzioni */}
          {showOptions && (
            <div 
              className="position-absolute top-0 left-0 w-100 h-100 bg-dark bg-opacity-75"
              style={{ zIndex: 1, backdropFilter: "blur(5px)" }}
            />
          )}

          {/* Menu opzioni (Modifica, Elimina) */}
          {showOptions && (
            <div 
              className="position-absolute top-50 start-50 translate-middle d-flex flex-column align-items-center"
              style={{ zIndex: 2 }}
            >
              <button
                onClick={() => onDelete(game.id)} // Elimina gioco
                className="btn btn-outline-danger btn-sm"
              >
                Elimina
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default React.memo(GameCard); // Evita il re-rendering non necessario