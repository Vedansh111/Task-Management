import React from 'react'
import a from '../Images/1481.gif'
function Loader() {
    return (
        <div className='flex justify-center items-center w-full h-screen'>
            <img src={a} alt="gif" className='w-[256px] h-[256px]' />
        </div>
    )
}

export default Loader;