import React from 'react';
import SignupPage from './Components/SignupPage';
import LoginPage from './Components/LoginPage';
import OtpPage from './Components/OtpPage';
import ForgetPasswordPage from './Components/ForgetPasswordPage';
import { createBrowserRouter } from 'react-router-dom';
import UserEvents from './UserPortal/UserEvents';
import Events from './UserPortal/Events';
import UploadProof from './UserPortal/UploadProof';
import UserProfile from './UserPortal/UserProfile';
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
    {
        path: 'user/',
        element: <UserEvents />,
        children: [
            {
                path: "events",
                element: <Events />,
            },
            {
                path: 'upload_proof',
                element: <UploadProof />,
            },
            {
                path: 'user_profile',
                element: <UserProfile />,
            },
        ]
    }
]);

