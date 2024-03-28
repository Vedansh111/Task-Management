import React, { useEffect, useState } from 'react';
import UserHeader from './UserHeader';
import UserSideBar from './UserSideBar';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Helper Components/Loader';

function UserEvents() {
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

    const fetchUserData = () => {
        axios.get(`api/v1/users/find_user?access_token=${accessToken}`).then((res) => {
            console.log(res.data?.user);
            setUserInfo(res.data?.user);
            if (res?.data?.user?.role === 'admin') {
                navigate('/admin/dashboard');
            }
            if (res?.data?.user?.role === 'volunteer') {
                navigate('/user/dashboard');
            }
        }).catch((error) => {
            console.error('Error fetching user data:', error);
            navigate('/');
        });
    };

    useEffect(() => {
        if (!accessToken) {
            navigate('/');
        } else {
            navigate('/user/dashboard')
            fetchUserData();
        }
    }, []);

    return (
        userInfo ? (
            <div className='text-gray-800 font-inter font-sans tracking-wide'>
                {
                    sidebarToggle ?
                        <>
                            {/* Sidebar */}
                            <UserSideBar show={sidebarToggle} showSettings={showSettings} userInfo={userInfo} />
                            <main className={`w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-200 min-h-screen transition-all main ${sidebarToggle ? "" : "active"}`}>
                                {/* Header */}
                                <UserHeader
                                    settings={settings}
                                    setSettings={setSettings}
                                    showSettings={showSettings}
                                    img={userInfo.avatar_url}
                                    email={userInfo.email}
                                    points={userInfo.points}
                                    name={userInfo.name}
                                    redeemed={userInfo.redeemed}
                                    show={sidebarToggle}
                                    function={handleClickOutside} />
                                {/* Outlet */}
                                <Outlet
                                    context={[userInfo, fetchUserData, showSettings]} />
                            </main>
                        </> :
                        <>
                            <main className={`w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-200 min-h-screen transition-all main ${sidebarToggle ? "" : "active"}`}>
                                {/* Header */}
                                <UserHeader
                                    points={userInfo.points}
                                    redeemed={userInfo.redeemed}
                                    show={sidebarToggle}
                                    function={handleClickOutside} />
                                {/* Outlet */}
                                <Outlet
                                    context={[userInfo, fetchUserData, showSettings]} />
                            </main>
                        </>
                }
            </div>
        ) : <Loader />
    );
}

export default UserEvents;
