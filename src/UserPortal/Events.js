import React, { useEffect, useState } from 'react';
import ThComponent from '../Helper Components/ThComponent';
import TdComponent from '../Helper Components/TdComponent';
import FilterDropDown from '../Helper Components/FilterDropDown';
import axios from 'axios';

function Events() {
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        axios.get('api/v1/tasks').then((res) => {
            console.log(res.data?.tasks);
            setTasks(res.data?.tasks);
        })
    }, [])
    return (
        <div className="mt-[2rem] w-[83%] h-[35rem] rounded-md sm:rounded-lg">
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
            <table className="w-full bg-[#ecf1e8] text-lg text-center">
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
                <tbody>
                    {tasks.map((val) => {
                        return (
                            <tr key={val.id}>
                                <TdComponent things={val.event_name} />
                                <TdComponent things={val.date} />
                                <TdComponent things={val.time} />
                                <TdComponent things={val.event_location} />
                                <TdComponent things={val.points} />
                                <TdComponent things={<button className="font-medium text-blue-800 border border-black p-1 rounded-md hover:bg-[#052142] hover:text-white">Request</button>} />
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </div>
       )
}

export default Events;
