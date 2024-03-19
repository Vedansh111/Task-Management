import React, { useCallback, useEffect, useState } from 'react';
import ThComponent from '../Helper Components/ThComponent';
import TdComponent from '../Helper Components/TdComponent';
import axios from 'axios';
import EventsLoader from '../Helper Components/EventsLoader';
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
                title: "Requested!",
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

    const viewPoster = (val) => {
        console.log(val);
        tasks.filter((value) => {
            if (value.id === val) {
                Swal.fire({
                    title: "Event Poster",
                    imageWidth: '95%',
                    imageHeight: 'auto',
                    imageUrl: value.event_poster_url,
                    imageAlt: "The event poster"
                });
            }
        })
    }

    useEffect(() => {
        handleShow();
    }, [])

    return (
        tasks ?
            <div className='p-6'>
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-6">
                    <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md h-[82vh]">
                        <div className="flex justify-between mb-4 items-start">
                            <div className="font-medium">All Events</div>
                        </div>
                        <div className="animate-fade-left animate-delay-100 animate-once animate-ease-out overflow-auto lg:h-[93%] md:h-[93%]">
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
                                        <ThComponent name='Poster' />
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
                                                            <img src={val.event_poster_url} alt="" className="w-8 h-8 rounded-md object-cover block" />
                                                            <TdComponent things={val.event_name} />
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-4 border-b border-b-gray-50">
                                                        <TdComponent things={val.date} />
                                                    </td>
                                                    <td className="py-3 px-4 border-b border-b-gray-50">
                                                        <TdComponent things={val.time} />
                                                    </td>
                                                    <td className="py-3 px-4 border-b border-b-gray-50">
                                                        <TdComponent things={val.event_location} />
                                                    </td>
                                                    <td className="py-3 px-4 border-b border-b-gray-50">
                                                        <TdComponent things={val.points} />
                                                    </td>
                                                    <td className="py-3 px-4 border-b border-b-gray-50">
                                                        <TdComponent things={<button
                                                            onClick={() => viewPoster(val.id)}
                                                            className="font-semibold text-blue-800 border border-gray-300 p-1 rounded-md hover:bg-[#558ccb] hover:text-white">View</button>} />
                                                    </td>
                                                    <td className="py-3 px-4 border-b border-b-gray-50">
                                                        <TdComponent things={<button
                                                            onClick={() => handleRequest(val.id)}
                                                            className="font-semibold text-blue-800 border border-gray-300 p-1 rounded-md hover:bg-[#558ccb] hover:text-white">Request</button>} />
                                                    </td>
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

export default Events;
