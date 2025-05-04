import { Outlet } from 'react-router-dom';
import NavBar from '../Components/Navbar';

export default function DefaultLayout() {
  return (
    <div>
      <NavBar />
      <Outlet />
      <footer className="bg-dark text-white text-center py-3 mt-auto">
        <p>© 2025 GamesHub. All rights reserved.</p>
      </footer>
    </div>
  );
};