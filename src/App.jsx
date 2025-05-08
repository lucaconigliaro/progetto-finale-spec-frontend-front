import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DefaultLayout from './Layout/DefaultLayout';
import HomePage from './Pages/HomePage';
import GlobalProvider from './Context/GlobalContext';
import GameDetailPage from './Pages/GameDetailPage';
import AddGamePage from './Pages/AddGamePage';

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/add" element={<AddGamePage />} />
            <Route path="/games/:id" element={<GameDetailPage />} />
            <Route path="*" element={<h1>404 - Pagina non trovata</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
};

export default App;