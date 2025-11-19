import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ isOpen, onClose, user, onLogout, currentPage }) {
  const navigate = useNavigate();

  const menuItems = [
    { 
      id: 'dashboard', 
      name: 'Главная', 
      icon: '🏠', 
      path: '/dashboard',
      color: '#667eea'
    },
    { 
      id: 'time-tracking', 
      name: 'Учет времени', 
      icon: '⏰', 
      path: '/time-tracking',
      color: '#f093fb'
    },
    { 
      id: 'warehouse', 
      name: 'Склад', 
      icon: '📦', 
      path: '/warehouse',
      color: '#4facfe'
    },
    { 
      id: 'inventory', 
      name: 'Инвентаризация', 
      icon: '📋', 
      path: '/inventory',
      color: '#43e97b'
    },
    { 
      id: 'games', 
      name: 'Игры', 
      icon: '🎮', 
      path: '/games',
      color: '#fa709a'
    },
    { 
      id: 'profile', 
      name: 'Профиль', 
      icon: '👤', 
      path: '/profile',
      color: '#30cfd0'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    onLogout();
    onClose();
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      {/* Профиль пользователя */}
      <div className="sidebar-profile">
        <div className="profile-avatar">
          {user?.photo_url ? (
            <img src={user.photo_url} alt={user.first_name} />
          ) : (
            <div className="avatar-placeholder-large">
              {user?.first_name?.[0] || '?'}
            </div>
          )}
        </div>
        <div className="profile-info">
          <h3>{user?.first_name} {user?.last_name}</h3>
          {user?.username && (
            <p className="username">@{user.username}</p>
          )}
        </div>
      </div>

      {/* Навигационное меню */}
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
            onClick={() => handleNavigation(item.path)}
            style={{
              '--item-color': item.color
            }}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-text">{item.name}</span>
            {currentPage === item.id && (
              <span className="nav-indicator" />
            )}
          </button>
        ))}
      </nav>

      {/* Футер меню */}
      <div className="sidebar-footer">
        <button 
          className="logout-button"
          onClick={handleLogout}
        >
          <span className="logout-icon">🚪</span>
          <span>Выйти</span>
        </button>
        
        <div className="app-version">
          <p>WorkFlow v1.0.0</p>
          <p className="version-text">PWA Edition</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
