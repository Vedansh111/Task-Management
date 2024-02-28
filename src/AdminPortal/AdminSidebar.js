import React from 'react'
import { FaClipboardList } from "react-icons/fa6";
import { HiMiniIdentification } from "react-icons/hi2";
import { IoBriefcaseOutline } from "react-icons/io5";
import { IoMdArrowBack } from "react-icons/io";
import HoverComponent from '../Helper Components/HoverComponent';

function AdminSidebar(props) {
    return (
        <div className='bg-[#1C2434] text-white flex flex-col items-center '>
            <div className='animate-fade animate-once animate-delay-[800ms] animate-ease-out flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5'>
                TaskNinja
                <button
                    // className='block lg:hidden' 
                    onClick={props.function}><IoMdArrowBack /></button>
            </div>
            <div className='no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear'>
                <HoverComponent to='events' name='Events' symbol={<FaClipboardList className='pr-1' />} />
                <HoverComponent to='participate_requests' name='Participate Requests' symbol={<IoBriefcaseOutline className='pr-1' />} />
                <HoverComponent to='proof_requests' name='Proof Requests' symbol={<IoBriefcaseOutline className='pr-1' />} />
                <HoverComponent to='points_history' name='Points History' symbol={<HiMiniIdentification className='pr-1' />} />
            </div>
        </div >
    )
}

export default AdminSidebar