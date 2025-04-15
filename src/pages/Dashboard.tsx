import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

export default function Dashboard() {
  const role = localStorage.getItem('userRole');

  return (
    <div style={{ padding: 24 }}>
      <Title>Личный кабинет</Title>
      <p>Вы вошли как: <strong>{role}</strong></p>
    </div>
  );
}
