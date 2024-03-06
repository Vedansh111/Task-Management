import React, { useEffect, useState } from 'react'
import EventsLoader from '../Helper Components/EventsLoader'
import { useOutletContext } from "react-router-dom"
import axios from 'axios'
import ThComponent from '../Helper Components/ThComponent';
import TdComponent from '../Helper Components/TdComponent';

function UserDashboard() {
    const [tasks, setTasks] = useState(0);
    const [userInfo, fetchUserData] = useOutletContext();
    const [events, setEvents] = useState();

    const handleShow = () => {
        axios.get(`api/v1/participate_volunteers?request_type=approved`).then((res) => {
            console.log(res?.data?.participate_volunteer);
            setTasks(res?.data?.participate_volunteer);
        })
    }

    useEffect(() => {
        axios.get('api/v1/tasks').then((res) => {
            setEvents(res.data?.tasks);
        })
        handleShow();
        fetchUserData();
    }, [])

    return (
        tasks ? (
            <div className='p-6 h-[89vh]'>
                {/* Upper Div - ["No. of users", "No. of events", "No. of something"] */}
                <div className=" h-[18%]  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white  h-[13vh] rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
                        <div className="flex justify-between mb-6 h-full">
                            <div>
                                <div className="flex items-center mb-1">
                                    <div className="text-2xl font-semibold">{userInfo.points ? userInfo.points : 0}</div>
                                </div>
                                <div className="text-sm font-medium text-gray-400">Points</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white h-[13vh] rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
                        <div className="flex justify-between mb-4">
                            <div>
                                <div className="flex items-center mb-1">
                                    <div className="text-2xl font-semibold">{userInfo.redeemed ? userInfo.redeemed : 0}</div>
                                </div>
                                <div className="text-sm font-medium text-gray-400">Reedemed</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white h-[13vh] rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
                        <div className="flex justify-between mb-6">
                            <div>
                                <div className="text-2xl font-semibold mb-1">{events?.length}</div>
                                <div className="text-sm font-medium text-gray-400">New Events</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lower Div - ["Points chart", "Points Table"] */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    {/* Points Chart */}
                    <div className="bg-white h-[65vh] border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md lg:col-span-2">
                        <div className="flex justify-between mb-4 items-start">
                            <div className="font-medium">Order Statistics</div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                            <div className="rounded-md border border-dashed border-gray-200 p-4">
                                <div className="flex items-center mb-0.5">
                                    <div className="text-xl font-semibold">10</div>
                                    <span className="p-1 rounded text-[12px] font-semibold bg-blue-500/10 text-blue-500 leading-none ml-1">$80</span>
                                </div>
                                <span className="text-gray-400 text-sm">Active</span>
                            </div>
                            <div className="rounded-md border border-dashed border-gray-200 p-4">
                                <div className="flex items-center mb-0.5">
                                    <div className="text-xl font-semibold">50</div>
                                    <span className="p-1 rounded text-[12px] font-semibold bg-emerald-500/10 text-emerald-500 leading-none ml-1">+$469</span>
                                </div>
                                <span className="text-gray-400 text-sm">Completed</span>
                            </div>
                            <div className="rounded-md border border-dashed border-gray-200 p-4">
                                <div className="flex items-center mb-0.5">
                                    <div className="text-xl font-semibold">4</div>
                                    <span className="p-1 rounded text-[12px] font-semibold bg-rose-500/10 text-rose-500 leading-none ml-1">-$130</span>
                                </div>
                                <span className="text-gray-400 text-sm">Canceled</span>
                            </div>
                        </div>
                    </div>

                    {/* Points Table */}
                    <div className="bg-white h-[65vh] border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
                        <div className="flex justify-between mb-4 items-start">
                            <div className="font-medium">Approved Events</div>
                        </div>
                        <div className="overflow-auto h-full">
                            <table className="w-full min-w-[460px]">
                                <thead>
                                    <tr>
                                        <ThComponent
                                            moreClasses="rounded-tl-md rounded-bl-md"
                                            name='Event' />
                                        <ThComponent name='Date' />
                                        <ThComponent name='Time' />
                                        <ThComponent name='Location' />
                                        <ThComponent name='Points' />
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
                                                </tr>
                                            )
                                        }))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        ) : <EventsLoader />
    )
}

export default UserDashboard