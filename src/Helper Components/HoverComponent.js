import React from 'react'
import { NavLink } from 'react-router-dom';
function HoverComponent(props) {
    return (
        <div className='flex justify-center items-center font-medium text-3xl w-full h-[4rem] hover:bg-[#052142] hover:text-white'>
            <NavLink to={props.to} className={({ isActive }) => `flex justify-center items-center font-medium text-3xl w-full h-[4rem] hover:bg-[#052142] hover:text-white ${isActive ? "text-white bg-[#052142]" : " bg-[#ecf1e8]"}`}>
                {props.symbol}{props.name}</NavLink>
        </div>
    )
}

export default HoverComponent