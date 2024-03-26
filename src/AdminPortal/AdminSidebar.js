import React from 'react';
import { GiNinjaStar } from "react-icons/gi";
import { BsListTask } from "react-icons/bs";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { IoPeople } from "react-icons/io5";
import HoverComponent from '../Helper Components/HoverComponent';

function AdminSidebar(props) {
    return (
        <div>
            <div onClick={props.showSettings} className={`lg:fixed md:fixed sm:static left-0 top-0 lg:w-64 md:w-64 sm:w-full h-full bg-[#ccc6c5] p-4 z-50 sidebar-menu  transition-transform ${props.show ? "" : "-translate-x-full"}`}>
                <div className="flex items-center pb-4 border-b border-b-gray-800">
                    <div className="flex items-center font-extrabold text-3xl">TaskNinja <span className='px-1'><GiNinjaStar /></span></div>
                </div>

                <ul className="mt-9 px-1">
                    {/* Admin */}
                    <div className="text-slate-600 
                    font-bold mt-1">ADMIN</div>
                    <HoverComponent to='dashboard' name='Dashboard'
                        symbol={<RxDashboard />} />
                    <HoverComponent to='events' name='Events'
                        symbol={<BsListTask />} />

                    {/* Requests */}
                    <div className="text-slate-600 font-bold mt-5">REQUESTS</div>
                    <HoverComponent to='participate_requests' name='Participate Request'
                        symbol={<IoPeople />} />
                    <HoverComponent to='proof_requests' name='Proof Request'
                        symbol={<RiUploadCloud2Fill />} />

                    {/* Booth */}
                    <div className="text-slate-600 font-bold mt-5">BOOTH MANAGEMENT</div>
                    <HoverComponent to='admin_booth' name='Booth'
                        symbol={<IoPeople />} />
                    <HoverComponent to='admin_booth_attendence' name='Booth Attendence'
                        symbol={<RiUploadCloud2Fill />} />
                </ul>
            </div>

            <div className={`lg:fixed md:fixed sm:static top-0 left-0 w-full h-full bg-black/50 z-40 md:hidden sidebar-overlay ${props.show ? " " : "hidden"}`}></div>
        </div>
    )
}

export default AdminSidebar