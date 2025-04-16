import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 24px;
`;

export const BackButton = styled.button`
  margin-bottom: 16px;
  background: none;
  border: 1px solid #d9d9d9;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #4096ff;
    color: #4096ff;
  }
`;
