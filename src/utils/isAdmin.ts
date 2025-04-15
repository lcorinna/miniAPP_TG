import { getTelegramUser } from '../api/telegram';

const ADMIN_IDS = [123456789]; // список ID админов

export const isAdmin = (): boolean => {
  const user = getTelegramUser();
  return ADMIN_IDS.includes(user.id);
};
