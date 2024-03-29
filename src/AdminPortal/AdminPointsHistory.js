import React, { useEffect, useState } from 'react';
import EventsLoader from '../Helper Components/EventsLoader';
import axios from 'axios';
import TdComponent from '../Helper Components/TdComponent';
import ThComponent from '../Helper Components/ThComponent';
import { useOutletContext } from "react-router-dom";
import ReactApexChart from 'react-apexcharts';

function AdminPointsHistory() {
    const showSettings = useOutletContext();
    const [tasks, setTasks] = useState(0);
    const [events, setEvents] = useState(0);
    const [points, setPoints] = useState([]);
    const [redeemed, setRedeemed] = useState([]);
    const [names, setNames] = useState([]);

    // For date...
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');
    const year = today.getFullYear();
    const options = { weekday: 'short' };
    const dayOfWeek = today.toLocaleDateString('en-US', options);

    const seriesData = [{
        name: 'Points',
        type: 'column',
        data: points,
    }, {
        name: 'Redeemed',
        type: 'line',
        data: redeemed,
    }];

    const optionsData = {
        chart: {
            height: 350,
            type: 'line',
        },
        stroke: {
            width: [0, 2]
        },
        // title: {
        //     text: 'Points History'
        // },
        dataLabels: {
            enabled: true,
            enabledOnSeries: [1]
        },
        labels: names,
        xaxis: {
            type: 'category'
        },
        yaxis: [{
            title: {
                text: 'Points',
            },
        }, {
            opposite: true,
            title: {
                text: 'Redeemed'
            }
        }]
    };

    useEffect(() => {
        axios.get('api/v1/tasks').then((res) => {
            setEvents(res.data?.tasks);
        })

        axios.get('api/v1/users').then((res) => {
            console.log(res.data);
            setTasks(res.data?.users);
            setNames(res.data?.users.map(user => user.name));
            setPoints(res.data?.users.map(user => user.points ? user.points : 0));
            setRedeemed(res.data?.users.map(user => user.redeemed ? user.redeemed : 0));
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    return (
        tasks ? (
            <div onClick={showSettings[1]} className='p-6 lg:h-[89vh] md:h-full sm:h-full'>
                {/* Upper Div - ["No. of users", "No. of events", "No. of something"] */}
                <div className="lg:h-[18%] grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:mb-5 md:mb-6 sm:mb-6">
                    <div className="bg-white  h-[13vh] rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
                        <div className="flex justify-between mb-6 h-full">
                            <div>
                                <div className="flex items-center mb-1">
                                    <div className="text-2xl font-semibold">{tasks.length ? tasks.length : 0}</div>
                                </div>
                                <div className="text-sm font-medium text-gray-400">Users</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white h-[13vh] rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
                        <div className="flex justify-between mb-4">
                            <div>
                                <div className="flex items-center mb-1">
                                    <div className="text-2xl font-semibold">{events?.length}</div>
                                </div>
                                <div className="text-sm font-medium text-gray-400">Events</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white h-[13vh] rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
                        <div className="flex justify-between mb-6">
                            <div>
                                <div className="text-2xl font-semibold mb-1">{`${month}-${day}-${year}`}</div>
                                <div className="text-sm font-medium text-gray-400">{dayOfWeek}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lower Div - ["Points chart", "Points Table"] */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    {/* Points Chart */}
                    <div className="bg-white h-[65vh] border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md lg:col-span-2">
                        <div className="flex justify-between mb-4 items-start">
                            <div className="font-medium">Points History</div>
                        </div>
                        <div className='mt-4'>
                            <ReactApexChart options={optionsData} series={seriesData} type="line" height={400} />
                        </div>
                    </div>

                    {/* Points Table */}
                    <div className="bg-white h-[65vh] border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
                        <div className="flex justify-between mb-4 items-start">
                            <div className="font-medium">Points Table</div>
                        </div>
                        <div className="overflow-auto h-[93%]">
                            <table className="w-full lg:min-w-[460px]">
                                <thead>
                                    <tr>
                                        <ThComponent
                                            moreClasses="rounded-tl-md rounded-bl-md"
                                            name='User' />
                                        <ThComponent name='Points' />
                                        <ThComponent name='Redeemed' />
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
                                                            <TdComponent things={val.name} />
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-4 border-b border-b-gray-50">
                                                        <TdComponent things={val.points ? val.points : 0} />
                                                    </td>
                                                    <td className="py-3 px-4 border-b border-b-gray-50">
                                                        <TdComponent things={val.redeemed ? val.redeemed : 0} />
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

export default AdminPointsHistory