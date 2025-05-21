import React from "react";
import GameCard from "./GameCard";

function GamesList({ games, toggleCompare, gamesToCompare, onDelete}) {
  return (
      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-xl-5 g-3">
        {games.map((game) => (
          <div key={game.id} className="col">
            <GameCard
              game={game}
              toggleCompare={toggleCompare}
              gamesToCompare={gamesToCompare}
              onDelete={onDelete} 
            />
          </div>
        ))}
      </div>
  );
}

export default React.memo(GamesList);