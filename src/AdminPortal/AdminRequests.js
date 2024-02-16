import React, { useCallback, useEffect, useState } from 'react'
import TdComponent from '../Helper Components/TdComponent'
import ThComponent from '../Helper Components/ThComponent'
import EventsLoader from '../Helper Components/EventsLoader'
import DropDown from '../Helper Components/DropDown'
import axios from 'axios';

function AdminRequests() {
    const [tasks, setTasks] = useState([1, 2, 3]);
    const [age, setAge] = useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    // const tasks = [1, 2, 3, 4, 5]
    const handleShow = () => {
        console.log(age);
        // axios.get(`api/v1/participate_volunteers?request_type=pending`).then((res) => {
        //     console.log(res?.data?.participate_volunteer);
        //     // setTasks(res?.data?.participate_volunteer);
        // })
    }

    useEffect(() => {
        handleShow();
    }, [age])

    return (
        tasks ? (
            <div className=" rounded-md sm:rounded-lg border shadow-lg mt-10">
                {/* <FilterDropDown items={[
                    {
                        name: 'pending',
                        no: 10,
                    },
                    {
                        name: 'approved',
                        no: 20,
                    },
                    {
                        name: 'rejected',
                        no: 30,
                    },
                ]}
                    handleChange={handleChange}
                    age={age}
                /> */}
                <DropDown
                    handleChange={handleChange} />
                <div className=' overflow-scroll'>
                    <table className="bg-[#ecf1e8] text-gray-900  text-center ">
                        <thead className=" text-gray-700 uppercase bg-[#c6cac3]">
                            <tr>
                                <ThComponent name='Event' />
                                <ThComponent name='User' />
                                <ThComponent name='Email' />
                                <ThComponent name='Phone Number' />
                                <th scope="col" className="text-lg px-4 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className=''>
                            {tasks.map((val) => {
                                return (
                                    <tr key={val}>
                                        <TdComponent things={val.event_name} />
                                        <TdComponent things={val.user} />
                                        <TdComponent things={val.email} />
                                        <TdComponent things={val.phone} />
                                        <TdComponent things={<button className="font-semibold text-gray-600 border border-black p-1 rounded-md hover:bg-[#34cc40] hover:text-white">Approve</button>} />
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>) : <EventsLoader />
    )
}

export default AdminRequests