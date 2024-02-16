import React, { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import Loader from '../Helper Components/Loader';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminDashboard() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState([]);
    const accessToken = localStorage.getItem('access_token');
    useEffect(() => {
        if (!accessToken) {
            navigate('/');
        } else {
            axios.get(`api/v1/users/find_user?access_token=${accessToken}`).then((res) => {
                // console.log(res.data?.user);
                setUserInfo(res.data?.user);
            }).catch((error) => {
                console.error('Error fetching user data:', error);
                navigate('/');
            });
        }
    }, [navigate]);
    return (
        userInfo ? (
            <div className='h-screen flex font-jura text-[#500025] tracking-wider overflow-hidden'>
                <div className='md:flex md:flex-col md:w-1/4'>
                    <AdminSidebar />
                </div>
                <div className=' md:w-3/4'>
                    <AdminHeader email={userInfo.email} name={userInfo.name} img={userInfo.avatar_url} />
                    <div className='flex justify-center max-h-full'>
                        <Outlet context={userInfo} />
                    </div>
                </div>
            </div>
        ) : <Loader />
    )
}

export default AdminDashboard