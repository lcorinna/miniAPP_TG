import { EventRequest } from '../types/event';

const mockKey = 'mock-events';

export const createEvent = async (event: EventRequest): Promise<void> => {
  const existing = JSON.parse(localStorage.getItem(mockKey) || '[]');
  const updated = [...existing, event];
  localStorage.setItem(mockKey, JSON.stringify(updated));
};

export const getAllEvents = (): EventRequest[] => {
  return JSON.parse(localStorage.getItem(mockKey) || '[]');
};
