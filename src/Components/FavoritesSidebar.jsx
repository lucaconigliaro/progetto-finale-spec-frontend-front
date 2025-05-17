import { useContext } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { Link } from "react-router-dom";

export default function FavoritesSidebar({ isOpen, onClose }) {
    const { favorites, removeFavorite } = useContext(GlobalContext); //useFavorites
    
    return (
        <div>
            {isOpen && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1040 }}
                    onClick={onClose}
                />
            )}

            <div
                className={`offcanvas bg-dark text-white offcanvas-end ${isOpen ? 'show' : ''}`}
                style={{
                    visibility: isOpen ? 'visible' : 'hidden',
                    backgroundColor: '#fff',
                    zIndex: 1045,
                    position: 'fixed',
                    top: '56px',
                    height: 'calc(100% - 56px)',
                    transition: 'transform 0.3s ease-in-out',
                    transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
                    width: '300px'
                }}
            >
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title">Preferiti</h5>
                    <button type="button" className="btn-close bg-danger" onClick={onClose}></button>
                </div>
                <div className="offcanvas-body">
                    {favorites.length === 0 ? (
                        <p className="text-white">Nessun gioco nei preferiti.</p>
                    ) : (
                        <ul className="list-group list-group-flush">
                            {favorites.map((game) => (
                                <li key={game.id} className="list-group-item bg-dark text-white d-flex justify-content-between align-items-center">
                                    <Link to={`/games/${game.id}`} className="text-decoration-none text-white">{game.title}</Link>
                                    <button className="btn-close bg-danger" onClick={() => removeFavorite(game.id)}/>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}