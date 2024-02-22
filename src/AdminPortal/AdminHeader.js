import React from 'react'
import { MdOutlinePowerSettingsNew } from "react-icons/md";
import { Link } from 'react-router-dom';

function AdminHeader(props) {
    function handleClick() {
        localStorage.clear();
        window.reload();
    }
    return (
        <div className='h-[5rem] w-full bg-[#ecf1e8] flex items-center border-[2px] border-black border-x-0 border-t-0 border-s-0'>
            <div className='animate-fade-left animate-once animate-ease-out flex justify-around items-center absolute right-[1rem]'>
                {/* <Link to='user_profile'><IoMdSettings size={30} /></Link> */}
                <div className='flex items-center justify-between h-full '>
                    <img src="https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg" alt="img" className='object-center rounded-full w-[3rem] h-[3rem]' />
                    <div className='flex flex-col pl-2 ml-1'>
                        <h1 className='font-semibold'>{props.name}</h1>
                        <h1 className='font-medium'>{props.email}</h1>
                    </div>
                </div>
                <div className='border border-black h-[5rem] mx-4'></div>
                <Link to='/' className='ml-1' onClick={handleClick}><MdOutlinePowerSettingsNew size={30} /></Link>
            </div>
        </div>
    )
}

export default AdminHeader