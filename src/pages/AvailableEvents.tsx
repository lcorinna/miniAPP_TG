import { Button, Card, Form, Input, List, message, Modal, Typography } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getAllEvents } from '../api/events';
import { saveApplication } from '../api/userService';
import { BackButton, Wrapper } from '../styles/AvailableEvents.styles';
import { EventRequest } from '../types/event';

const { Title } = Typography;
const { TextArea } = Input;

export default function AvailableEvents() {
  const [events, setEvents] = useState<EventRequest[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventRequest | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    setEvents(getAllEvents());
  }, []);

  const handleApplyClick = (event: EventRequest) => {
    setSelectedEvent(event);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedEvent(null);
  };

  const handleFinish = (values: { comment: string; price: string }) => {
    if (!selectedEvent) return;

    saveApplication({
      eventId: selectedEvent.title,
      comment: values.comment,
      price: values.price,
    });

    message.success('Отклик успешно отправлен!');
    setIsModalVisible(false);
  };

  return (
    <Wrapper>
      <BackButton onClick={() => navigate('/dashboard')}>Назад к профилю</BackButton>

      <Title level={2}>Доступные мероприятия</Title>

      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={events}
        renderItem={(event) => (
          <List.Item key={event.title}>
            <Card
              title={event.title}
              extra={dayjs(event.date).format('DD.MM.YYYY HH:mm')}
              actions={[
                <Button key="apply" type="primary" onClick={() => handleApplyClick(event)}>
                  Откликнуться
                </Button>,
              ]}
            >
              <p>
                <strong>Тип:</strong> {event.type}
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
                <strong>Описание:</strong> {event.description}
              </p>
            </Card>
          </List.Item>
        )}
      />

      <Modal
        title={`Отклик на "${selectedEvent?.title}"`}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleFinish}>
          <Form.Item
            name="comment"
            label="Комментарий"
            rules={[{ required: true, message: 'Введите комментарий' }]}
          >
            <TextArea rows={3} placeholder="Почему вы хотите участвовать?" />
          </Form.Item>

          <Form.Item
            name="price"
            label="Ваша цена за участие (₽)"
            rules={[{ required: true, message: 'Введите вашу цену' }]}
          >
            <Input placeholder="Например, 10000" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Отправить отклик
          </Button>
        </Form>
      </Modal>
    </Wrapper>
  );
}
