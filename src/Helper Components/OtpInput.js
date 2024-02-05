import React from 'react'

function OtpInput(props) {
    return (
        (props.var) ? <input className="m-2 border-[1.5px] border-black h-10 w-12 text-center rounded-lg" type="text" id={props.id} maxLength="1" /> : <input className="m-2 border-[1.5px] border-gray-400 h-10 w-12 text-center rounded-lg opacity-65" type="text" id={props.id} maxLength="1" disabled />
    )
}

export default OtpInput