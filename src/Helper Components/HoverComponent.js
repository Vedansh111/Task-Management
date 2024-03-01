import React from 'react'
import { NavLink } from 'react-router-dom';

function HoverComponent(props) {
    return (
        <li className="mb-1 group text-balance">
            <NavLink to={props.to}
                className={({ isActive }) => `animate-fade-right animate-once animate-ease-out flex font-semibold items-center py-2 px-2 text-gray-900 hover:bg-gray-950 hover:text-gray-100 hover:rounded-md rounded-md 
                ${isActive ? 'bg-gray-950 text-gray-100' : 'text-gray-900 '} `}>
                <i className="ri-home-2-line mr-3 text-lg"></i>
                <span className="flex items-center text-base">{props.symbol}<span className='px-1'>{props.name}</span></span>
            </NavLink>
        </li >

    )
}

export default HoverComponent