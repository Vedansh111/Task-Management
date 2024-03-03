import React from 'react';

function SubmitButton(props) {
    return (
        <div className='flex justify-center'>
            <button
                onClick={props.function}
                type='submit'
                className='mt-3 mb-3 border border-gray-800 p-2 rounded-md text-black font-normal text-lg bg-slate-700 hover:scale-105'>{props.name}</button>
        </div>
    )
}

export default SubmitButton;