import React, { useEffect, useState } from 'react'
import TdComponent from '../Helper Components/TdComponent'
import ThComponent from '../Helper Components/ThComponent'
import { MdDone } from "react-icons/md"
import { IoMdClose } from "react-icons/io"
import EventsLoader from '../Helper Components/EventsLoader'
import DropDown from '../Helper Components/DropDown'
import Swal from 'sweetalert2'
import axios from 'axios'

function AdminProofRequests() {
    const [tasks, setTasks] = useState(0);
    const [age, setAge] = useState('pending');
    const items = ['pending', 'approved', 'rejected'];

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const handleShow = () => {
        axios.get(`api/v1/volunteer_presences?requst_status=${age}`).then((res) => {
            console.log(res?.data?.volunteer_presences);
            setTasks(res?.data?.volunteer_presences);
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
                axios.put(`api/v1/volunteer_presences/${val}/rejected_request`).then((res) => {
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
        axios.put(`api/v1/volunteer_presences/${val}/approved_request`)
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

    const viewPoster = (val) => {
        console.log(val);
        tasks.filter((value) => {
            if (value.id === val) {
                Swal.fire({
                    title: "Event Proof",
                    imageWidth: '95%',
                    imageHeight: 'auto',
                    imageUrl: value?.upload_proof_url,
                    imageAlt: "The event proof"
                });
            }
        })
    }

    const redeemedRequest = () => {

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
                        <div className="animate-fade-left animate-delay-100 animate-once animate-ease-out overflow-auto h-[90%] px-1">
                            <table className="w-full min-w-[460px] z-0 ">
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
                                        <ThComponent
                                            name='Date' />
                                        <ThComponent
                                            name='Time' />
                                        <ThComponent
                                            name='Location' />
                                        <ThComponent
                                            name='Proof' />
                                        {age === "pending" ?
                                            <>
                                                <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-3 px-2 bg-gray-100 text-left "></th>
                                                <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-3 px-2 bg-gray-100 text-left "></th>
                                            </> : ''}

                                        {age === "approved" ?
                                            <>
                                                <ThComponent name='Status' />
                                                <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-3 px-2 bg-gray-100 text-left "></th>
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
                                                            <TdComponent things={val?.participate_volunteer?.task?.event_name} />
                                                        </td>
                                                        <td className="py-3 px-4 border-b border-b-gray-50">
                                                            <TdComponent things={val?.participate_volunteer?.user?.name} />
                                                        </td>
                                                        <td className="py-3 px-4 border-b border-b-gray-50">
                                                            <TdComponent things={val?.participate_volunteer?.user?.email} />
                                                        </td>
                                                        <td className="py-3 px-4 border-b border-b-gray-50">
                                                            <TdComponent things={val?.date} />
                                                        </td>
                                                        <td className="py-3 px-4 border-b border-b-gray-50">
                                                            <TdComponent things={val?.time} />
                                                        </td>
                                                        <td className="py-3 px-4 border-b border-b-gray-50">
                                                            {
                                                                val?.location ?
                                                                    <TdComponent things={val?.location} /> :
                                                                    <TdComponent things="---" />
                                                            }
                                                        </td>
                                                        <td className="py-3 px-4 border-b border-b-gray-50">
                                                            {
                                                                val?.request_type === 'qr_code' ?
                                                                    <TdComponent things="Through QR" /> :
                                                                    <TdComponent things={<button
                                                                        onClick={() => viewPoster(val.id)}
                                                                        className="font-semibold text-blue-800 border border-gray-300 p-1 rounded-md hover:bg-[#558ccb] hover:text-white">View</button>} />
                                                            }
                                                        </td>
                                                        {(val?.requst_status === 'approved' ?
                                                            <div>
                                                                <td className='px-4 py-3 border-b border-b-gray-50'>
                                                                    <TdComponent things={<div className="font-semibold border border-green-500 p-1 rounded-md bg-[#34cc40] text-white text-center">Approved</div>} />
                                                                </td>
                                                                <td className="py-3 px-4 border-b border-b-gray-50">
                                                                    <div className='text-gray-600 text-sm font-medium truncate '>
                                                                        <button
                                                                            onClick={() => redeemedRequest()}
                                                                            className="font-semibold text-gray-700 border border-gray-300 p-1 rounded-md hover:bg-[#1e64d5] hover:text-white">Reedem</button>
                                                                    </div>
                                                                </td>
                                                            </div>
                                                            :
                                                            ""
                                                        )}
                                                        {(val?.requst_status === 'pending' ?
                                                            <td className='py-4 border-b border-b-gray-50 flex' >
                                                                <div className='text-gray-600 text-sm font-medium truncate '>
                                                                    <button
                                                                        onClick={() => approveRequest(val.id)}
                                                                        className="font-semibold text-green-600 border border-gray-300 p-1 rounded-md hover:bg-[#34cc40] hover:text-white"><MdDone size={20} /></button>
                                                                </div>
                                                                <div className=' text-gray-600 text-sm font-medium truncate ml-[3rem]'>
                                                                    <button
                                                                        onClick={() => deleteRequest(val.id)}
                                                                        className="font-semibold text-red-600 border border-gray-300 p-1 rounded-md hover:bg-[#c43e19] hover:text-white" ><IoMdClose size={20} /></button>
                                                                </div>
                                                            </td>
                                                            :
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

export default AdminProofRequests