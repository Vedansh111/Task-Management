import React from 'react';
import Points from '../Helper Components/Points';
import { IoMdSettings } from "react-icons/io";
import { MdOutlinePowerSettingsNew } from "react-icons/md";
import { Link } from 'react-router-dom';
function UserHeader(props) {

    function handleClick() {
        localStorage.clear();
        window.reload();
    }
    return (
        <div className='h-[5rem] w-full bg-[#ecf1e8] flex items-center border-[2px] border-black border-x-0 border-t-0 border-s-0'>
            <Points name='Points:' points={props.points} />
            <Points name='Redeemed:' points={props.redeemed} />
            <div className='animate-fade-left animate-once animate-ease-out mx-1 flex justify-around items-center absolute right-5'>
                <Link to='user_profile'><IoMdSettings size={30} className='mx-3' /></Link>
                <Link to='/' onClick={handleClick}><MdOutlinePowerSettingsNew size={30} className='mx-3' /></Link>
            </div>
        </div>
    )
}

export default UserHeader