import React, { useEffect, useState, useCallback } from 'react'
import AdminNewEvent from './AdminNewEvent';
import { IoAddCircle } from "react-icons/io5";
import { IoArrowBackCircleSharp, IoShareSocialOutline } from "react-icons/io5";
import ThComponent from '../Helper Components/ThComponent';
import TdComponent from '../Helper Components/TdComponent';
import DropDown from '../Helper Components/DropDown'
import axios from 'axios';
import EventsLoader from '../Helper Components/EventsLoader';
import Swal from 'sweetalert2';

function AdminEvents() {
    const [isOpen, setIsOpen] = useState(false);
    const [tasks, setTasks] = useState(0);

    const handleAdd = () => {
        setIsOpen(true);
        handleShow();
    }

    const editEvent = async (val) => {
        console.log(val);
        const { value: formValues } = await Swal.fire({
            title: "Edit the event",
            html: `  
            Event Name:<input type="text" id="swal-input1" class="w-[15rem] p-1 mx-2 my-1.5 border border-gray-500 rounded-md" value="" placeholder="Event Name..."><br/>
            Date:<input type="date" id="swal-input2" class="w-[15rem] p-1 mx-2 my-1.5 border border-gray-500 rounded-md" value="" placeholder="Date..."><br/>
            Time:<input type="time" id="swal-input3" class="w-[15rem] p-1 mx-2 my-1.5 border border-gray-500 rounded-md" value="" placeholder="Time..."><br/>
            Points:<input type="text" id="swal-input4" class="w-[15rem] p-1 mx-2 my-1.5 border border-gray-500 rounded-md" value="" placeholder="Points...">
            `,
            focusConfirm: false,
            showCancelButton: true,
            preConfirm: () => {
                return [
                    document.getElementById("swal-input1").value,
                    document.getElementById("swal-input2").value,
                    document.getElementById("swal-input3").value,
                    document.getElementById("swal-input4").value,
                ];
            }
        });
        if (formValues) {
            const formData = new FormData();
            formData.append('task[event_name]', formValues[0])
            formData.append('task[date]', formValues[1])
            formData.append('task[time]', formValues[2])
            formData.append('task[points]', formValues[3])
            axios.put(`api/v1/tasks/${val}`, formData).then((res) => {
                console.log(res);
                if (res.data) {
                    handleShow();
                }
            })
        }
    }
    
    const deleteEvent = (val) => {
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
                    if (res.status === 200) {
                        handleShow();
                    }
                })
                Swal.fire({
                    title: "Deleted!!!",
                    text: "Your event is deleted.",
                    icon: "success"
                });
            }
        });
    }

    const handleShow = useCallback(() => {
        axios.get('api/v1/tasks').then((res) => {
            setTasks(res.data?.tasks);
        })
    }, [])

    useEffect(() => {
        handleShow();
    }, [])

    return (
        tasks ? (
            <div className="w-[80%] mt-[4rem] rounded-md sm:rounded-lg border shadow-lg">
                {isOpen ?
                    <div
                        className='animate-fade-left animate-delay-100 animate-once animate-ease-out w-[30%] border border-gray-400 border-r-0 rounded-tl-[2rem] rounded-bl-[2rem]  h-fit absolute right-[4px] bg-[#ecf1e8f3] shadow-md'>
                        <button
                            onClick={() => setIsOpen(false)} className='mx-2 my-2' c><IoArrowBackCircleSharp size={45} /></button>
                        <AdminNewEvent function={handleShow} />
                    </div> :
                    <div className='animate-fade-right animate-duration-[700ms] animate-once animate-ease-out flex flex-col absolute right-3'>
                        <button
                            onClick={handleAdd}
                        >
                            <IoAddCircle size={78} />
                        </button>
                        <p className='mt-1'>Add Event</p>
                    </div>
                }
                <div className=" rounded-md sm:rounded-lg">
                    {/* <DropDown /> */}
                    <div className=' h-[70vh] overflow--y-scroll'>
                        <table className="bg-[#ecf1e8] text-gray-900 w-full h-full text-center ">
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
                                            <TdComponent things={<button
                                                onClick={() => editEvent(val.id)}
                                                className="font-semibold text-blue-800 border border-black p-1 rounded-md hover:bg-[#558ccb] hover:text-white">Edit</button>} />
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