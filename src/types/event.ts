import dayjs from 'dayjs';

export type EventType = 'online' | 'offline' | 'other';

export interface EventRequest {
  title: string;
  description: string;
  date: string; // ISO строка
  budget?: number;
  type: EventType;
  goal?: string;
}

export interface CreateEventFormValues {
  title: string;
  description: string;
  date: dayjs.Dayjs;
  budget?: number;
  type: 'online' | 'offline' | 'other';
  goal?: string;
}

export interface EditProfileFormValues {
  fullName?: string;
  phone: string;
  email?: string;
  birthDate: dayjs.Dayjs;
  role: 'client' | 'influencer';
}
