import React from 'react';
import { FaClipboardList } from "react-icons/fa6";
import { HiMiniIdentification } from "react-icons/hi2";
import { CgProfile } from "react-icons/cg";
import HoverComponent from '../Helper Components/HoverComponent';

function UserSideBar() {
    return (
        <div className='  w-[20rem] h-full bg-[#ecf1e8] border-[1.8px] border-black border-t-0 flex flex-col items-center'>
            <h1 className='p-4 text-4xl tracking-wider font-extrabold'>TaskNinja</h1>
            <div className='w-full border border-black mt-[6px]'></div>

            <HoverComponent to='events' name='Event' symbol={<FaClipboardList className='pr-1' />} />
            <HoverComponent to='upload_proof' name='Upload Proof' symbol={<HiMiniIdentification className='pr-1' />} />

            <div className='w-full mt-[30rem] border-[1px] border-black'></div>
            <div className='flex items-center justify-between h-full'>
                <CgProfile size={55} />
                <div className='flex flex-col px-2'>
                    <h1 className='font-semibold'>Name</h1>
                    <h1 className='font-medium'>name@gmail.com</h1>
                </div>
            </div>
        </div >
    )
}

export default UserSideBar