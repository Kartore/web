import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ThemeInjector } from '~/components/utils/ThemeInjector/ThemeInjector.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <ThemeInjector />
  </React.StrictMode>
);
