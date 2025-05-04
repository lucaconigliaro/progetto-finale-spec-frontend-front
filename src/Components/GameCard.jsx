import React from 'react';
import { Link } from 'react-router-dom';

function GameCard({ game }) {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">{game.title}</h5>
                <p className="card-text">Categoria: {game.category}</p>
                <Link to={`/games/${game.id}`} className="btn btn-primary">
                    Dettagli
                </Link>
            </div>
        </div>
    );
};

export default React.memo(GameCard);