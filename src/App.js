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
import AdminBooth from './Booth Management/Admin/AdminBooth';
import AdminBoothAttendence from './Booth Management/Admin/AdminBoothAttendence';
import UserBooth from './Booth Management/User/UserBooth';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
    return (
        <Router>
            <Routes>
                {/* Pages */}
                <Route path="/" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login_through_otp" element={<OtpPage />} />
                <Route path="/forgot_password" element={<ForgetPasswordPage />} />

                {/* User Side */}
                <Route path="user/" element={<UserEvents />}>
                    <Route path="dashboard" element={<UserDashboard />} />
                    <Route path="events" element={<Events />} />
                    <Route path="status_events" element={<UserRequestedEvents />} />
                    <Route path="upload_proof" element={<UploadProof />} />
                    <Route path="event_qr" element={<EventQr />} />
                    <Route path="user_profile" element={<UserProfile />} />
                    <Route path="user_booth" element={<UserBooth />} />
                </Route>

                {/* Admin Side */}
                <Route path="admin/" element={<AdminDashboard />}>
                    <Route path="events" element={<AdminEvents />} />
                    <Route path="participate_requests" element={<AdminRequests />} />
                    <Route path="proof_requests" element={<AdminProofRequests />} />
                    <Route path="dashboard" element={<AdminPointsHistory />} />
                    <Route path="admin_booth" element={<AdminBooth />} />
                    <Route path="admin_booth_attendence" element={<AdminBoothAttendence />} />
                </Route>

                {/* Error */}
                <Route path='*' element={<ErrorPage />} />
            </Routes>
        </Router>
    );
}
