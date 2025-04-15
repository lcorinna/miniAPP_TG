import { Button, Card, Descriptions, Typography } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getUserProfile, isProfileComplete } from '../api/userService';

const { Title } = Typography;

export default function Dashboard() {
  const navigate = useNavigate();
  const profile = getUserProfile();

  useEffect(() => {
    if (!isProfileComplete()) {
      navigate('/register');
    }
  }, []);

  if (!profile) return null;

  const name =
    profile.fullName || `${profile.telegram.first_name} ${profile.telegram.last_name ?? ''}`;

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: 20 }}>
      <Title level={2}>Добро пожаловать, {name}!</Title>

      <Card title="Ваш профиль" style={{ marginBottom: 20 }}>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Телефон">{profile.phone}</Descriptions.Item>
          <Descriptions.Item label="Email">{profile.email || '—'}</Descriptions.Item>
          <Descriptions.Item label="Дата рождения">{profile.birthDate}</Descriptions.Item>
          <Descriptions.Item label="Роль">
            {profile.role === 'client' ? 'Клиент' : 'Инфлюенсер'}
          </Descriptions.Item>
          <Descriptions.Item label="Telegram ID">{profile.telegram.id}</Descriptions.Item>
          <Descriptions.Item label="Telegram username">
            @{profile.telegram.username ?? '—'}
          </Descriptions.Item>
        </Descriptions>

        <Button
          type="primary"
          style={{ marginTop: 20 }}
          onClick={() => navigate('/edit-profile')}
        >
          Редактировать профиль
        </Button>
      </Card>
    </div>
  );
}
