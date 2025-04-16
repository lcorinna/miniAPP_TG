import { Button, DatePicker, Input, message, Popconfirm, Select, Space, Table, Typography } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { deleteEvent, getAllEvents } from '../api/events';
import { EventRequest } from '../types/event';
import { Wrapper } from '../styles/AdminPanel.styles';

const { Title, Text } = Typography;

const { RangePicker } = DatePicker;
const { Option } = Select;

type IndexedEvent = EventRequest & { _index: number };

export default function AdminPanel() {
  const [events, setEvents] = useState<IndexedEvent[]>([]);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = getAllEvents().map((event, index) => ({ ...event, _index: index }));
    setEvents(data);
  }, []);

  const handleDelete = (index: number) => {
    deleteEvent(index);
    const updated = getAllEvents().map((event, idx) => ({ ...event, _index: idx }));
    setEvents(updated);
    message.success('Мероприятие удалено');
  };

  const filtered = events.filter((event) => {
    const matchesTitle = event.title.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter ? event.type === typeFilter : true;
    const matchesDate = dateRange
      ? dayjs(event.date).isAfter(dateRange[0].startOf('day')) &&
        dayjs(event.date).isBefore(dateRange[1].endOf('day'))
      : true;
    return matchesTitle && matchesType && matchesDate;
  });

  const totalBudget = filtered.reduce((acc, curr) => acc + (curr.budget || 0), 0);

  const columns = [
    {
      title: 'Название',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Тип',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (type === 'online' ? 'Онлайн' : type === 'offline' ? 'Оффлайн' : 'Другое'),
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => dayjs(date).format('DD.MM.YYYY HH:mm'),
    },
    {
      title: 'Бюджет',
      dataIndex: 'budget',
      key: 'budget',
      render: (value: number) =>
        value
          ? `₽ ${value.toLocaleString('ru-RU', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`
          : '—',
    },
    {
      title: 'Цель',
      dataIndex: 'goal',
      key: 'goal',
      render: (value: string) => value || '—',
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_: unknown, record: IndexedEvent) => (
        <Space>
          <Button size="small" onClick={() => navigate(`/edit-event/${record._index}`)}>
            Редактировать
          </Button>
          <Popconfirm
            title="Удалить мероприятие?"
            onConfirm={() => handleDelete(record._index)}
            okText="Да"
            cancelText="Нет"
          >
            <Button danger size="small">
              Удалить
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Wrapper>
      <Title level={2}>Админ-панель: мероприятия</Title>
      <Space style={{ marginBottom: 16 }}>
        <Input.Search
          placeholder="Поиск по названию"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          allowClear
        />
        <RangePicker
          format="DD.MM.YYYY"
          onChange={(range) => setDateRange(range as [dayjs.Dayjs, dayjs.Dayjs] | null)}
        />
        <Select
          placeholder="Фильтр по типу"
          onChange={(value) => setTypeFilter(value)}
          allowClear
          style={{ width: 150 }}
        >
          <Option value="online">Онлайн</Option>
          <Option value="offline">Оффлайн</Option>
          <Option value="other">Другое</Option>
        </Select>
      </Space>

      <Table
        columns={columns}
        dataSource={filtered}
        rowKey={(record) => record._index.toString()}
        pagination={{ pageSize: 6 }}
        footer={() => (
          <Space>
            <Text>Всего мероприятий: {filtered.length}</Text>
            <Text>Суммарный бюджет: ₽ {totalBudget.toLocaleString('ru-RU')}</Text>
          </Space>
        )}
      />
    </Wrapper>
  );
}
