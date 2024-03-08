import React from 'react';
import { FaClipboardList } from "react-icons/fa6";
import { HiMiniIdentification } from "react-icons/hi2";
import HoverComponent from '../Helper Components/HoverComponent';
import { GiNinjaStar } from 'react-icons/gi';
import { RxDashboard } from 'react-icons/rx';
import { GrStatusInfo } from "react-icons/gr";

function UserSideBar(props) {
    return (
        <div>
            <div onClick={props.showSettings} className={`fixed left-0 top-0 w-64 h-full bg-[#ccc6c5] p-4 z-50 sidebar-menu  transition-transform ${props.show ? "" : "-translate-x-full"}`}>
                <div className="flex items-center pb-4 border-b border-b-gray-800">
                    <div className="flex items-center font-extrabold text-3xl">TaskNinja <span className='px-1'><GiNinjaStar /></span></div>
                </div>

                <ul className="mt-9 px-1">
                    <div className="text-slate-600 
                    font-bold mt-1">USER</div>
                    <HoverComponent to='dashboard' name='Dashboard'
                        symbol={<RxDashboard />} />
                    <HoverComponent to='events' name='All Events'
                        symbol={<FaClipboardList />} />
                    <HoverComponent to='status_events' name='Event Status'
                        symbol={<GrStatusInfo />} />

                    <div className="text-slate-600 font-bold mt-5">REQUESTS</div>
                    <HoverComponent to='upload_proof' name='Upload Proof'
                        symbol={<HiMiniIdentification />} />
                </ul>
            </div>

            <div className={`fixed top-0 left-0 w-full h-full bg-black/50 z-40 md:hidden sidebar-overlay ${props.show ? " " : "hidden"}`}></div>
        </div >
    )
}

export default UserSideBar