import React, { useEffect, useState } from 'react'
import TdComponent from '../Helper Components/TdComponent'
import ThComponent from '../Helper Components/ThComponent'
import EventsLoader from '../Helper Components/EventsLoader'
import DropDown from '../Helper Components/DropDown'
import Swal from 'sweetalert2'
import axios from 'axios'

function AdminRequests() {
    const [tasks, setTasks] = useState(0);
    const [age, setAge] = useState('pending');
    const items = ['pending', 'approved', 'rejected'];

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const handleShow = () => {
        console.log(age);
        axios.get(`api/v1/participate_volunteers?request_type=${age}`).then((res) => {
            console.log(res?.data?.participate_volunteer);
            setTasks(res?.data?.participate_volunteer);
        })
    }

    const deleteRequest = (val) => {
        console.log("current", val);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, reject it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.put(`api/v1/participate_volunteers/${val}/rejected_request`).then((res) => {
                    console.log(res);
                    if (res.status) {
                        handleShow();
                    }
                })
                Swal.fire({
                    title: "Rejected!",
                    text: "The request has been rejected.",
                    icon: "success"
                });
            }
        });
    }

    const approveRequest = (val) => {
        console.log(val);
        axios.put(`api/v1/participate_volunteers/${val}/approved_request`)
            .then((res) => {
                console.log(res);
                if (res.status) {
                    handleShow();
                }
                Swal.fire({
                    title: "Approved",
                    text: "The request has been approved.",
                    icon: "success"
                });
            })
    }

    useEffect(() => {
        handleShow();
    }, [age])

    return (
        tasks ? (
            <div className="w-[85%] rounded-md sm:rounded-lg border shadow-lg mt-10">
                <DropDown handleChange={handleChange} items={items}/>
                <div className=' h-[70vh] overflow-y-scroll'>
                    <table className="w-full h-full bg-[#ecf1e8] text-gray-900  text-center ">
                        <thead className=" text-gray-700 uppercase bg-[#c6cac3]">
                            <tr>
                                <ThComponent name='Event' />
                                <ThComponent name='User' />
                                <ThComponent name='Email' />
                                <ThComponent name='Phone Number' />
                                {age === "pending" ?
                                    <>
                                        <th scope="col" className="text-lg px-4 py-3"></th>
                                        <th scope="col" className="text-lg px-4 py-3"></th>
                                    </> : ''}

                                {age === "approved" ?
                                    <>
                                        <th scope="col" className="text-lg px-4 py-3"></th>
                                    </> : ''}
                            </tr>
                        </thead>
                        <tbody className=''>
                            {tasks.map((val) => {
                                return (
                                    <tr key={val.id}>
                                        <TdComponent things={val?.task?.event_name} />
                                        <TdComponent things={val?.user?.name} />
                                        <TdComponent things={val?.user?.email} />
                                        <TdComponent things={val?.user?.mobile_number} />
                                        {(val?.participate_request === 'approved' ?
                                            <>
                                                <TdComponent things={<div className="font-semibold border border-green-500 p-1 rounded-md bg-[#34cc40] text-white">Approved</div>} />
                                            </>
                                            :
                                            ""
                                        )}
                                        {(val?.participate_request === 'pending' ?
                                            <>
                                                <TdComponent things={<button
                                                    onClick={() => approveRequest(val.id)}
                                                    className="font-semibold text-green-600 border border-black p-1 rounded-md hover:bg-[#34cc40] hover:text-white">Approve</button>} />
                                                <TdComponent things={<button
                                                    onClick={() => deleteRequest(val.id)}
                                                    className="font-semibold text-red-600 border border-black p-1 rounded-md hover:bg-[#c43e19] hover:text-white" >Reject</button>} />
                                            </> :
                                            ""
                                        )}
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