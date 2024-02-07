import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import { RouterProvider } from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = 'https://4c0f-2405-201-2026-3800-3d84-9fe7-dc25-cb8b.ngrok-free.app';
axios.defaults.headers.common['ngrok-skip-browser-warning'] = true;
axios.interceptors.request.use(
    config => {
      config.headers['Authorization'] = `Bearer ${localStorage.getItem(
        'access_token',
      )}`;
      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );
  
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={App} />
    </React.StrictMode>
);