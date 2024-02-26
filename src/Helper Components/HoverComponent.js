import React from 'react'
import { NavLink } from 'react-router-dom';

function HoverComponent(props) {
    return (
        <div className='animate-fade-right animate-once animate-ease-out  flex justify-center items-center font-medium text-xl w-full h-[4rem] hover:text-white'>
            <NavLink to={props.to} className={({ isActive }) => `flex md:text-center justify-center items-center font-medium text-[1.5rem] w-full  h-[4rem] hover:bg-[#052142f3] hover:text-white ${isActive ? "text-white bg-[#052142]" : " bg-[#ecf1e8]"}`}>
                {props.symbol}{props.name}</NavLink>
        </div>
    )
}

export default HoverComponent