import { useEffect, useRef } from 'react';
import './TelegramAuth.css';

function TelegramAuth({ botName, onAuth }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!botName) {
      console.error('Telegram bot name is required');
      return;
    }

    // Очищаем предыдущий виджет
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }

    // Создаём глобальную функцию для callback
    window.onTelegramAuth = (user) => {
      console.log('Telegram auth success:', user);
      
      if (user && user.id) {
        onAuth(user);
      }
    };

    // Создаём скрипт виджета
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.setAttribute('data-telegram-login', botName);
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-radius', '8');
    script.setAttribute('data-request-access', 'write');
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');
    script.async = true;

    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }

    return () => {
      window.onTelegramAuth = null;
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [botName, onAuth]);

  return (
    <div className="telegram-auth-container">
      <div ref={containerRef} className="telegram-widget" />
    </div>
  );
}

export default TelegramAuth;
