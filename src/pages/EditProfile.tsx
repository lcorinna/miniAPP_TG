import { Button, DatePicker, Form, Input, message, Select, Typography } from 'antd';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getUserProfile, saveUserProfile } from '../api/userService';
import { EditProfileFormValues } from '../types/event';

const { Title } = Typography;

export default function EditProfile() {
  const navigate = useNavigate();
  const profile = getUserProfile();

  useEffect(() => {
    if (!profile) navigate('/register');
  }, []);

  if (!profile) return null;

  const initialValues = {
    fullName: profile.fullName,
    phone: profile.phone,
    email: profile.email,
    birthDate: dayjs(profile.birthDate),
    role: profile.role,
  };

  const onFinish = (values: EditProfileFormValues) => {
    const updated = {
      ...profile,
      fullName: values.fullName,
      phone: values.phone,
      email: values.email,
      birthDate: values.birthDate.format('YYYY-MM-DD'),
      role: values.role,
    };

    saveUserProfile(updated);
    message.success('Профиль обновлён!');
    navigate('/dashboard');
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <Title level={3}>Редактирование профиля</Title>

      <Form layout="vertical" initialValues={initialValues} onFinish={onFinish}>
        <Form.Item name="fullName" label="ФИО">
          <Input />
        </Form.Item>

        <Form.Item name="phone" label="Телефон" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="email" label="Email">
          <Input />
        </Form.Item>

        <Form.Item name="birthDate" label="Дата рождения" rules={[{ required: true }]}>
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="role" label="Роль" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="client">Клиент</Select.Option>
            <Select.Option value="influencer">Инфлюенсер</Select.Option>
          </Select>
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Сохранить изменения
        </Button>
      </Form>
    </div>
  );
}
