import React, { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import Loader from '../Helper Components/Loader';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminDashboard() {
    const navigate = useNavigate();
    const [settings, setSettings] = useState(0);
    const [sidebarToggle, setSidebarToggle] = useState(1);
    const [userInfo, setUserInfo] = useState(0);
    const accessToken = localStorage.getItem('access_token');

    const handleClickOutside = () => {
        setSidebarToggle(0);
        if (!sidebarToggle) {
            setSidebarToggle(1)
        }
    };

    function showSettings() {
        setSettings(0);
    }

    useEffect(() => {
        if (!accessToken) {
            navigate('/');
        } else {
            axios.get(`api/v1/users/find_user?access_token=${accessToken}`).then((res) => {
                setUserInfo(res.data?.user);
                if (res?.data?.user?.role === 'admin') {
                    navigate('/admin/dashboard');
                }
                if (res?.data?.user?.role === 'volunteer') {
                    navigate('/user/events');
                }
            }).catch((error) => {
                console.error('Error fetching user data:', error);
                navigate('/');
            });
        }
    }, []);

    return (
        userInfo ?
            <div className='text-gray-800 font-inter font-sans tracking-wide'>
                {
                    sidebarToggle ?
                        <>
                            {/* Sidebar */}
                            <AdminSidebar
                                show={sidebarToggle} showSettings={showSettings} />
                            <main className={`w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-200 min-h-screen transition-all main ${sidebarToggle ? "" : "active"}`}>
                                {/* Header */}
                                <AdminHeader
                                    settings={settings}
                                    setSettings={setSettings}
                                    showSettings={showSettings}
                                    show={sidebarToggle}
                                    email={userInfo.email}
                                    name={userInfo.name}
                                    function={handleClickOutside} />
                                {/* Outlet */}
                                <Outlet
                                    context={[userInfo, showSettings]} />
                            </main>
                        </> :
                        <>
                            <main className={`w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-200 min-h-screen transition-all main ${sidebarToggle ? "" : "active"}`}>
                                {/* Header */}
                                <AdminHeader
                                    show={sidebarToggle}
                                    email={userInfo.email}
                                    name={userInfo.name}
                                    function={handleClickOutside} />
                                {/* Outlet */}
                                <Outlet
                                    context={[userInfo, showSettings]} />
                            </main>
                        </>
                }
            </div>
            : <Loader />
    )
}

export default AdminDashboard