import { useState, useEffect } from 'react';
import './ProfilePage.css';

function ProfilePage({ user }) {
  const [stats, setStats] = useState({
    hoursToday: 0,
    hoursWeek: 0,
    warehouseItems: 0,
    inventoryChecks: 0
  });

  useEffect(() => {
    // Здесь в будущем будет запрос к API
    // Пока имитируем загрузку данных
    if (user) {
      setTimeout(() => {
        setStats({
          hoursToday: 0,
          hoursWeek: 0,
          warehouseItems: 0,
          inventoryChecks: 0
        });
      }, 500);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="profile-page empty">
        <div className="empty-state">
          <span className="empty-icon">👤</span>
          <h2>Добро пожаловать в WorkFlow!</h2>
          <p>Откройте меню (кнопка справа вверху) и авторизуйтесь через Telegram</p>
          <div className="features-hint">
            <div className="hint-item">
              <span>⏰</span>
              <span>Учет времени</span>
            </div>
            <div className="hint-item">
              <span>📦</span>
              <span>Управление складом</span>
            </div>
            <div className="hint-item">
              <span>📋</span>
              <span>Инвентаризация</span>
            </div>
            <div className="hint-item">
              <span>🎮</span>
              <span>Мини-игры</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-avatar">
          {user.photo_url ? (
            <img src={user.photo_url} alt={user.first_name} />
          ) : (
            <div className="avatar-placeholder-xl">
              {user.first_name?.[0] || '?'}
            </div>
          )}
        </div>
        <div className="profile-info">
          <h1>
            {user.first_name} {user.last_name || ''}
            <span className="wave">👋</span>
          </h1>
          {user.username && <p className="username">@{user.username}</p>}
          <div className="badges">
            <span className="badge online">● Онлайн</span>
            <span className="badge">ID: {user.id}</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <button className="action-btn primary">
          <span className="action-icon">⏰</span>
          <span>Отметить приход</span>
        </button>
        <button className="action-btn">
          <span className="action-icon">📦</span>
          <span>Добавить товар</span>
        </button>
        <button className="action-btn">
          <span className="action-icon">🎮</span>
          <span>Играть</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="stats-section">
        <h2>📊 Статистика</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">⏰</div>
            <div className="stat-content">
              <h3>Сегодня</h3>
              <p className="stat-value">{stats.hoursToday} ч</p>
              <span className="stat-label">Отработано</span>
            </div>
            <div className="stat-trend up">+0%</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-content">
              <h3>Неделя</h3>
              <p className="stat-value">{stats.hoursWeek} ч</p>
              <span className="stat-label">Всего</span>
            </div>
            <div className="stat-trend up">+0%</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📦</div>
            <div className="stat-content">
              <h3>Склад</h3>
              <p className="stat-value">{stats.warehouseItems}</p>
              <span className="stat-label">Товаров</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <h3>Проверки</h3>
              <p className="stat-value">{stats.inventoryChecks}</p>
              <span className="stat-label">Инвентаризаций</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity">
        <h2>🕐 Последняя активность</h2>
        <div className="activity-list">
          <div className="activity-empty">
            <span className="empty-icon">📭</span>
            <p>Пока нет активности</p>
            <p className="empty-hint">Начните работу, чтобы увидеть историю</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
