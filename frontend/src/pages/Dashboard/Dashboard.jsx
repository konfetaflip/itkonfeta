import { useNavigate } from 'react-router-dom';
import LetterGlitch from '../../components/LetterGlitch/LetterGlitch';
import StaggeredMenu from '../../components/StaggeredMenu/StaggeredMenu';
import './Dashboard.css';

function Dashboard({ user, onLogout }) {
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Главная', ariaLabel: 'Главная страница', link: '/dashboard' },
    { label: 'Время', ariaLabel: 'Учет времени', link: '/time-tracking' },
    { label: 'Склад', ariaLabel: 'Управление складом', link: '/warehouse' },
    { label: 'Инвентаризация', ariaLabel: 'Проведение инвентаризации', link: '/inventory' },
    { label: 'Игры', ariaLabel: 'Мини-игры', link: '/games' },
    { label: 'Профиль', ariaLabel: 'Мой профиль', link: '/profile' }
  ];

  const socialItems = [
    { label: 'Telegram', link: 'https://telegram.org' },
    { label: 'Поддержка', link: '#support' }
  ];

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const handleMenuAction = (action) => {
    if (action === 'logout') {
      handleLogout();
    }
  };

  return (
    <div className="dashboard">
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

      {/* Меню */}
      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#61dca3"
        openMenuButtonColor="#000"
        changeMenuColorOnOpen={true}
        colors={['rgba(43, 69, 57, 0.95)', 'rgba(97, 220, 163, 0.95)']}
        accentColor="#61dca3"
        isFixed={true}
      />

      {/* Контент */}
      <div className="content-overlay">
        <main className="dashboard-main">
          <div className="welcome-section">
            <h2>🎉 Добро пожаловать, {user.first_name}!</h2>
            <p className="subtitle">
              Система успешно запущена. Выберите модуль в меню справа.
            </p>
          </div>
          
          <div className="modules-grid">
            <div className="module-card">
              <span className="module-icon">⏰</span>
              <h3>Учет времени</h3>
              <p>Отмечайте приход и уход</p>
              <span className="badge">Скоро</span>
            </div>

            <div className="module-card">
              <span className="module-icon">📦</span>
              <h3>Склад</h3>
              <p>Управление расходниками</p>
              <span className="badge">Скоро</span>
            </div>

            <div className="module-card">
              <span className="module-icon">📋</span>
              <h3>Инвентаризация</h3>
              <p>Проверка остатков</p>
              <span className="badge">Скоро</span>
            </div>

            <div className="module-card">
              <span className="module-icon">🎮</span>
              <h3>Игры</h3>
              <p>Релакс в перерывах</p>
              <span className="badge">Скоро</span>
            </div>
          </div>

          <div className="logout-section">
            <button onClick={handleLogout} className="logout-button">
              🚪 Выйти из системы
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
