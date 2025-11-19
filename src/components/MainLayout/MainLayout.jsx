import { useNavigate, useLocation } from 'react-router-dom';
import LetterGlitch from '../LetterGlitch/LetterGlitch';
import StaggeredMenu from '../StaggeredMenu/StaggeredMenu';
import './MainLayout.css';

function MainLayout({ children, user, onLogin, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: 'Профиль', ariaLabel: 'Мой профиль', path: '/profile' },
    { label: 'Время', ariaLabel: 'Учет времени', path: '/time-tracking' },
    { label: 'Склад', ariaLabel: 'Управление складом', path: '/warehouse' },
    { label: 'Инвентаризация', ariaLabel: 'Проведение инвентаризации', path: '/inventory' },
    { label: 'Игры', ariaLabel: 'Мини-игры', path: '/games' }
  ];

  const handleMenuClick = (path) => {
    navigate(path);
  };

  return (
    <div className="main-layout">
      {/* Анимированный фон */}
      <div className="background-container">
        <LetterGlitch
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={true}
          smooth={true}
          glitchColors={['#2b4539', '#61dca3', '#61b3dc']}
        />
      </div>

      {/* Меню с авторизацией */}
      <StaggeredMenu
        position="right"
        items={menuItems}
        user={user}
        onLogin={onLogin}
        onLogout={onLogout}
        onMenuClick={handleMenuClick}
        currentPath={location.pathname}
        displayItemNumbering={true}
        menuButtonColor="#61dca3"
        openMenuButtonColor="#000"
        changeMenuColorOnOpen={true}
        colors={['rgba(43, 69, 57, 0.95)', 'rgba(97, 220, 163, 0.95)']}
        accentColor="#61dca3"
        isFixed={true}
      />

      {/* Контент страниц */}
      <div className="content-overlay">
        {children}
      </div>
    </div>
  );
}

export default MainLayout;
