import React from 'react';
import SignupPage from './Components/SignupPage';
import LoginPage from './Components/LoginPage';
import OtpPage from './Components/OtpPage';
import ForgetPasswordPage from './Components/ForgetPasswordPage';
import UserEvents from './UserPortal/UserEvents';
import Events from './UserPortal/Events';
import UploadProof from './UserPortal/UploadProof';
import UserProfile from './UserPortal/UserProfile';
import AdminDashboard from './AdminPortal/AdminDashboard';
import AdminEvents from './AdminPortal/AdminEvents';
import AdminRequests from './AdminPortal/AdminRequests';
import AdminPointsHistory from './AdminPortal/AdminPointsHistory';
import ErrorPage from './Components/ErrorPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
    // const access_token = localStorage.getItem('access_token');
    // const role = localStorage.getItem('role');
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login_through_otp" element={<OtpPage />} />
                <Route path="/forgot_password" element={<ForgetPasswordPage />} />
                <Route path="user/" element={<UserEvents />}>
                    <Route path="events" element={<Events />} />
                    <Route path="upload_proof" element={<UploadProof />} />
                    <Route path="user_profile" element={<UserProfile />} />
                </Route>
                <Route path="admin/" element={<AdminDashboard />}>
                    <Route path="events" element={<AdminEvents />} />
                    <Route path="requests" element={<AdminRequests />} />
                    <Route path="points_history" element={<AdminPointsHistory />} />
                </Route>
                <Route path='*' element={<ErrorPage />} />
            </Routes>
        </Router>
    );
}
