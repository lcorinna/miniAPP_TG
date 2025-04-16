import { Button, Card, Descriptions, Typography } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getApplications, getUserProfile, isProfileComplete } from '../api/userService';
import { ButtonGroup, Wrapper } from '../styles/Dashboard.styles';

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

  const applications = getApplications();

  return (
    <Wrapper>
      <Title level={2}>Добро пожаловать, {name}!</Title>

      <Card title="Ваш профиль">
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

        <ButtonGroup>
          <Button type="primary" onClick={() => navigate('/edit-profile')}>
            Редактировать профиль
          </Button>

          {profile.role === 'client' && (
            <>
              <Button onClick={() => navigate('/my-events')}>Мои мероприятия</Button>
              <Button type="dashed" onClick={() => navigate('/create-event')}>
                Создать мероприятие
              </Button>
            </>
          )}

          {profile.role === 'influencer' && (
            <Button onClick={() => navigate('/available-events')}>Доступные мероприятия</Button>
          )}
        </ButtonGroup>
      </Card>

      {profile.role === 'influencer' && applications.length > 0 && (
        <Card title="Ваши отклики" style={{ marginTop: 20 }}>
          <ul>
            {applications.map((app, i) => (
              <li key={i}>
                <strong>{app.eventId}</strong> — ₽ {app.price}, комментарий: {app.comment}
              </li>
            ))}
          </ul>
        </Card>
      )}
    </Wrapper>
  );
}
