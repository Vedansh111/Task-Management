import React, { useEffect, useState } from 'react';
import UserHeader from './UserHeader';
import UserSideBar from './UserSideBar';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Helper Components/Loader';

function UserEvents() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(0);
    const accessToken = localStorage.getItem('access_token');

    const handleShow = () => {
        axios.get(`api/v1/users/find_user?access_token=${accessToken}`).then((res) => {
            console.log(res.data?.user);
            setUserInfo(res.data?.user);
        }).catch((error) => {
            console.error('Error fetching user data:', error);
            navigate('/');
        });
    }

    useEffect(() => {
        if (!accessToken) {
            navigate('/');
        } else {
            navigate('/user/events')
            handleShow();
        }
    }, []);

    return (
        userInfo ? (
            <div className='h-screen flex font-jura text-[#500025] tracking-wider overflow-hidden'>
                <div className='md:flex md:flex-col md:w-1/4'>
                    <UserSideBar name={userInfo.name} email={userInfo.email} img={userInfo.avatar_url} />
                </div>
                <div className='md:w-3/4'>
                    <UserHeader points={userInfo.points} redeemed={userInfo.redeemed} />
                    <div className='flex justify-center max-h-full'>
                        <Outlet context={[userInfo]} />
                    </div>
                </div>
            </div>
        ) : <Loader />
    );
}

export default UserEvents;
