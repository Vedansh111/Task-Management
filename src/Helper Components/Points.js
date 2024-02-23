import React from 'react'

function Points(props) {
    return (
        <div className='animate-fade-left animate-once animate-ease-out font-medium text-[1.5rem] mx-[3rem] lg:flex md:flex sm:hidden'>{props.name}<span className='font-semibold text-[1.8rem]'>{props.points}</span></div>
    )
}

export default Points