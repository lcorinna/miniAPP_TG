import { Button, Card, Descriptions, Divider, message, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import { getTelegramUser } from '../api/telegram';
import { ActionsGroup, Wrapper } from '../styles/AdminPage.styles';

const { Title } = Typography;

export default function AdminPage() {
  const user = getTelegramUser();
  const navigate = useNavigate();

  const handleTestAction = () => {
    message.info('Это заглушка действия администратора');
  };

  return (
    <Wrapper>
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
        <ActionsGroup>
          <Button type="primary" onClick={handleTestAction}>
            Протестировать действие
          </Button>
          <Button type="primary" onClick={() => navigate('/admin/events')}>
            Управление мероприятиями
          </Button>
        </ActionsGroup>
      </Card>
    </Wrapper>
  );
}
