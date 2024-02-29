import React from 'react';

function SubmitButton(props) {
    return (
        <div className='flex justify-center'>
            <button
                onClick={props.function}
                type='submit'
                className='py-2 mt-3 mb-3 border border-black p-2 rounded-md text-black font-normal text-lg bg-black hover:scale-105'>{props.name}</button>
        </div>
    )
}

export default SubmitButton;