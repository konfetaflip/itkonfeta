import { useEffect, useRef } from 'react';
import './TelegramAuth.css';

function TelegramAuth({ botName, onAuth }) {
  const containerRef = useRef(null);

  useEffect(() => {
    // Очищаем контейнер
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }

    // Создаем скрипт Telegram Widget
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.setAttribute('data-telegram-login', botName);
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-radius', '8');
    script.setAttribute('data-request-access', 'write');
    script.async = true;

    // Callback для авторизации
    window.onTelegramAuth = (user) => {
      console.log('Telegram auth success:', user);
      onAuth(user);
    };

    script.setAttribute('data-onauth', 'onTelegramAuth(user)');

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
    <div className="telegram-auth">
      <div ref={containerRef} className="telegram-widget-container" />
    </div>
  );
}

export default TelegramAuth;
