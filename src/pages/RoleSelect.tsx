import React from 'react';
import { Button, Space, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './RoleSelect.module.css';

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

  console.log('Styles =', styles); //

  return (
    <div className={styles.container}>
      <Title level={2}>Выберите вашу роль</Title>
      <Space direction="vertical">
        <Button type="primary" onClick={() => handleSelect('client')}>Я Клиент</Button>
        <Button onClick={() => handleSelect('influencer')}>Я Инфлюенсер</Button>
        <Button danger onClick={() => handleSelect('admin')}>Я Админ</Button>
      </Space>
    </div>
  );
}
