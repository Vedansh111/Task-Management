import React, { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import Loader from '../Helper Components/Loader';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminDashboard() {
    const [sidebarToggle, setSidebarToggle] = useState(true);


    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(0);
    const accessToken = localStorage.getItem('access_token');

    const handleClickOutside = () => {
        setSidebarToggle(false);
        console.log('aasdf');
    };

    useEffect(() => {
        if (!accessToken) {
            navigate('/');
        } else {
            axios.get(`api/v1/users/find_user?access_token=${accessToken}`).then((res) => {
                setUserInfo(res.data?.user);
                if (res?.data?.user?.role === 'admin') {
                    navigate('/admin/events');
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
        userInfo ? (
            <div className='flex h-screen overflow-hidden font-sans tracking-wide'>
                <aside
                    className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarToggle ? 'translate-x-0' : '-translate-x-full'}`}
                // onClick={handleClickOutside}
                >
                    <AdminSidebar function={handleClickOutside} />
                </aside>
                <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
                    <header className='sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none'>
                        <AdminHeader email={userInfo.email} name={userInfo.name} img={userInfo.avatar_url} />
                    </header>
                    <main>
                        <div className='mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10'>
                            <Outlet context={userInfo} />
                        </div>
                    </main>
                </div>
            </div >
        ) : <Loader />
    )
}

export default AdminDashboard