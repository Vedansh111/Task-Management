import axios from 'axios';
import React, { useEffect, useState } from 'react'
import TdComponent from '../Helper Components/TdComponent';
import ThComponent from '../Helper Components/ThComponent';
import FilterDropDown from '../Helper Components/FilterDropDown';
import UploadButton from '../Helper Components/UploadButton';

function UploadProof() {
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
                        <ThComponent name='Status' />
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((val) => {
                        return (
                            <tr key={val.id}>
                                <TdComponent things={val.event_name} />
                                <TdComponent things={val.date} />
                                <TdComponent things={<UploadButton title='Upload' />} />
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </div>
    )
}

export default UploadProof