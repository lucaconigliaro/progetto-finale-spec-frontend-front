import { Link } from "react-router-dom";

export default function CompareTable({ games, removeFromCompare }) {
  if (!games.length) return null;

  return (
    <table className="table table-dark table-hover table-bordered table-striped mt-4">
      <thead>
        <tr>
          <th>Gioco</th>
          {games.map(game => (
            <th key={game.id} className="position-relative">
              <Link
                to={`/games/${game.id}`}
                className="text-decoration-none table-hover fw-bold text-warning"
              >
                {game.title}
              </Link>
              <button
                className="btn-close bg-danger position-absolute top-0 end-0 m-2"
                onClick={() => removeFromCompare(game.id)}
              ></button>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Categoria</td>
          {games.map(g => (
            <td key={g.id}>{g.category || "-"}</td>
          ))}
        </tr>
        <tr>
          <td>Piattaforma</td>
          {games.map(g => (
            <td key={g.id}>
              {Array.isArray(g.details.platform)
                ? g.details.platform.join(", ") || "-"
                : "-"}
            </td>
          ))}
        </tr>
        <tr>
          <td>Anno di rilascio</td>
          {games.map(g => (
            <td key={g.id}>{g.details.releaseYear || "-"}</td>
          ))}
        </tr>
        <tr>
          <td>Rating</td>
          {games.map(g => (
            <td key={g.id}>{g.details.rating || "-"}</td>
          ))}
        </tr>
        <tr>
          <td>Sviluppatore</td>
          {games.map(g => (
            <td key={g.id}>{g.details.developer || "-"}</td>
          ))}
        </tr>
        <tr>
          <td>Prezzo</td>
          {games.map(g => (
            <td key={g.id}>{g.details.price ? `${g.details.price}€` : "Gratis"}</td>
          ))}
        </tr>
        <tr>
          <td>Giocatori</td>
          {games.map(g => (
            <td key={g.id}>
              {Array.isArray(g.details.players)
                ? g.details.players.join(", ") || "-"
                : "-"}
            </td>
          ))}
        </tr>
        <tr>
          <td>Età consigliata</td>
          {games.map(g => (
            <td key={g.id}>{g.details.ageRating || "-"}</td>
          ))}
        </tr>
        <tr>
          <td>Disponibilità</td>
          {games.map(g => (
            <td key={g.id}>
              {Array.isArray(g.details.regionAvailability)
                ? g.details.regionAvailability.join(", ") || "-"
                : "-"}
            </td>
          ))}
        </tr>
        <tr>
          <td>Descrizione</td>
          {games.map(g => (
            <td key={g.id}>{g.details?.description || "-"}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}