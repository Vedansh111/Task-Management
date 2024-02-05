import React from 'react';
import Points from './Points';
import { IoMdSettings } from "react-icons/io";
import { MdOutlinePowerSettingsNew } from "react-icons/md";
import { Link } from 'react-router-dom';
function UserHeader() {
    return (
        <div className='h-[5rem] w-full bg-[#ecf1e8] flex items-center border-[2px] border-black border-x-0 border-t-0 border-s-0'>
            <Points name='Points:' points='22' />
            <Points name='Redeemed:' points='30' />
            <div className='flex justify-around items-center ml-[45rem] w-[7rem]'>
                <Link to='user_profile'><IoMdSettings size={30} /></Link>
                <Link to='/'><MdOutlinePowerSettingsNew size={30} /></Link>
            </div>
        </div>
    )
}

export default UserHeader