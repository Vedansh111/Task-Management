import React from 'react';
import SignupPage from './Components/SignupPage';
import LoginPage from './Components/LoginPage';
import OtpPage from './Components/OtpPage';
import ForgetPasswordPage from './Components/ForgetPasswordPage';
import { createBrowserRouter } from 'react-router-dom';

export const App = createBrowserRouter([
    {
        path: '/',
        element: <LoginPage />,
    },
    {
        path: '/signup',
        element: <SignupPage />,
    },
    {
        path: '/login_through_otp',
        element: <OtpPage />,
    },
    {
        path: '/forgot_password',
        element: <ForgetPasswordPage />,
    },
]);

