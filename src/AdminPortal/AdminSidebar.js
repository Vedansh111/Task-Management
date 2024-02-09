import React from 'react'
import { FaClipboardList } from "react-icons/fa6";
import { HiMiniIdentification } from "react-icons/hi2";
import { CgProfile } from "react-icons/cg";
import HoverComponent from '../Helper Components/HoverComponent';

function AdminSidebar() {
    return (
        <div className='  w-[20rem] h-full bg-[#ecf1e8] border-[1.8px] border-black border-t-0 flex flex-col items-center'>
            <h1 className='p-4 text-4xl tracking-wider font-extrabold'>TaskNinja</h1>
            <div className='w-full border border-black mt-[6px]'></div>

            <HoverComponent to='events' name='Events' symbol={<FaClipboardList className='pr-1' />} />
            <HoverComponent to='upload_proof' name='Upload Proof' symbol={<HiMiniIdentification className='pr-1' />} />
            <HoverComponent to='points_history' name='Points History' symbol={<HiMiniIdentification className='pr-1' />} />
        </div >
    )
}

export default AdminSidebar