import { Button, DatePicker, Form, Input, message, Select, Typography } from 'antd';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

import { createEvent } from '../api/events';
import DecimalInput from '../components/DecimalInput';
import { Wrapper } from '../styles/CreateEvent.styles';
import { CreateEventFormValues, EventRequest } from '../types/event';

const { Title } = Typography;
const { TextArea } = Input;

export default function CreateEvent() {
  const navigate = useNavigate();

  const onFinish = async (values: CreateEventFormValues) => {
    const event: EventRequest = {
      title: values.title,
      description: values.description,
      date: values.date.toISOString(),
      budget: values.budget,
      type: values.type,
      goal: values.goal,
    };

    await createEvent(event);
    message.success('Мероприятие создано!');
    navigate('/dashboard');
  };

  return (
    <Wrapper>
      <Title level={3}>Создание мероприятия</Title>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="title" label="Название" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="description" label="Описание" rules={[{ required: true }]}>
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item name="date" label="Дата и время" rules={[{ required: true }]}>
          <DatePicker
            style={{ width: '100%' }}
            showTime={{ format: 'HH:mm' }}
            disabledDate={(current) => current && current < dayjs().startOf('day')}
            format="DD.MM.YYYY HH:mm"
          />
        </Form.Item>

        <Form.Item name="budget" label="Бюджет (по желанию)">
          <DecimalInput />
        </Form.Item>

        <Form.Item name="type" label="Тип мероприятия" rules={[{ required: true }]}>
          <Select placeholder="Выберите тип">
            <Select.Option value="online">Онлайн</Select.Option>
            <Select.Option value="offline">Оффлайн</Select.Option>
            <Select.Option value="other">Другое</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="goal" label="Цель (по желанию)">
          <Input placeholder="Продвижение бренда, увеличение охвата..." />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Создать
        </Button>
      </Form>
    </Wrapper>
  );
}
