import { useState } from 'react';
import Sidebar from './Sidebar';
import './Layout.css';

function Layout({ children, user, onLogout, currentPage }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="layout">
      {/* Overlay для затемнения при открытом меню */}
      <div 
        className={`overlay ${isSidebarOpen ? 'active' : ''}`}
        onClick={toggleSidebar}
      />

      {/* Выдвижное меню */}
      <Sidebar 
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
        user={user}
        onLogout={onLogout}
        currentPage={currentPage}
      />

      {/* Основной контент */}
      <div className="main-container">
        {/* Шапка */}
        <header className="app-header">
          <button 
            className="menu-btn"
            onClick={toggleSidebar}
            aria-label="Открыть меню"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          <div className="header-title">
            <h1>WorkFlow</h1>
          </div>

          <div className="header-user">
            {user && (
              <div className="user-avatar-small">
                {user.photo_url ? (
                  <img src={user.photo_url} alt={user.first_name} />
                ) : (
                  <div className="avatar-placeholder-small">
                    {user.first_name[0]}
                  </div>
                )}
              </div>
            )}
          </div>
        </header>

        {/* Контент страницы */}
        <main className="app-content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
