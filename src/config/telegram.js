export const TELEGRAM_CONFIG = {
    BOT_NAME: import.meta.env.VITE_TELEGRAM_BOT_NAME || 'autorizationkonfetabot',
  };
  
  export function checkTelegramAuth(authData) {
    if (!authData || !authData.id) {
      return false;
    }
  
    const authDate = authData.auth_date;
    const currentTime = Math.floor(Date.now() / 1000);
    
    if (currentTime - authDate > 86400) {
      console.warn('Auth data is too old');
      return false;
    }
  
    return true;
  }
  