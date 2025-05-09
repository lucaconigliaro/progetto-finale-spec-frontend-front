import { memo } from "react";

const CompareTable = memo(({ games, removeFromCompare }) => {
  if (!games.length) return null; // Non mostro la tabella se non ci sono giochi da confrontare

  return (
    <table className="table table-dark table-hover table-bordered table-striped mt-4">
      <thead>
        <tr>
          <th>Gioco</th>
          {games.map(game => (
            <th key={game.id} className="position-relative">
              {game.title}
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
          {games.map((g) => (
            <td key={g.id}>{g.category || "-"}</td>
          ))}
        </tr>
        <tr>
          <td>Piattaforma</td>
          {games.map((g) => (
            <td key={g.id}>{g.platform || "-"}</td>
          ))}
        </tr>
        <tr>
          <td>Anno di rilascio</td>
          {games.map((g) => (
            <td key={g.id}>{g.releaseYear || "-"}</td>
          ))}
        </tr>
        <tr>
          <td>Rating</td>
          {games.map((g) => (
            <td key={g.id}>{g.rating || "-"}</td>
          ))}
        </tr>
        <tr>
          <td>Sviluppatore</td>
          {games.map((g) => (
            <td key={g.id}>{g.developer || "-"}</td>
          ))}
        </tr>
        <tr>
          <td>Prezzo</td>
          {games.map((g) => (
            <td key={g.id}>{g.price ? `${g.price}€` : "Gratis"}</td>
          ))}
        </tr>
        <tr>
          <td>Giocatori</td>
          {games.map((g) => (
            <td key={g.id}>{g.players || "-"}</td>
          ))}
        </tr>
        <tr>
          <td>Età consigliata</td>
          {games.map((g) => (
            <td key={g.id}>{g.ageRating || "-"}</td>
          ))}
        </tr>
        <tr>
          <td>Disponibilità</td>
          {games.map((g) => (
            <td key={g.id}>
              {Array.isArray(g.regionAvailability)
                ? g.regionAvailability.join(", ") || "-"
                : "-"}
            </td>
          ))}
        </tr>
        <tr>
          <td>Descrizione</td>
          {games.map((g) => (
            <td key={g.id}>{g.description || "-"}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
});

export default CompareTable;