import React, { useEffect, useState, useCallback } from 'react'
import AdminNewEvent from './AdminNewEvent';
import { IoAddCircle } from "react-icons/io5";
import { IoArrowBackCircleSharp, IoShareSocialOutline } from "react-icons/io5";
import ThComponent from '../Helper Components/ThComponent';
import TdComponent from '../Helper Components/TdComponent';
import axios from 'axios';
import FilterDropDown from '../Helper Components/FilterDropDown';
import EventsLoader from '../Helper Components/EventsLoader';
import Swal from 'sweetalert2';

function AdminEvents() {
    const [isOpen, setIsOpen] = useState(false);
    const [tasks, setTasks] = useState(0);
    // const tasks = [1, 2, 3, 4, 5]

    const handleAdd = () => {
        setIsOpen(true);
        handleShow();
    }

    const deleteEvent = useCallback((val) => {
        console.log("current", val);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`api/v1/tasks/${val}`).then((res) => {
                    // console.log(res);
                    if(res.status === 200){
                        handleShow();
                    }
                })
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });
    }, [])

    const handleShow = useCallback(() => {
        axios.get('api/v1/tasks').then((res) => {
            console.log(res.data?.tasks);
            setTasks(res.data?.tasks);
        })
    }, [])

    useEffect(() => {
        handleShow();
    }, [])

    // const data = useOutletContext();
    // console.log(data);

    return (
        tasks ? (
            <div className="w-[115vh] mt-8 rounded-md sm:rounded-lg border shadow-lg">
                {isOpen ?
                    <div
                        className='animate-fade-left animate-delay-100 animate-once animate-ease-out w-[30%] border border-gray-400 border-r-0 rounded-tl-[2rem] rounded-bl-[2rem]  h-fit absolute right-[4px] bg-[#ecf1e8f3] shadow-md'>
                        <button
                            onClick={() => setIsOpen(false)} className='mx-2 my-2' c><IoArrowBackCircleSharp size={45} /></button>
                        <AdminNewEvent function={handleShow}/>
                    </div> :
                    <div className='animate-fade-right animate-duration-[700ms] animate-once animate-ease-out flex flex-col absolute right-7'>
                        <button
                            onClick={handleAdd}
                        >
                            <IoAddCircle size={78} />
                        </button>
                        <p className='mt-1'>Add Event</p>
                    </div>
                }
                <div className=" rounded-md sm:rounded-lg">
                    <FilterDropDown items={[
                        {
                            name: 'New',
                            no: 10,
                        },
                        {
                            name: 'Completed',
                            no: 20,
                        },
                    ]} />
                    <div className='  h-[70vh] overflow-scroll'>
                        <table className="bg-[#ecf1e8] text-gray-900 w-full text-center ">
                            <thead className=" text-gray-700 uppercase bg-[#c6cac3]">
                                <tr>
                                    <ThComponent name='Event' />
                                    <ThComponent name='Date' />
                                    <ThComponent name='Time' />
                                    <th scope="col" className="text-lg px-4 py-3"></th>
                                    <th scope="col" className="text-lg px-4 py-3"></th>
                                    <th scope="col" className="text-lg px-4 py-3"></th>
                                </tr>
                            </thead>
                            <tbody className=''>
                                {tasks.map((val) => {
                                    return (
                                        <tr key={val.id}>
                                            <TdComponent things={val.event_name} />
                                            <TdComponent things={val.date} />
                                            <TdComponent things={val.time} />
                                            <TdComponent things={<button className="font-semibold text-gray-600 border border-black p-1 rounded-md hover:bg-[#687d78] hover:text-white"><IoShareSocialOutline /></button>} />
                                            <TdComponent things={<button className="font-semibold text-blue-800 border border-black p-1 rounded-md hover:bg-[#558ccb] hover:text-white">Edit</button>} />
                                            <TdComponent things={<button
                                                onClick={() => deleteEvent(val.id)}
                                                className="font-semibold text-red-600 border border-black p-1 rounded-md hover:bg-[#c43e19] hover:text-white" >Delete</button>} />
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        ) : <EventsLoader />
    )
}

export default AdminEvents