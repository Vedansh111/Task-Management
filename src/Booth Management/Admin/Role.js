import React, { useEffect, useState } from 'react';
import EventsLoader from '../../Helper Components/EventsLoader';
import ThComponent from '../../Helper Components/ThComponent';
import { IoAddCircle } from 'react-icons/io5';
import TdComponent from '../../Helper Components/TdComponent';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaCircleArrowRight } from 'react-icons/fa6';
import NewBooth from './NewBooth';
import { MdDelete, MdEdit } from 'react-icons/md';

function Role() {
    const [isOpen, setIsOpen] = useState(false);
    const [tasks, setTasks] = useState(0);

    const handleAdd = () => {
        setIsOpen(true);
        handleShow();
    }

    const editEvent = async (valu) => {
        const see = tasks.filter(item => item?.id === valu);
        console.log(valu);
        const { value: formValues } = await Swal.fire({
            title: "Edit the role",
            html: `  
            Role:<input type="text" id="swal-input1" class="w-[15rem] p-1 mx-2 my-1.5 border border-gray-500 rounded-md" value="${see[0]?.booth_name}" placeholder="Name..."><br/>
            `,
            focusConfirm: false,
            showCancelButton: true,
            preConfirm: () => {
                return [
                    document.getElementById("swal-input1").value,
                ];
            }
        });
        if (formValues) {
            const formData = new FormData();
            formData.append('role[role_name]', formValues[0])
            axios.put(`api/v1/booths/${valu}`, formData).then((res) => {
                console.log(res);
                if (res.data) {
                    handleShow();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Updated!!!",
                        text: "The role is updated.",
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
                await axios.delete(`api/v1/booths/${val}`).then((res) => {
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

    const handleShow = () => {
        axios.get('api/v1/roles').then((res) => {
            console.log(res.data);
            setTasks(res.data.roles);
        })
    };

    useEffect(() => {
        handleShow();
    }, [])

    return (
        tasks ? (
            <div className='p-6'>
                {isOpen ?
                    <div
                        className='animate-fade-left animate-delay-100 animate-once animate-ease-out lg:w-[30.5%] md:w-[31%] sm:w-full border border-gray-400 border-r-0 rounded-tl-[2rem] rounded-bl-[2rem]  h-[46vh] absolute right-[4px] bg-[#dfdbda] shadow-md z-50'>
                        <button
                            onClick={() => setIsOpen(false)} className={`mx-3 my-3 `} ><FaCircleArrowRight size={38} /></button>
                        <NewBooth function={handleShow} />
                    </div> :
                    <div className='animate-fade-right animate-duration-[700ms] animate-once animate-ease-out flex flex-col absolute z-50 right-9'>
                        <button
                            onClick={handleAdd}
                        >
                            <IoAddCircle size={78} />
                        </button>
                        <p className='mt-1'>Add Role</p>
                    </div>
                }
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-6">
                    <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md h-[82vh]">
                        <div className="flex mb-4 items-start">
                            <div className="font-medium">All Roles</div>
                        </div>
                        <div className="animate-fade-left animate-delay-100 animate-once animate-ease-out overflow-auto h-[95%]">
                            <table className="w-full min-w-[460px] z-0">
                                <thead className='uppercase'>
                                    <tr>
                                        <ThComponent name='Role Name' />
                                        <ThComponent />
                                        <ThComponent />
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks.length === 0 ?
                                        <tr>
                                            <th className='text-[12px] uppercase tracking-wide font-medium text-gray-400 pt-[13rem] text-lg' colSpan={8}>No Booths Found!</th>
                                        </tr> :
                                        (
                                            tasks.map((val) => {
                                                return (
                                                    <tr key={val.id} >
                                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                                            <div className="flex items-center">
                                                                <TdComponent things={val.role_name} />
                                                            </div>
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

export default Role