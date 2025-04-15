import { Button, Card, Empty, List, Typography } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getAllEvents } from '../api/events';
import { ButtonGroup, Wrapper } from '../styles/MyEvents.styles';
import { EventRequest } from '../types/event';

const { Title } = Typography;

export default function MyEvents() {
  const [events, setEvents] = useState<EventRequest[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = getAllEvents();
    setEvents(data);
  }, []);

  return (
    <Wrapper>
      <Title level={2}>Мои мероприятия</Title>

      <ButtonGroup>
        <Button onClick={() => navigate('/dashboard')}>Вернуться в профиль</Button>
        <Button type="primary" onClick={() => navigate('/create-event')}>
          Создать новое
        </Button>
      </ButtonGroup>

      {events.length === 0 ? (
        <Empty description="Вы ещё не создали ни одного мероприятия" />
      ) : (
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={events}
          renderItem={(event, index) => (
            <List.Item>
              <Card
                title={event.title}
                extra={
                  <div style={{ display: 'flex', gap: 10 }}>
                    <span>{dayjs(event.date).format('DD.MM.YYYY HH:mm')}</span>
                    <Button size="small" onClick={() => navigate(`/edit-event/${index}`)}>
                      Редактировать
                    </Button>
                  </div>
                }
              >
                <p>
                  <strong>Тип:</strong>{' '}
                  {event.type === 'online'
                    ? 'Онлайн'
                    : event.type === 'offline'
                      ? 'Оффлайн'
                      : 'Другое'}
                </p>
                <p>
                  <strong>Бюджет:</strong>{' '}
                  {event.budget
                    ? `₽ ${event.budget.toLocaleString('ru-RU', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`
                    : '—'}
                </p>
                <p>
                  <strong>Цель:</strong> {event.goal || '—'}
                </p>
                <p>
                  <strong>Описание:</strong> {event.description}
                </p>
              </Card>
            </List.Item>
          )}
        />
      )}
    </Wrapper>
  );
}
