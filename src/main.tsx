import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import { initGA } from './lib/analytics';
import { HelmetProvider } from 'react-helmet-async';
import './i18n';
import App from './App.tsx';
import './index.css';

// Initialize Google Analytics
initGA();

// Register service worker for PWA
registerSW({ immediate: true });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
);
