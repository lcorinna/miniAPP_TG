import { UserProfile } from '../types/user';
import { getTelegramUser } from './telegram';

export const saveUserProfile = (profile: UserProfile): void => {
  const tgId = profile.telegram.id;
  const key = `tg-user-${tgId}`;
  localStorage.setItem(key, JSON.stringify(profile));
};

export const getUserProfile = (): UserProfile | null => {
  const tgUser = getTelegramUser(); // ← временно мокаем
  const key = `tg-user-${tgUser.id}`;
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : null;
};

export const isProfileComplete = (): boolean => {
  const profile = getUserProfile();
  return !!profile?.phone && !!profile?.birthDate && !!profile?.role;
};

// export const saveUserProfile = async (profile: UserProfile) => {
//   await fetch('/api/user', {
//     method: 'POST',
//     body: JSON.stringify(profile),
//   });
// };
