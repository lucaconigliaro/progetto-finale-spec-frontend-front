import React from 'react';

function GameCard({ game }) {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">{game.title}</h5>
                <p className="card-text">Categoria: {game.category}</p>
            </div>
        </div>
    );
};

export default React.memo(GameCard);