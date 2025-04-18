import { createRoot } from 'react-dom/client';

import App from './App';
import { GlobalStyle } from './styles/global';

console.log('BUILD TIME:', new Date().toISOString());

const root = createRoot(document.getElementById('root')!);

root.render(
  <>
    <GlobalStyle />
    <App />
  </>,
);
