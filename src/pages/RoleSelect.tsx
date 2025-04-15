import { Button, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ButtonGroup, Container } from './RoleSelect.styles';

const { Title } = Typography;

export default function RoleSelect() {
  const navigate = useNavigate();

  const handleSelect = (role: string) => {
    if (role !== 'admin') {
      localStorage.setItem('userRole', role);
      navigate('/dashboard');
    } else {
      alert('Вход администратора через отдельную ссылку');
    }
  };

  return (
    <Container>
      <Title level={2}>Выберите вашу роль</Title>
      <ButtonGroup>
        <Button type="primary" onClick={() => handleSelect('client')}>
          Я Клиент
        </Button>
        <Button onClick={() => handleSelect('influencer')}>Я Инфлюенсер</Button>
        <Button danger onClick={() => handleSelect('admin')}>
          Я Админ
        </Button>
      </ButtonGroup>
    </Container>
  );
}
