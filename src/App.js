import React from 'react';
import SignupPage from './Components/SignupPage';
import LoginPage from './Components/LoginPage';
import OtpPage from './Components/OtpPage';
import ErrorPage from './Components/ErrorPage';
import ForgetPasswordPage from './Components/ForgetPasswordPage';
import UserEvents from './UserPortal/UserEvents';
import Events from './UserPortal/Events';
import UploadProof from './UserPortal/UploadProof';
import UserProfile from './UserPortal/UserProfile';
import UserDashboard from './UserPortal/UserDashboard';
import UserRequestedEvents from './UserPortal/UserRequestedEvents';
import EventQr from './UserPortal/EventQr';
import AdminDashboard from './AdminPortal/AdminDashboard';
import AdminEvents from './AdminPortal/AdminEvents';
import AdminRequests from './AdminPortal/AdminRequests';
import AdminPointsHistory from './AdminPortal/AdminPointsHistory';
import AdminProofRequests from './AdminPortal/AdminProofRequests';
import AdminBooth from './AdminPortal/AdminBooth';
import AdminBoothAttendence from './AdminPortal/AdminBoothAttendence';
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
                    <Route path="dashboard" element={<UserDashboard />} />
                    <Route path="events" element={<Events />} />
                    <Route path="status_events" element={<UserRequestedEvents />} />
                    <Route path="upload_proof" element={<UploadProof />} />
                    <Route path="event_qr" element={<EventQr />} />
                    <Route path="user_profile" element={<UserProfile />} />
                </Route>
                <Route path="admin/" element={<AdminDashboard />}>
                    <Route path="events" element={<AdminEvents />} />
                    <Route path="participate_requests" element={<AdminRequests />} />
                    <Route path="proof_requests" element={<AdminProofRequests />} />
                    <Route path="dashboard" element={<AdminPointsHistory />} />
                    <Route path="booth" element={<AdminBooth />} />
                    <Route path="booth_attendence" element={<AdminBoothAttendence />} />
                </Route>
                <Route path='*' element={<ErrorPage />} />
            </Routes>
        </Router>
    );
}
