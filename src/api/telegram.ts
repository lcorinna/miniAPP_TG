import { TelegramUser } from '../types/user';

// Пока просто возвращает статичный мок
export const getTelegramUser = (): TelegramUser => ({
  id: 123456789,
  first_name: 'Алексей',
  last_name: 'Иванов',
  username: 'aleksei_dev',
  photo_url: 'https://t.me/i/userpic/320/some_user.jpg',
});

// export const getTelegramUser = (): TelegramUser => ({
//   id: 123456789, // временный Telegram ID
//   first_name: 'Admin',
//   last_name: 'McSecret',
//   username: 'admin_dev',
//   photo_url: '',
// });
