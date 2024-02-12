import React, { useEffect, useState } from 'react';
import ThComponent from '../Helper Components/ThComponent';
import TdComponent from '../Helper Components/TdComponent';
import FilterDropDown from '../Helper Components/FilterDropDown';
import axios from 'axios';
import EventsLoader from '../Helper Components/EventsLoader';

function Events() {
    // const [tasks, setTasks] = useState(0);
    const tasks = [1, 2, 3, 4, 5]

    useEffect(() => {

        axios.get('api/v1/tasks').then((res) => {
            console.log(res.data?.tasks);
            // setTasks(res.data?.tasks);
        })
    }, [])
    return (tasks ?
        <div className="w-[80%] rounded-md sm:rounded-lg border shadow-lg mt-8">
            <FilterDropDown items={[
                {
                    name: 'Last Day',
                    no: 10,
                },
                {
                    name: 'Last Week',
                    no: 20,
                },
                {
                    name: 'Last Month',
                    no: 30,
                },
            ]} />
            <div className='h-[70vh] overflow-scroll'>
                <table className="w-full h-full bg-[#ecf1e8] text-gray-900  text-center ">
                    <thead className=" text-gray-700 uppercase bg-[#c6cac3]">
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
                        {tasks.map((val) => {
                            return (
                                <tr key={val.id}>
                                    <TdComponent things={val.event_name} />
                                    <TdComponent things={val.date} />
                                    <TdComponent things={val.time} />
                                    <TdComponent things={val.event_location} />
                                    <TdComponent things={val.points} />
                                    <TdComponent things={<button className="font-semibold text-blue-800 border border-black p-1 rounded-md hover:bg-[#052142] hover:text-white">Request</button>} />
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>
        </div> : <EventsLoader />
    )
}

export default Events;
