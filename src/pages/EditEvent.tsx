import { Button, DatePicker, Form, Input, message, Select, Space, Typography } from 'antd';
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';

import { deleteEvent, getEventByIndex, updateEvent } from '../api/events';
import DecimalInput from '../components/DecimalInput';
import { Wrapper } from '../styles/EditEvent.styles';
import { EventRequest } from '../types/event';

const { Title } = Typography;
const { TextArea } = Input;

interface EditEventFormValues {
  title: string;
  description: string;
  date: dayjs.Dayjs;
  budget?: string;
  type: 'online' | 'offline' | 'other';
  goal?: string;
}

export default function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const index = Number(id);
  const event = getEventByIndex(index);

  if (!event) return <Typography.Text>Мероприятие не найдено</Typography.Text>;

  const initialValues = {
    title: event.title,
    description: event.description,
    date: dayjs(event.date),
    budget: event.budget?.toString() || '',
    type: event.type,
    goal: event.goal,
  };

  const onFinish = (values: EditEventFormValues) => {
    const updatedEvent: EventRequest = {
      title: values.title,
      description: values.description,
      date: values.date.toISOString(),
      budget: values.budget ? parseFloat(values.budget) : undefined,
      type: values.type,
      goal: values.goal,
    };

    updateEvent(index, updatedEvent);
    message.success('Мероприятие обновлено!');
    navigate('/my-events');
  };

  const handleDelete = () => {
    deleteEvent(index);
    message.success('Мероприятие удалено');
    navigate('/my-events');
  };

  return (
    <Wrapper>
      <Title level={3}>Редактировать мероприятие</Title>
      <Form layout="vertical" initialValues={initialValues} onFinish={onFinish}>
        <Form.Item name="title" label="Название" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Описание" rules={[{ required: true }]}>
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item name="date" label="Дата и время" rules={[{ required: true }]}>
          <DatePicker
            showTime={{ format: 'HH:mm' }}
            format="DD.MM.YYYY HH:mm"
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item name="budget" label="Бюджет (по желанию)">
          <DecimalInput />
        </Form.Item>
        <Form.Item name="type" label="Тип" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="online">Онлайн</Select.Option>
            <Select.Option value="offline">Оффлайн</Select.Option>
            <Select.Option value="other">Другое</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="goal" label="Цель (по желанию)">
          <Input />
        </Form.Item>

        <Space style={{ width: '100%', justifyContent: 'space-between', marginTop: 16 }}>
          <Button onClick={() => navigate('/my-events')}>Отмена</Button>
          <Button danger onClick={handleDelete}>
            Удалить
          </Button>
          <Button type="primary" htmlType="submit">
            Сохранить
          </Button>
        </Space>
      </Form>
    </Wrapper>
  );
}
