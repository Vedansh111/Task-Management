import React, { useEffect, useState } from 'react'
import TdComponent from '../Helper Components/TdComponent'
import ThComponent from '../Helper Components/ThComponent'
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

    useEffect(() => {
        handleShow();
    }, [age])


    return (
        tasks ? (
            <div className="w-[85%] rounded-md sm:rounded-lg border shadow-lg mt-10">
                <DropDown handleChange={handleChange} items={items} />
                <div className=' h-[70vh] overflow-y-scroll'>
                    <table className="w-full h-full bg-[#ecf1e8] text-gray-900  text-center ">
                        <thead className=" text-gray-700 uppercase bg-[#c6cac3]">
                            <tr>
                                <ThComponent name='Event' />
                                <ThComponent name='User' />
                                <ThComponent name='Email' />
                                <ThComponent name='Proof' />
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
                            {tasks.length === 0 ?
                                <td className='text-2xl' colSpan={5}>No Data Found!!!</td> :
                                (
                                    tasks.map((val) => {
                                        return (
                                            <tr key={val.id}>
                                                <TdComponent things={val?.participate_volunteer?.task?.event_name} />
                                                <TdComponent things={val?.participate_volunteer?.user?.name} />
                                                <TdComponent things={val?.participate_volunteer?.user?.email} />
                                                <TdComponent things={<img src={val?.upload_proof_url} alt='' className='w-[6rem] h-[rem] rounded-[1rem] object-center' />} />
                                                {(val?.requst_status === 'approved' ?
                                                    <>
                                                        <TdComponent things={<div className="font-semibold border border-green-500 p-1 rounded-md bg-[#34cc40] text-white">Approved</div>} />
                                                    </>
                                                    :
                                                    ""
                                                )}
                                                {(val?.requst_status === 'pending' ?
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
                                    })
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>) : <EventsLoader />
    )
}

export default AdminProofRequests