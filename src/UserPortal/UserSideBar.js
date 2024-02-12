import React from 'react';
import { FaClipboardList } from "react-icons/fa6";
import { HiMiniIdentification } from "react-icons/hi2";
import HoverComponent from '../Helper Components/HoverComponent';

function UserSideBar(props) {
    return (
        <div className='w-[20rem] bg-[#ecf1e8] border-[1.8px] border-black border-t-0 border-b-0 flex flex-col items-center'>
            <h1 className='p-4 text-4xl tracking-wider font-extrabold'>TaskNinja</h1>
            <div className='w-full border border-black mt-[6px]'></div>

            <HoverComponent to='events' name='Events' symbol={<FaClipboardList className='pr-1' />} />
            <HoverComponent to='upload_proof' name='Upload Proof' symbol={<HiMiniIdentification className='pr-1' />} />

            <div className='w-full mt-[30rem] border-[1px] border-black'></div>
            <div className='flex items-center justify-between mt-[0.8rem]'>
                <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="img" className='rounded-full w-10 h-10' />
                <div className='flex flex-col px-2'>
                    <h1 className='font-semibold'>{props.name}</h1>
                    <h1 className='font-medium'>{props.email}</h1>
                </div>
            </div>
        </div >
    )
}

export default UserSideBar