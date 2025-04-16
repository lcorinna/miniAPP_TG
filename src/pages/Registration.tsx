import { Button, DatePicker, Form, Input, message, Select, Typography } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getTelegramUser } from '../api/telegram';
import { saveUserProfile } from '../api/userService';
import { RegistrationFormValues, UserProfile } from '../types/user';

const { Title } = Typography;
const { Option } = Select;

export default function Registration() {
  const [telegramUser, setTelegramUser] = useState(getTelegramUser());
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values: RegistrationFormValues) => {
    const profile: UserProfile = {
      telegram: telegramUser,
      phone: values.phone,
      email: values.email,
      fullName: values.fullName,
      birthDate: values.birthDate.format('YYYY-MM-DD'),
      role: values.role,
    };

    // const age = dayjs().diff(profile.birthDate, 'year');
    // if (age < 18) {
    //   message.error('Регистрация доступна только пользователям 18+');
    //   return;
    // }

    saveUserProfile(profile);
    message.success('Профиль успешно создан!');
    navigate('/dashboard');
  };

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: 20 }}>
      <Title level={2}>Завершите регистрацию</Title>

      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="Ваше имя из Telegram">
          <Input disabled value={`${telegramUser.first_name} ${telegramUser.last_name ?? ''}`} />
        </Form.Item>

        <Form.Item
          name="fullName"
          label="ФИО (при необходимости)"
          tooltip="Вы можете указать полное имя вручную, если хотите"
        >
          <Input placeholder="Фамилия Имя Отчество" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Номер телефона"
          rules={[{ required: true, message: 'Введите номер телефона' }]}
        >
          <Input placeholder="+7..." />
        </Form.Item>

        <Form.Item name="email" label="Email (необязательно)">
          <Input placeholder="example@mail.ru" />
        </Form.Item>

        <Form.Item
          name="birthDate"
          label="Дата рождения"
          rules={[{ required: true, message: 'Введите дату рождения' }]}
        >
          <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="role"
          label="Кем вы являетесь?"
          rules={[{ required: true, message: 'Выберите роль' }]}
        >
          <Select placeholder="Выберите роль">
            <Option value="client">Клиент</Option>
            <Option value="influencer">Инфлюенсер</Option>
          </Select>
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={loading} block>
          Пройдите регистрацию
        </Button>
      </Form>
    </div>
  );
}
