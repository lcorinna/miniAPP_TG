import React from 'react';
import { Typography, Card, Descriptions, Divider, Button, message } from 'antd';
import { getTelegramUser } from '../api/telegram';

const { Title } = Typography;

export default function AdminPage() {
  const user = getTelegramUser();

  const handleTestAction = () => {
    message.info('Это заглушка действия администратора');
  };

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: 24 }}>
      <Title level={2}>Админ-панель</Title>

      <Card title="Информация о текущем пользователе">
        <Descriptions bordered column={1}>
          <Descriptions.Item label="ID">{user.id}</Descriptions.Item>
          <Descriptions.Item label="Имя">
            {user.first_name} {user.last_name ?? ''}
          </Descriptions.Item>
          <Descriptions.Item label="Username">@{user.username ?? '—'}</Descriptions.Item>
        </Descriptions>
      </Card>

      <Divider />

      <Card title="Административные действия">
        <Button type="primary" onClick={handleTestAction}>
          Протестировать действие
        </Button>
      </Card>
    </div>
  );
}
