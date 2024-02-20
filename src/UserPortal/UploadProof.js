import axios from 'axios';
import React, { useEffect, useState } from 'react'
import TdComponent from '../Helper Components/TdComponent';
import ThComponent from '../Helper Components/ThComponent';
import DropDown from '../Helper Components/DropDown';
import EventsLoader from '../Helper Components/EventsLoader';
import UploadProofButton from '../Helper Components/UploadProofButton';
import { useOutletContext } from 'react-router-dom';
import Swal from 'sweetalert2';

function UploadProof() {

    const [tasks, setTasks] = useState(0);
    const [show, setShow] = useState();
    const [change, setChange] = useState();
    const formData = new FormData();
    const userInfo = useOutletContext();

    const uploadMain = (val) => {
        setShow(val);
    }

    const handleUpload = async (val) => {
        const { value: file } = await Swal.fire({
            title: "Select image",
            input: "file",
            inputAttributes: {
                "accept": "image/*",
                "aria-label": "Upload your profile picture"
            },
            showCancelButton: true,
        });
        if (file) {
            formData.append("volunteer_presence[participate_volunteer_id]", val)
            formData.append("volunteer_presence[request_type]", "upload_proof")
            formData.append("volunteer_presence[upload_proof]", file)
            axios.post('api/v1/volunteer_presences', formData).then((res) => {
                console.log(res);
                setChange(res.data.status);
            }).catch((err) => {
                console.log(err);
            })
            const reader = new FileReader();
            reader.onload = (e) => {
                Swal.fire({
                    title: "Your uploaded picture",
                    imageUrl: e.target.result,
                    imageAlt: "The uploaded picture"
                });
            };
            reader.readAsDataURL(file);
        }
    }

    const handleLocation = (val) => {

    }

    const handleQR = (val) => {

    }

    useEffect(() => {
        axios.get('api/v1/participate_volunteers?request_type=approved').then((res) => {
            console.log(res?.data?.participate_volunteer);
            setTasks(res?.data?.participate_volunteer);
        })
    }, [])

    return (tasks ?
        <div className="w-[85%] rounded-md sm:rounded-lg border shadow-lg mt-[5rem]">
            {/* <DropDown /> */}
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
                                    <TdComponent things={val.task?.event_name} />
                                    <TdComponent things={val.task?.date} />
                                    {show === val.id ?
                                        change ?
                                            <td className='rounded border border-yellow-400 bg-yellow-500'>
                                                Requested
                                            </td>
                                            :
                                            <td className='mt-6'>
                                                <UploadProofButton
                                                    function={() => handleQR(val.id)}
                                                    name='QR Code' />
                                                <UploadProofButton
                                                    function={() => handleLocation(val.id)}
                                                    name='Location' />
                                                <UploadProofButton
                                                    function={() => handleUpload(val.id)}
                                                    name='Image/Video' />
                                            </td>
                                        :
                                        <TdComponent things={<button
                                            onClick={() => uploadMain(val.id)}
                                            className="font-semibold text-blue-800 border border-black p-1 rounded-md hover:bg-[#052142] hover:text-white">Upload</button>} />}

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