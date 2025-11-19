import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MainLayout from './components/MainLayout/MainLayout';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import TimeTrackingPage from './pages/TimeTrackingPage/TimeTrackingPage';
import WarehousePage from './pages/WarehousePage/WarehousePage';
import InventoryPage from './pages/InventoryPage/InventoryPage';
import GamesPage from './pages/GamesPage/GamesPage';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Проверяем сохранённого пользователя
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Error parsing user:', e);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  if (loading) {
    return (
      <div className="app-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <MainLayout user={user} onLogin={handleLogin} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<ProfilePage user={user} />} />
          <Route path="/profile" element={<ProfilePage user={user} />} />
          <Route path="/time-tracking" element={<TimeTrackingPage user={user} />} />
          <Route path="/warehouse" element={<WarehousePage user={user} />} />
          <Route path="/inventory" element={<InventoryPage user={user} />} />
          <Route path="/games" element={<GamesPage user={user} />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
