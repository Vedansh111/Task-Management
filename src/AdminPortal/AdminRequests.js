import React, { useEffect, useState } from 'react'
import { MdDone } from "react-icons/md"
import { IoMdClose } from "react-icons/io"
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
        axios.get(`api/v1/participate_volunteers?request_type=${age}`).then((res) => {
            console.log(res?.data?.participate_volunteer);
            setTasks(res?.data?.participate_volunteer);
        })
    }

    const deleteRequest = (val) => {
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
            <div className='p-6'>
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-6">
                    <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md h-[82vh]">
                        <div className="flex justify-between mb-4 items-start">
                            <DropDown handleChange={handleChange} items={items} />
                        </div>
                        <div className="animate-fade-left animate-delay-100 animate-once animate-ease-out overflow-auto h-[90%]">
                            <table className="w-full min-w-[460px] z-0">
                                <thead className='uppercase'>
                                    <tr>
                                        <ThComponent
                                            moreClasses="rounded-tl-md rounded-bl-md"
                                            name='Event' />
                                        <ThComponent
                                            name='User' />
                                        <ThComponent
                                            moreClasses="rounded-tr-md rounded-br-md"
                                            name='Email' />
                                        <ThComponent name='Phone Number' />
                                        {age === "pending" ?
                                            <>
                                                <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-3 px-4 bg-gray-100 text-left "></th>
                                                <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-3 px-4 bg-gray-100 text-left "></th>
                                            </> : ''}

                                        {age === "approved" ?
                                            <>
                                                <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-3 px-4 bg-gray-100 text-left "></th>
                                            </> : ''}
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks.length === 0 ?
                                        <tr>
                                            <th className='text-[12px] uppercase tracking-wide font-medium text-gray-400 pt-[13rem] text-lg' colSpan={8}>No Data Found!</th>
                                        </tr> :
                                        (
                                            tasks.map((val) => {
                                                return (
                                                    <tr key={val.id} >
                                                        <td className="py-3 px-4 border-b border-b-gray-50">
                                                            <TdComponent things={val?.task?.event_name} />
                                                        </td>
                                                        <td className="py-3 px-4 border-b border-b-gray-50">
                                                            <TdComponent things={val?.user?.name} />
                                                        </td>
                                                        <td className="py-3 px-4 border-b border-b-gray-50">
                                                            <TdComponent things={val?.user?.email} />
                                                        </td>
                                                        <td className="py-3 px-4 border-b border-b-gray-50">
                                                            <TdComponent things={val?.user?.mobile_number} />
                                                        </td>
                                                        {(val?.participate_request === 'approved' ?
                                                            <td className='py-3 border-b border-b-gray-50'>
                                                                <TdComponent things={<div className="font-semibold border border-green-500 p-1 rounded-md bg-[#34cc40] text-white text-center">Approved</div>} />
                                                            </td>
                                                            :
                                                            ""
                                                        )}
                                                        {(val?.participate_request === 'pending' ?
                                                            <td className='py-3 border-b border-b-gray-50 flex' >
                                                                <div className='text-gray-600 text-sm font-medium truncate ml-[1rem]'>
                                                                    <button
                                                                        onClick={() => approveRequest(val.id)}
                                                                        className="font-semibold text-green-600 border border-gray-300 p-1 rounded-md hover:bg-[#34cc40] hover:text-white"><MdDone size={20} /></button>
                                                                </div>
                                                                <div className='text-gray-600 text-sm font-medium truncate ml-[3rem]'>
                                                                    <button
                                                                        onClick={() => deleteRequest(val.id)}
                                                                        className="font-semibold text-red-600 border border-gray-300 p-1 rounded-md hover:bg-[#c43e19] hover:text-white" ><IoMdClose size={20} /></button>
                                                                </div>
                                                            </td> :
                                                            ""
                                                        )}
                                                    </tr>
                                                )
                                            })
                                        )
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

export default AdminRequests