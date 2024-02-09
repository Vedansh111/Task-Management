import React, { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminDashboard() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState([]);
    useEffect(() => {
        (localStorage.getItem('access_token')) ? navigate('/admin/events') : navigate('/admin');
        axios.get(`api/v1/users/find_user?access_token=${localStorage.getItem('access_token')}`).then((res) => {
            console.log(res.data?.user);
            setUserInfo(res.data?.user);
        })
    }, [])
    return (
        <div className='flex font-jura text-[#500025] tracking-wider'>
            <div className='font-jura h-screen text-[#500025]'>
                <AdminSidebar />
            </div>
            <div className=' w-full'>
                <AdminHeader email={userInfo.email} name={userInfo.name} img={userInfo.avatar_url} />
                <div className='flex justify-center items-center max-h-[89.4vh]'>
                    <Outlet context={userInfo}/>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard