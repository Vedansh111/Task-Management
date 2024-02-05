import React from 'react';

function SubmitButton(props) {
    return (
        <div className='flex justify-center'>
            <button type='submit' className='py-2 mt-3 border border-black p-2  rounded-md bg-black text-white font-normal font-mono text-lg hover:scale-105'>{props.name}</button>
        </div>
    )
}

export default SubmitButton;