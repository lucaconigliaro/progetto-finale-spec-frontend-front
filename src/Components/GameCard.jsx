import React from "react";
import { Link } from "react-router-dom";

function GameCard({ game, toggleCompare, gamesToCompare }) {
    const isSelected = gamesToCompare.some(g => g.id === game.id);
    const disableCompare = gamesToCompare.length >= 2 && !isSelected;

    return (
        <div className="card shadow-sm border-0" style={{ width: '150px', fontSize: '0.8rem' }}>
            <div className="card-body d-flex flex-column gap-2 p-2">
                <strong className="text-truncate" title={game.title}>
                    {game.title}
                </strong>
                <span className="text-muted text-truncate" title={game.category}>
                    {game.category}
                </span>

                <Link
                    to={`/games/${game.id}`}
                    className="btn btn-sm btn-outline-primary"
                >
                    Dettagli
                </Link>
                <button
                    className={`btn btn-sm ${isSelected ? "btn-warning" : "btn-outline-warning"}`}
                    onClick={() => toggleCompare(game)}
                    disabled={disableCompare && !isSelected}
                    title={isSelected ? "Rimuovi questo gioco dal confronto" : "Aggiungi al confronto"}
                >
                    {isSelected ? "Rimuovi" : "Confronta"}
                </button>
            </div>
        </div>
    );
};

export default React.memo(GameCard);