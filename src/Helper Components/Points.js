import React from 'react'

function Points(props) {
    return (
        <div className='font-medium text-2xl mx-[3rem]'>{props.name}<span className='font-semibold text-[1.8rem]'>{props.points}</span></div>
    )
}

export default Points