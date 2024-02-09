import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import AdminNewEvent from './AdminNewEvent';
function AdminEvents() {
    const data = useOutletContext();
    console.log(data);
    function handleAdd() {

    }
    return (
        <div className="mt-[2rem] w-[83%] h-[35rem] rounded-md sm:rounded-lg">
            <div className='flex flex-col absolute right-7'>
                <button
                    onClick={handleAdd}
                    className=' flex items-center justify-center rounded-full bg-black text-white font-extrabold text-6xl w-[4rem] h-[4rem] '>
                    +
                </button>
                <p className='mt-1'>Add Event</p>
            </div>
            <AdminNewEvent />
        </div>
    )
}

export default AdminEvents