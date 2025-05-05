import { NavLink } from "react-router-dom";

export default function NavBar() {
    const navLinks = [
        { path: "/", title: "Giochi" },
    ];

    return (
        <nav className="navbar fixed-top navbar-dark bg-dark shadow">
            <div className="container-fluid">
                <a className="navbar-brand text-white" href="#">👾 Games Hub 👾</a>
                <ul className="navbar-nav  gap-2 ms-auto d-flex flex-row">
                    {navLinks.map((curLink, index) => (
                        <li key={index} className="nav-item">
                            <NavLink
                                to={curLink.path}
                                className={({ isActive }) => isActive ? 'nav-link active text-primary' : 'nav-link text-light'}
                            >
                                {curLink.title}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};