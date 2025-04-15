import { Input } from 'antd';
import React, { useState } from 'react';

type Props = {
  value?: string;
  onChange?: (value: string) => void;
  max?: number;
};

export default function DecimalInput({ value = '', onChange, max = 100_000_000_000 }: Props) {
  const [display, setDisplay] = useState(formatDisplay(value));

  function formatDisplay(val: string) {
    const numeric = val.replace(/\D/g, '');
    return numeric.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const numeric = raw.replace(/\D/g, ''); // только цифры

    if (numeric === '') {
      setDisplay('');
      onChange?.('');
      return;
    }

    const number = parseInt(numeric);
    if (number > max) return;

    const formatted = numeric.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    setDisplay(formatted);
    onChange?.(numeric); // без пробелов
  };

  return (
    <Input value={display} onChange={handleChange} prefix="₽" placeholder="0" inputMode="numeric" />
  );
}
