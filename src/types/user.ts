import dayjs from 'dayjs';

export type Role = 'client' | 'influencer';

export interface TelegramUser {
  id: number;
  username?: string;
  first_name: string;
  last_name?: string;
  photo_url?: string;
}

export interface UserProfile {
  telegram: TelegramUser;
  phone: string;
  email?: string;
  fullName?: string;
  birthDate: string; // YYYY-MM-DD
  role: Role;
}

export interface RegistrationFormValues {
  phone: string;
  email?: string;
  fullName?: string;
  birthDate: dayjs.Dayjs; // потому что DatePicker возвращает dayjs объект
  role: 'client' | 'influencer';
}
