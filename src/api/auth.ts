import { UserProfile } from '../types/user';

export const registerUser = async (user: UserProfile): Promise<UserProfile> => {
  console.log('Мокаем регистрацию:', user);

  // Имитируем запрос
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify(user));
      resolve(user);
    }, 500);
  });
};

export const getUser = (): UserProfile | null => {
  const raw = localStorage.getItem('user');
  return raw ? JSON.parse(raw) : null;
};
