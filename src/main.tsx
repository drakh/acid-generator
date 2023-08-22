import React from 'react';
import ReactDOM from 'react-dom/client';
import PiwikPro from '@piwikpro/react-piwik-pro';
import { Provider } from 'react-redux';
import App from './App';
import './index.less';
import { store } from './store.ts';

import.meta.env.DEV
  ? null
  : PiwikPro.initialize(
      '7062d80e-1b2c-45b1-818b-6dea3457644c',
      'https://drakh.containers.piwik.pro',
    );

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
