import React from 'react';

function SubmitButton(props) {
    return (
        <div className='flex justify-center'>
            <button
                type='submit'
                className='mt-3 mb-3 p-2 text-white rounded-md border border-gray-500 font-medium text-lg hover:scale-105'
                style={{ backgroundColor: 'black' }}>
                {props.name}
            </button>
        </div >
    )
}

export default SubmitButton;