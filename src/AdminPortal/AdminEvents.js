import React, { useEffect, useState, useCallback } from 'react'
import AdminNewEvent from './AdminNewEvent';
import { IoAddCircle } from "react-icons/io5";
import { FaCircleArrowRight } from "react-icons/fa6";
import { IoShareSocialOutline } from "react-icons/io5";
import ThComponent from '../Helper Components/ThComponent';
import TdComponent from '../Helper Components/TdComponent';
import { MdEdit, MdDelete } from "react-icons/md";
import axios from 'axios';
import EventsLoader from '../Helper Components/EventsLoader';
import Swal from 'sweetalert2';

function AdminEvents() {
    const [isOpen, setIsOpen] = useState(false);
    const [tasks, setTasks] = useState(0);
    const [initialValues, setInitialValues] = useState({
        name: '',
        date: '',
        time: '',
        points: '',
    });

    const handleAdd = () => {
        setIsOpen(true);
        handleShow();
    }

    const editEvent = async (valu) => {
        tasks.filter((item) => {
            console.log(item);
            return (item?.id === valu) ? setInitialValues({
                name: item?.event_name,
                date: item?.date,
                time: item?.time,
                points: item?.points,
            }) : false;
        })
        console.log(valu);
        const { value: formValues } = await Swal.fire({
            title: "Edit the event",
            html: `  
            Event Name:<input type="text" id="swal-input1" class="w-[15rem] p-1 mx-2 my-1.5 border border-gray-500 rounded-md" value="${initialValues.name}" placeholder="Event Name..."><br/>
            Date:<input type="date" id="swal-input2" class="w-[15rem] p-1 mx-2 my-1.5 border border-gray-500 rounded-md" value="${initialValues.date}" placeholder="Date..."><br/>
            Time:<input type="time" id="swal-input3" class="w-[15rem] p-1 mx-2 my-1.5 border border-gray-500 rounded-md" value="${initialValues.time}" placeholder="Time..."><br/>
            Points:<input type="text" id="swal-input4" class="w-[15rem] p-1 mx-2 my-1.5 border border-gray-500 rounded-md" value="${initialValues.points}" placeholder="Points...">
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
            axios.put(`api/v1/tasks/${valu}`, formData).then((res) => {
                console.log(res);
                if (res.data) {
                    handleShow();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Updated!!!",
                        text: "Your event is updated.",
                        showConfirmButton: false,
                        timer: 1500
                    });
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
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.delete(`api/v1/tasks/${val}`).then((res) => {
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
            console.log(res.data?.tasks);
            setTasks(res.data?.tasks);
        })
    }, [])

    useEffect(() => {
        handleShow();
    }, [])

    return (

        tasks ? (
            <div className='p-6'>
                {isOpen ?
                    <div
                        className='animate-fade-left animate-delay-100 animate-once animate-ease-out w-[30.5%] border border-gray-400 border-r-0 rounded-tl-[2rem] rounded-bl-[2rem]  h-[82vh] absolute right-[4px] bg-[#dfdbda] shadow-md z-50'>
                        <button
                            onClick={() => setIsOpen(false)} className='mx-3 my-3' ><FaCircleArrowRight size={38} /></button>
                        <AdminNewEvent function={handleShow} />
                    </div> :
                    <div className='animate-fade-right animate-duration-[700ms] animate-once animate-ease-out flex flex-col absolute z-50 right-9'>
                        <button
                            onClick={handleAdd}
                        >
                            <IoAddCircle size={78} />
                        </button>
                        <p className='mt-1'>Add Event</p>
                    </div>
                }
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-6">
                    <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md h-[82vh]">
                        <div className="flex justify-between mb-4 items-start">
                            <div className="font-medium">All Events</div>
                        </div>
                        <div className="animate-fade-left animate-delay-100 animate-once animate-ease-out overflow-auto h-[95%]">
                            <table className="w-full min-w-[460px] z-0">
                                <thead className='uppercase'>
                                    <tr>
                                        <ThComponent
                                            moreClasses="rounded-tl-md rounded-bl-md"
                                            name='Event' />
                                        <ThComponent name='Date' />
                                        <ThComponent
                                            name='Time' />
                                        <ThComponent />
                                        <ThComponent />
                                        <ThComponent />
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        tasks.map((val) => {
                                            return (
                                                <tr key={val.id} >
                                                    <td className="py-3 px-4 border-b border-b-gray-50">
                                                        <TdComponent things={val.event_name} />
                                                    </td>
                                                    <td className="py-3 px-4 border-b border-b-gray-50">
                                                        <TdComponent things={val.date} />
                                                    </td>
                                                    <td className="py-3 px-4 border-b border-b-gray-50">
                                                        <TdComponent things={val.time} />
                                                    </td>
                                                    <td className="py-3 px-4 border-b border-b-gray-50">
                                                        <TdComponent things={<button
                                                            onClick={() => editEvent(val.id)}
                                                            className="font-semibold text-blue-800 border border-gray-300 p-1 rounded-md hover:bg-[#558ccb] hover:text-white"><MdEdit size={20} /></button>} />
                                                    </td>
                                                    <td className="py-3 px-4 border-b border-b-gray-50">
                                                        <TdComponent things={<button
                                                            onClick={() => deleteEvent(val.id)}
                                                            className="font-semibold text-red-600 border border-gray-300 p-1 rounded-md hover:bg-[#c43e19] hover:text-white" ><MdDelete size={20} /></button>} />
                                                    </td>
                                                    <td className="py-3 px-4     border-b border-b-gray-50">
                                                        <TdComponent things={<button className="font-semibold text-gray-600 border border-gray-300 p-1 rounded-md hover:bg-[#687d78] hover:text-white"><IoShareSocialOutline size={20} /></button>} />
                                                    </td>
                                                </tr>
                                            )
                                        })
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

export default AdminEvents