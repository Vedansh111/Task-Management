import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import TdComponent from '../Helper Components/TdComponent';
import ThComponent from '../Helper Components/ThComponent';
import DropDown from '../Helper Components/DropDown';
import EventsLoader from '../Helper Components/EventsLoader';
import { useOutletContext } from 'react-router-dom';
import Swal from 'sweetalert2';

function UploadProof() {
    const [tasks, setTasks] = useState(0);
    const formData = new FormData();
    const userInfo = useOutletContext();

    const handleUpload = useCallback(async (val) => {
        const { value: file } = await Swal.fire({
            title: "Select image",
            input: "file",
            inputAttributes: {
                "accept": "image/*",
                "multiple" : "multiple",
                "aria-label": "Upload your profile picture"
            },
            showCancelButton: true,
        });
        if (file) {
            console.log(userInfo[0]);
            formData.append('volunteer_presence[participate_volunteer_id]', '');
            formData.append('volunteer_presence[request_type]', '');
            formData.append('volunteer_presence[upload_proof]', '');
        }
    }, [])

    useEffect(() => {
        axios.get('api/v1/tasks').then((res) => {
            console.log(res.data?.tasks);
            setTasks(res.data?.tasks);
        })
    }, [])

    return (tasks ?
        <div className="w-[85%] rounded-md sm:rounded-lg border shadow-lg mt-8">
            <DropDown />
            <div className='h-[70vh] overflow-y-scroll '>
                <table className="w-full h-full bg-[#ecf1e8] text-lg text-center ">
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
                                    <TdComponent things={<button
                                        onClick={() => handleUpload(val.id)}
                                        className="font-semibold text-blue-800 border border-black p-1 rounded-md hover:bg-[#052142] hover:text-white">Upload</button>} />
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>
        </div> : <EventsLoader />
    )
}

export default UploadProof