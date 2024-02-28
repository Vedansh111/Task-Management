import React, { useCallback, useEffect, useState } from 'react';
import ThComponent from '../Helper Components/ThComponent';
import TdComponent from '../Helper Components/TdComponent';
import axios from 'axios';
import EventsLoader from '../Helper Components/EventsLoader';
// import DropDown from '../Helper Components/DropDown';
import { useOutletContext } from "react-router-dom";
import Swal from 'sweetalert2';

function Events() {
    const userInfo = useOutletContext();
    const [tasks, setTasks] = useState(0);
    const formData = new FormData();

    const handleRequest = (val) => {
        console.log(val)
        formData.append('participate[user_id]', userInfo[0]?.id);
        formData.append('participate[task_id]', val);
        axios.post('api/v1/participate_volunteers', formData).then((res) => {
            console.log(res);
            Swal.fire({
                title: "Requested!!!",
                text: "Your request is sent.",
                icon: "success"
            });
            if (res.data) {
                handleShow();
            }
        }).catch((err) => {
            console.log(err);
        })
        console.log(val, userInfo[0]?.id);
    };

    const handleShow = useCallback(() => {
        axios.get('api/v1/tasks').then((res) => {
            setTasks(res.data?.tasks);
            console.log(res.data?.tasks);
        })
    }, [])

    useEffect(() => {
        handleShow();
    }, [])

    return (tasks ?
        <div className="w-[85%] rounded-md md:rounded-lg sm:rounded-lg border shadow-lg mt-[5rem]">
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
                    <tbody className=''>
                        {tasks.length === 0 ?
                            <tr>
                                <th className='text-2xl' colSpan={8}>No Data Found!!!</th>
                            </tr> :
                            (tasks.map((val) => {
                                return (
                                    <tr key={val.id}>
                                        <TdComponent things={val.event_name} />
                                        <TdComponent things={val.date} />
                                        <TdComponent things={val.time} />
                                        <TdComponent things={val.event_location} />
                                        <TdComponent things={val.points} />
                                        <TdComponent things={<button
                                            onClick={() => handleRequest(val.id)}
                                            className="font-semibold text-blue-800 border border-black p-1 rounded-md hover:bg-[#052142] hover:text-white">Request</button>} />
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

export default Events;
