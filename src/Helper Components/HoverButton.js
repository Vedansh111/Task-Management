import React from 'react'
import { Link } from 'react-router-dom';

function HoverButton(props) {
    return (
        <Link to={props.to}><button className='ml-2 p-1 rounded-md border border-black hover:bg-black hover:text-white text-lg'>{props.name}</button></Link>
    )
}

export default HoverButton