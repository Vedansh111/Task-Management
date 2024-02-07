import React, { useEffect, useState } from 'react';
import SignupPage from './Components/SignupPage';
import LoginPage from './Components/LoginPage';
import OtpPage from './Components/OtpPage';
import ForgetPasswordPage from './Components/ForgetPasswordPage';
import UserEvents from './UserPortal/UserEvents';
import Events from './UserPortal/Events';
import UploadProof from './UserPortal/UploadProof';
import UserProfile from './UserPortal/UserProfile';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const access_token = localStorage.getItem('access_token');
        setIsLoggedIn(!!access_token);
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={isLoggedIn ? <UserEvents /> : <LoginPage />} />
                <Route path="/signup" element={isLoggedIn ? <UserEvents /> : <SignupPage />} />
                <Route path="/login_through_otp" element={isLoggedIn ? <UserEvents /> : <OtpPage />} />
                <Route path="/forgot_password" element={isLoggedIn ? <UserEvents /> : <ForgetPasswordPage />} />
                <Route path="user/" element={<UserEvents />}>
                    <Route path="events" element={<Events />} />
                    <Route path="upload_proof" element={<UploadProof />} />
                    <Route path="user_profile" element={<UserProfile />} />
                </Route>
            </Routes>
        </Router>
    );
}
