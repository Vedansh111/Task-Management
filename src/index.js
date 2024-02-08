import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes } from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = 'https://09e4-2405-201-2026-3800-58e5-1f32-ab6e-df0b.ngrok-free.app';
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
    <>
        <App />
    </>
);