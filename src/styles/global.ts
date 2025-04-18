import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
    background-color: #ffffff !important;
    color: #000000 !important;
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }

  * {
    box-sizing: border-box;
  }

  // Антидот против телеграмовской тёмной темы
  [data-theme='dark'],
  body[data-theme='dark'],
  html[data-theme='dark'] {
    background-color: #ffffff !important;
    color: #000000 !important;
  }

  // Убедимся, что элементы ввода и формы тоже светлые
  input,
  textarea,
  select,
  .ant-input,
  .ant-select,
  .ant-picker,
  .ant-form-item-label label {
    background-color: #ffffff !important;
    color: #000000 !important;
  }

  // Антидот для карточек и модалок
  .ant-card,
  .ant-modal-content {
    background-color: #ffffff !important;
    color: #000000 !important;
  }
`;
