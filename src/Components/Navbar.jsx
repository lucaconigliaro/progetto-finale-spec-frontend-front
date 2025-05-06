import { useState } from "react";
import { NavLink } from "react-router-dom";
import FavoritesSidebar from "./FavoritesSidebar";

export default function NavBar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const navLinks = [
        { path: "/", title: "Giochi" },
    ];

    const openSidebar = () => setIsSidebarOpen(true);
    const closeSidebar = () => setIsSidebarOpen(false);

    return (
        <>
            <nav className="navbar fixed-top navbar-dark bg-dark shadow">
                <div className="container-fluid">
                    <NavLink className="navbar-brand text-white" to="/">👾 Games Hub 👾</NavLink>
                    <ul className="navbar-nav gap-2 ms-auto d-flex flex-row">
                        {navLinks.map((curLink, index) => (
                            <li key={index} className="nav-item">
                                <NavLink
                                    to={curLink.path}
                                    className={({ isActive }) =>
                                        isActive ? 'nav-link active text-primary' : 'nav-link text-light'
                                    }
                                >
                                    {curLink.title}
                                </NavLink>
                            </li>
                        ))}
                        <li className="nav-item">
                            <button
                                className="nav-link btn btn-link text-light"
                                style={{ textDecoration: 'none' }}
                                onClick={openSidebar}
                            >
                                Preferiti
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>

            <FavoritesSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        </>
    );
}