import 'dayjs/locale/ru';

import { Button, DatePicker, Form, Input, message, Select, Typography } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getTelegramUser } from '../api/telegram';
import { saveUserProfile } from '../api/userService';
import { RegistrationWrapper } from '../styles/Registration.styles';
import { RegistrationFormValues, UserProfile } from '../types/user';

dayjs.locale('ru');
dayjs.extend(customParseFormat);

const { Title } = Typography;
const { Option } = Select;

export default function Registration() {
  const [telegramUser, setTelegramUser] = useState(getTelegramUser());
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    form.setFieldsValue({
      fullName: `${telegramUser.first_name} ${telegramUser.last_name ?? ''}`.trim(),
    });
  }, [form, telegramUser]);

  const onFinish = (values: RegistrationFormValues) => {
    const birthDate = dayjs(values.birthDate, ['DD.MM.YYYY', 'DD.MM.YY'], true);
    if (!birthDate.isValid()) {
      message.error('Некорректный формат даты');
      return;
    }

    const profile: UserProfile = {
      telegram: telegramUser,
      phone: values.phone,
      email: values.email,
      fullName: values.fullName,
      birthDate: birthDate.format('YYYY-MM-DD'),
      role: values.role,
    };

    saveUserProfile(profile);
    message.success('Профиль успешно создан!');
    navigate('/dashboard');
  };

  return (
    <RegistrationWrapper>
      <Title level={2}>Пройдите регистрацию</Title>

      <Form layout="vertical" form={form} onFinish={onFinish}>
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
          rules={[
            { required: true, message: 'Введите номер телефона' },
            {
              pattern: /^\+?[0-9]{9,15}$/,
              message: 'Допускаются только цифры и знак "+" в начале',
            },
          ]}
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
          <DatePicker
            format="DD.MM.YYYY"
            inputReadOnly={false}
            placeholder="дд.мм.гггг"
            style={{ width: '100%' }}
          />
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
          Зарегистрироваться
        </Button>
      </Form>
    </RegistrationWrapper>
  );
}
