import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// ===== ДОБАВИТЬ ЭТО =====
// Функция для установки реальной высоты viewport
function setVhProperty() {
  // Получаем реальную высоту viewport
  const vh = window.innerHeight * 0.01;
  // Устанавливаем CSS переменную --vh
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Устанавливаем при загрузке
setVhProperty();

// Обновляем при изменении размера окна
window.addEventListener('resize', setVhProperty);

// Обновляем при изменении ориентации
window.addEventListener('orientationchange', () => {
  setTimeout(setVhProperty, 100);
});

// Для iOS Safari - обновляем при скролле (когда прячется адресная строка)
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      setVhProperty();
      ticking = false;
    });
    ticking = true;
  }
});
// ===== КОНЕЦ ДОБАВЛЕНИЯ =====

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Регистрация Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('SW registered:', registration);
      })
      .catch((error) => {
        console.log('SW registration failed:', error);
      });
  });
}
