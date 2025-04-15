import styled from 'styled-components';

export const Container = styled.div`
  text-align: center;
  margin-top: 100px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  // Эта магия заставит кнопки быть шириной по наибольшей
  & > button {
    min-width: 170px; // вручную, либо можно подставить auto-measure
  }
`;
