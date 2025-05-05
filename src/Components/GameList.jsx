import GameCard from "./GameCard";

export default function GamesList({ games, toggleCompare, gamesToCompare }) {
  return (
    <div className="container mt-4">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {games.map((game) => {
          return (
            <div key={game.id} className="col">
              <GameCard
                key={game.id}
                game={game}
                toggleCompare={toggleCompare}
                gamesToCompare={gamesToCompare}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};