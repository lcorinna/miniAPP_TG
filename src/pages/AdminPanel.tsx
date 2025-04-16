import { Button, DatePicker, Input, message, Popconfirm, Space, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { deleteEvent, getAllEvents } from '../api/events';
import { Wrapper } from '../styles/AdminPanel.styles';
import { EventRequest } from '../types/event';

const { Title } = Typography;

type IndexedEvent = EventRequest & { _index: number };

export default function AdminPanel() {
  const [events, setEvents] = useState<IndexedEvent[]>([]);
  const [search, setSearch] = useState('');
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null);

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

  const columns: ColumnsType<IndexedEvent> = [
    {
      title: 'Название',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Тип',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (type === 'online' ? 'Онлайн' : type === 'offline' ? 'Оффлайн' : 'Другое'),
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      render: (date) => dayjs(date).format('DD.MM.YYYY HH:mm'),
    },
    {
      title: 'Бюджет',
      dataIndex: 'budget',
      key: 'budget',
      render: (value) =>
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
      render: (value) => value || '—',
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_, record) => (
        <Space>
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

  const filtered = events.filter((event) => {
    const matchesTitle = event.title.toLowerCase().includes(search.toLowerCase());
    const matchesDate = dateRange
      ? dayjs(event.date).isAfter(dateRange[0].startOf('day')) &&
        dayjs(event.date).isBefore(dateRange[1].endOf('day'))
      : true;
    return matchesTitle && matchesDate;
  });

  return (
    <Wrapper>
      <Space style={{ marginBottom: 16 }}>
        <Input.Search
          placeholder="Поиск по названию"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          allowClear
        />
        <DatePicker.RangePicker
          format="DD.MM.YYYY"
          onChange={(range) => setDateRange(range as [dayjs.Dayjs, dayjs.Dayjs] | null)}
        />
      </Space>
      <Title level={2}>Админ-панель</Title>
      <Table
        columns={columns}
        dataSource={filtered}
        rowKey={(record) => record._index.toString()}
        pagination={{ pageSize: 6 }}
      />
    </Wrapper>
  );
}
