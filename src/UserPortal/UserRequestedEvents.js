import React, { useEffect, useState } from 'react';
import ThComponent from '../Helper Components/ThComponent';
import TdComponent from '../Helper Components/TdComponent';
import axios from 'axios';
import EventsLoader from '../Helper Components/EventsLoader';
import DropDown from '../Helper Components/DropDown';

function UserRequestedEvents() {
    const [tasks, setTasks] = useState(0);
    const [age, setAge] = useState('approved');
    const items = ['approved', 'pending', 'rejected'];

    const handleChange = (e) => {
        setAge(e.target.value);
    };

    const handleShow = () => {
        axios.get(`api/v1/participate_volunteers?request_type=${age}`).then((res) => {
            console.log(res?.data?.participate_volunteer);
            setTasks(res?.data?.participate_volunteer);
        })
    }

    useEffect(() => {
        handleShow();
    }, [age])

    return (tasks ?
        <div className='p-6'>
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-6">
                <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md h-[82vh]">
                    <div className="flex justify-between mb-4 items-start">
                        <DropDown handleChange={handleChange} items={items} />
                    </div>
                    <div className="animate-fade-left animate-delay-100 animate-once animate-ease-out overflow-auto lg:h-[90%] md:h-[90%]">
                        <table className="w-full min-w-[460px] z-0">
                            <thead className='uppercase'>
                                <tr>
                                    <ThComponent
                                        moreClasses="rounded-tl-md rounded-bl-md"
                                        name='Event' />
                                    <ThComponent name='Date' />
                                    <ThComponent name='Time' />
                                    <ThComponent name='Location' />
                                    <ThComponent name='Points' />
                                    <ThComponent name='Status' />
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.length === 0 ?
                                    <tr>
                                        <th className='text-[12px] uppercase tracking-wide font-medium text-gray-400 pt-[13rem] text-lg' colSpan={8}>No Data Found!</th>
                                    </tr> :
                                    (tasks.map((val) => {
                                        return (
                                            <tr key={val.id} >
                                                <td className="py-2 px-4 border-b border-b-gray-50">
                                                    <div className="flex items-center">
                                                        {/* <img src={val.task.event_poster_url} alt="" className="w-8 h-8 rounded-md object-cover block" /> */}
                                                        <TdComponent things={val.task.event_name} />
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4 border-b border-b-gray-50">
                                                    <TdComponent things={val.task.date} />
                                                </td>
                                                <td className="py-3 px-4 border-b border-b-gray-50">
                                                    <TdComponent things={val.task.time} />
                                                </td>
                                                <td className="py-3 px-4 border-b border-b-gray-50">
                                                    <TdComponent things={val.task.event_location} />
                                                </td>
                                                <td className="py-3 px-4 border-b border-b-gray-50">
                                                    <TdComponent things={val.task.points} />
                                                </td>
                                                {age === 'approved' ?
                                                    <td className='py-3 border-b border-b-gray-50'>
                                                        <TdComponent things={<div className="font-semibold border border-green-500 p-1 rounded-md bg-[#34cc40] text-white text-center">Approved</div>} />
                                                    </td>
                                                    :
                                                    ""
                                                }
                                                {age === 'pending' ?
                                                    <td className='py-3 border-b border-b-gray-50'>
                                                        <TdComponent things={<div className="font-semibold border border-yellow-300 p-1 rounded-md bg-yellow-500 text-white text-center">Pending</div>} />
                                                    </td>
                                                    :
                                                    ""
                                                }
                                                {age === 'rejected' ?
                                                    <td className='py-3 border-b border-b-gray-50'>
                                                        <TdComponent things={<div className="font-semibold border bg-red-600 border-red-400 p-1 rounded-md text-white text-center">Rejected</div>} />
                                                    </td>
                                                    :
                                                    ""
                                                }
                                            </tr>
                                        )
                                    }))
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div> : <EventsLoader />
    )
}

export default UserRequestedEvents