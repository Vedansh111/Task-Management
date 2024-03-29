import React from 'react';
import { Link } from 'react-router-dom';
import { LiaGripLinesSolid } from 'react-icons/lia';

function UserHeader(props) {

    function showSettings() {
        props.setSettings(1);
        if (props.settings) {
            props.setSettings(0);
        }
    }

    function handleClick() {
        localStorage.clear();
        // window.reload();
    }

    return (
        <div className={`py-2 px-6 bg-[#eceaea] flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30`}>
            {/* Toogle Button */}
            <button
                onClick={props.function}
                type="button"
                className="text-lg border rounded-md p-1.5 border-gray-400 text-gray-900 font-semibold sidebar-toggle">
                <LiaGripLinesSolid />
            </button>

            <ul className={`ml-auto flex items-center ${props.show ? "" : "hidden"}`}>
                <li className="dropdown ml-3">
                    <button type="button"
                        onClick={showSettings}
                        className="dropdown-toggle flex items-center">
                        <div className="flex-shrink-0 w-10 h-10 relative">
                            <div className="p-1 bg-white rounded-full focus:outline-none focus:ring">
                                <img className="w-8 h-8 rounded-full" src={props.img === "" ? "https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg" : props.img} alt="" />
                                <div className="top-0 left-7 absolute w-3 h-3 bg-lime-400 border-2 border-white rounded-full animate-ping"></div>
                                <div className="top-0 left-7 absolute w-3 h-3 bg-lime-500 border-2 border-white rounded-full"></div>
                            </div>
                        </div>
                        <div className="p-2 md:block text-left">
                            <h2 className="text-sm font-semibold text-gray-800">{props.name}</h2>
                            <p className="text-xs text-gray-500">{props.email}</p>
                        </div>
                    </button>
                    {
                        props.settings ?
                            <ul className="absolute dropdown-menu shadow-md shadow-black/5 z-30 py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                                <li>
                                    <Link to='user_profile'
                                        className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-[#f84525] hover:bg-gray-50 cursor-pointer">
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/'
                                        className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-[#f84525] hover:bg-gray-50 cursor-pointer"
                                        onClick={handleClick}>
                                        Log Out
                                    </Link>
                                </li>
                            </ul>

                            :
                            <div></div>
                    }
                </li>
            </ul>
        </div>
    )
}

export default UserHeader