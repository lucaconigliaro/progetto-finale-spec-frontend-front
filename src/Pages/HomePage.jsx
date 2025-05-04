import { useContext, useState } from "react";
import GameList from "../Components/GameList";
import { GlobalContext } from "../Context/GlobalContext";

export default function HomePage() {
    const { games } = useContext(GlobalContext);
    const [searchGame, setSearchGame] = useState("");

    const handleChange = (e) => {
        setSearchGame(e.target.value);
    };

    const filteredGames = games.filter(game =>
        game.title.toLowerCase().includes(searchGame.toLowerCase())
    );

    return (
        <div className="container mt-4">
            <input
                type="text"
                placeholder="Cerca un gioco..."
                onChange={handleChange}
                value={searchGame}
                className="form-control mb-4"
            />

            <h1>I nostri giochi</h1>
            <GameList games={filteredGames} />
        </div>
    );
}