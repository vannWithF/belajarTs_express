import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from '../hooks/UseAuth';
import './index.css'

const container = document.getElementById('root');
const root = createRoot(container!); // Gunakan createRoot dan tambahkan null check (!)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
