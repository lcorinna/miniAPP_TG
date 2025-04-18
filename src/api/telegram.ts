import { TelegramUser } from '../types/user';

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        initDataUnsafe?: {
          user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            photo_url?: string;
          };
        };
      };
    };
  }
}

export const getTelegramUser = (): TelegramUser => {
  const tgUser = window.Telegram?.WebApp?.initDataUnsafe?.user;

  if (tgUser) {
    const user: TelegramUser = {
      id: tgUser.id,
      first_name: tgUser.first_name,
      last_name: tgUser.last_name ?? '',
      username: tgUser.username ?? '',
      photo_url: tgUser.photo_url ?? '',
    };

    localStorage.setItem('telegramUser', JSON.stringify(user));
    return user;
  }

  console.warn('Telegram WebApp user not available — fallback to mock');
  return {
    id: 123456789,
    first_name: 'Алексей',
    last_name: 'Иванов',
    username: 'aleksei_dev',
    photo_url: '',
  };
};
