import React, { useEffect, useState } from 'react'
import EventsLoader from '../Helper Components/EventsLoader'
import axios from 'axios'

function UserDashboard() {
    const tasks = [1];
    const [events, setEvents] = useState();

    useEffect(() => {
        axios.get('api/v1/tasks').then((res) => {
            setEvents(res.data?.tasks);
        })
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
                                    <div className="text-2xl font-semibold">12</div>
                                </div>
                                <div className="text-sm font-medium text-gray-400">Points</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white h-[13vh] rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
                        <div className="flex justify-between mb-4">
                            <div>
                                <div className="flex items-center mb-1">
                                    <div className="text-2xl font-semibold">32</div>
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
                            <div className="dropdown">
                                <button type="button" className="dropdown-toggle text-gray-400 hover:text-gray-600"><i className="ri-more-fill"></i></button>
                                <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                                    <li>
                                        <div className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Profile</div>
                                    </li>
                                    <li>
                                        <div className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Settings</div>
                                    </li>
                                    <li>
                                        <div className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Logout</div>
                                    </li>
                                </ul>
                            </div>
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
                        <div>
                            <canvas id="order-chart"></canvas>
                        </div>
                    </div>

                    {/* Points Table */}
                    <div className="bg-white h-[65vh] border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
                        <div className="flex justify-between mb-4 items-start">
                            <div className="font-medium">Points Table</div>
                        </div>
                        <div className="overflow-auto h-full">
                            <table className="w-full min-w-[460px]">
                                <thead>
                                    <tr>
                                        <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">User</th>
                                        <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">Points</th>
                                        <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">Redeemed</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <div className="flex items-center">
                                                <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block" />
                                                <div className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</div>
                                            </div>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="text-[13px] font-medium text-emerald-500">+$235</span>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">Pending</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <div className="flex items-center">
                                                <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block" />
                                                <div className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</div>
                                            </div>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="text-[13px] font-medium text-rose-500">-$235</span>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">Withdrawn</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <div className="flex items-center">
                                                <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block" />
                                                <div className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</div>
                                            </div>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="text-[13px] font-medium text-emerald-500">+$235</span>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">Pending</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <div className="flex items-center">
                                                <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block" />
                                                <div className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</div>
                                            </div>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="text-[13px] font-medium text-rose-500">-$235</span>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">Withdrawn</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <div className="flex items-center">
                                                <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block" />
                                                <div className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</div>
                                            </div>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="text-[13px] font-medium text-emerald-500">+$235</span>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">Pending</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <div className="flex items-center">
                                                <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block" />
                                                <div className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</div>
                                            </div>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="text-[13px] font-medium text-rose-500">-$235</span>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">Withdrawn</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <div className="flex items-center">
                                                <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block" />
                                                <div className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</div>
                                            </div>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="text-[13px] font-medium text-emerald-500">+$235</span>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">Pending</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <div className="flex items-center">
                                                <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block" />
                                                <div className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</div>
                                            </div>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="text-[13px] font-medium text-rose-500">-$235</span>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">Withdrawn</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <div className="flex items-center">
                                                <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block" />
                                                <div className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</div>
                                            </div>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="text-[13px] font-medium text-emerald-500">+$235</span>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">Pending</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <div className="flex items-center">
                                                <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block" />
                                                <div className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</div>
                                            </div>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="text-[13px] font-medium text-rose-500">-$235</span>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">Withdrawn</span>
                                        </td>
                                    </tr>
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