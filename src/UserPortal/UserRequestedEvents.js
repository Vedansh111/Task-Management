import React, { useEffect, useState } from 'react';
import ThComponent from '../Helper Components/ThComponent';
import TdComponent from '../Helper Components/TdComponent';
import axios from 'axios';
import EventsLoader from '../Helper Components/EventsLoader';
import DropDown from '../Helper Components/DropDown';

function UserRequestedEvents() {
    const [tasks, setTasks] = useState(0);
    const [age, setAge] = useState('pending');
    const items = ['pending', 'approved', 'rejected'];

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
        <div className="w-[85%] rounded-md md:rounded-lg sm:rounded-lg border shadow-lg mt-8">
            <DropDown handleChange={handleChange} items={items} />
            <div className='h-[70vh] overflow-y-scroll'>
                <table className="w-full h-full bg-[#ecf1e8] text-gray-900  text-center ">
                    <thead className="text-gray-700 uppercase bg-[#c6cac3]">
                        <tr>
                            <ThComponent name='Event' />
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
                                <th className='text-2xl' colSpan={8}>No Data Found!!!</th>
                            </tr> :
                            (tasks.map((val) => {
                                return (
                                    <tr key={val.id}>
                                        <TdComponent things={val.task.event_name} />
                                        <TdComponent things={val.task.date} />
                                        <TdComponent things={val.task.time} />
                                        <TdComponent things={val.task.event_location} />
                                        <TdComponent things={val.task.points} />
                                        {age === 'pending' ?
                                            <TdComponent things={<div
                                                className="font-semibold text-white border bg-yellow-600 border-yellow-500 p-1 rounded-md">Requested</div>
                                            } /> : ""
                                        }
                                        {age === 'approved' ?
                                            <TdComponent things={<div
                                                className="font-semibold text-white border bg-green-600 border-green-400 p-1 rounded-md">Approved</div>
                                            } /> : ""
                                        }
                                        {age === 'rejected' ?
                                            <TdComponent things={<div
                                                className="font-semibold text-white border bg-red-600 border-red-400 p-1 rounded-md">Rejected</div>
                                            } /> : ""
                                        }
                                    </tr>
                                )
                            }))
                        }
                    </tbody>
                </table>
            </div>
        </div> : <EventsLoader />
    )
}

export default UserRequestedEvents