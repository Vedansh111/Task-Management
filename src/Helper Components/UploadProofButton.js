import React from 'react'

function UploadProofButton(props) {
    return (
        <button
            onClick={props.function}
            className='border border-gray-500 p-1 mx-1 my-1 rounded-md hover:bg-slate-800 hover:text-white'>{props.name}</button>
    )
}

export default UploadProofButton