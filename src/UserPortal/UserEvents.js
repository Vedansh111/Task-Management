import React, { useEffect, useState } from 'react';
import UserHeader from './UserHeader';
import UserSideBar from './UserSideBar';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Helper Components/Loader';

function UserEvents() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(0);
    useEffect(() => {
        (localStorage.getItem('access_token') ? navigate('/user/events') : navigate('/user'))
        axios.get(`api/v1/users/find_user?access_token=${localStorage.getItem('access_token')}`).then((res) => {
            console.log(res.data?.user);
            setUserInfo(res.data?.user);
        })
    }, [])

    return (userInfo ?
        <div className='flex font-jura text-[#500025] tracking-wider overflow-hidden h-[100vh]'>
            <div className='font-jura bg-red-900 text-[#500025]'>
                <UserSideBar name={userInfo.name} email={userInfo.email} img={userInfo.avatar_url} />
            </div>
            <div className='w-full'>
                <UserHeader points={userInfo.points} redeemed={userInfo.redeemed} />
                <div className='flex justify-center max-h-full'>
                    <Outlet context={[userInfo]} />
                </div>
            </div>
        </div> : <Loader />
    )
}

export default UserEvents