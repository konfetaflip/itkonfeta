import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LetterGlitch from '../../components/LetterGlitch/LetterGlitch';
import StaggeredMenu from '../../components/StaggeredMenu/StaggeredMenu';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const menuItems = [
    { label: 'Главная', ariaLabel: 'Перейти на главную', link: '/' },
    { label: 'О системе', ariaLabel: 'Узнать о системе', link: '#about' },
    { label: 'Возможности', ariaLabel: 'Посмотреть возможности', link: '#features' }
  ];

  const socialItems = [
    { label: 'Telegram', link: 'https://telegram.org' },
    { label: 'GitHub', link: 'https://github.com' }
  ];

  const handleTestLogin = () => {
    setIsLoading(true);
    const testUser = {
      id: 123456,
      first_name: 'Тест',
      last_name: 'Пользователь',
      username: 'testuser'
    };
    
    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify(testUser));
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="home-page">
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
        isFixed={false}
      />

      {/* Контент поверх фона */}
      <div className="content-overlay">
        <div className="hero-section">
          <div className="hero-content">
            <h2 className="hero-title">
              Система учета для вашей команды
            </h2>
            
            <p className="hero-description">
              Учет рабочего времени, управление складом, инвентаризация 
              и развлечения в одном приложении
            </p>

            <button 
              onClick={handleTestLogin}
              className="test-login-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-small"></span>
                  Вход...
                </>
              ) : (
                <>🔐 Войти в систему</>
              )}
            </button>
          </div>

          <div className="features-preview">
            <div className="feature-card">
              <div className="feature-icon">⏰</div>
              <h3>Учет времени</h3>
              <p>Отмечайте приход и уход</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📦</div>
              <h3>Склад</h3>
              <p>Управление расходниками</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📋</div>
              <h3>Инвентаризация</h3>
              <p>Проверка остатков</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🎮</div>
              <h3>Игры</h3>
              <p>Релакс в перерывах</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
