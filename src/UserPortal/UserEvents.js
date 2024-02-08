import React, { useEffect } from 'react';
import UserHeader from './UserHeader';
import UserSideBar from './UserSideBar';
import { Outlet, useNavigate } from 'react-router-dom';

function UserEvents() {
    const navigate = useNavigate();
    useEffect(() => {
        (localStorage.getItem('access_token') ? navigate('/user/events') : navigate('/user'))
    }, [])

    return (
        <div className='flex font-jura text-[#500025]'>
            <div className='font-jura h-screen text-[#500025]'>
                <UserSideBar />
            </div>
            <div className=' w-full'>
                <UserHeader />
                <div className='flex justify-center items-center max-h-[89.4vh]'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default UserEvents