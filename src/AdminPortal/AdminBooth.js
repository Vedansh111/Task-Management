import React from 'react';
import EventsLoader from '../Helper Components/EventsLoader';

function AdminBooth() {
    const tasks = [1, 2, 3];

    return (
        tasks ? (
            <div className='p-6'>
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-6">
                    <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md h-[82vh]">
                    </div>
                </div>
            </div>
        ) : <EventsLoader />
    )
}

export default AdminBooth