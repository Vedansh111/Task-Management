import React from 'react';
import UserHeader from './UserHeader';
import UserSideBar from './UserSideBar';
import { Outlet } from 'react-router-dom';

function UserEvents() {
    return (
        <div className='flex font-jura text-[#500025]'>
            <div className='font-jura h-screen text-[#500025]'>
                <UserSideBar />
            </div>
            <div className=' w-full h-screen'>
                <UserHeader />
                <div className='flex justify-center min-h-[89.4vh]'>
                    <Outlet />
                </div>
            </div>

        </div>
    )
}

export default UserEvents