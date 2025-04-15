import { EventRequest } from '../types/event';

const mockKey = 'mock-events';

export const createEvent = async (event: EventRequest): Promise<void> => {
  const existing: EventRequest[] = JSON.parse(localStorage.getItem(mockKey) || '[]');
  const updated = [...existing, event];
  localStorage.setItem(mockKey, JSON.stringify(updated));
};

export const getAllEvents = (): EventRequest[] => {
  return JSON.parse(localStorage.getItem(mockKey) || '[]');
};

export const getEventByIndex = (index: number): EventRequest | undefined => {
  const events = getAllEvents();
  return events[index];
};

export const updateEvent = (index: number, updatedEvent: EventRequest): void => {
  const events = getAllEvents();
  events[index] = updatedEvent;
  localStorage.setItem(mockKey, JSON.stringify(events));
};

export const deleteEvent = (index: number): void => {
  const events = getAllEvents();
  events.splice(index, 1);
  localStorage.setItem(mockKey, JSON.stringify(events));
};
