import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';

axios.defaults.baseURL = 'https://0202-2405-201-2026-3800-5cda-992f-953-2549.ngrok-free.app';
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
        <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
            theme="light"
        />
    </>
);