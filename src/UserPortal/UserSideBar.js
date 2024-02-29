import React from 'react';
import { FaClipboardList } from "react-icons/fa6";
import { HiMiniIdentification } from "react-icons/hi2";
import HoverComponent from '../Helper Components/HoverComponent';

function UserSideBar(props) {
    return (
        <div className='h-full bg-[#ecf1e8] border-[1.8px] border-black border-t-0 border-b-0 flex flex-col items-center'>
            <h1 className='animate-fade animate-once animate-delay-[800ms] animate-ease-out p-4 text-4xl tracking-wider font-extrabold'>TaskNinja</h1>
            <div className='w-full border border-black mt-[6px]'></div>

            <HoverComponent to='events' name='Events' symbol={<FaClipboardList className='pr-1' />} />
            <HoverComponent to='status_events' name='Status Events' symbol={<FaClipboardList className='pr-1' />} />
            <HoverComponent to='upload_proof' name='Upload Proof' symbol={<HiMiniIdentification className='pr-1' />} />

            <div className='w-full mt-[27.8rem] border-[1px] border-black'></div>
            <div className='animate-fade-right animate-once animate-ease-out flex items-center justify-between mt-[0.8rem]'>
                <img src={props.img} alt="img" className='object-center rounded-full w-[3rem] h-[3rem] border border-gray-400' />
                <div className='flex flex-col px-2'>
                    <h1 className='font-semibold'>{props.name}</h1>
                    <h1 className='font-medium'>{props.email}</h1>
                </div>
            </div>
        </div >
    )
}

export default UserSideBar