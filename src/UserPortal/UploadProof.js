import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import TdComponent from '../Helper Components/TdComponent';
import ThComponent from '../Helper Components/ThComponent';
// import DropDown from '../Helper Components/DropDown';
import EventsLoader from '../Helper Components/EventsLoader';
import UploadProofButton from '../Helper Components/UploadProofButton';
// import { useOutletContext } from 'react-router-dom';
import Swal from 'sweetalert2';
import Webcam from "react-webcam";

function UploadProof() {
    const [tasks, setTasks] = useState(0);
    const [position, setPosition] = useState({
        latitude: null,
        longitude: null,
    });
    const webcamRef = React.useRef(null);
    const [locationView, setLocationView] = useState(0);
    const [imageSrc, setImageSrc] = useState();
    const [show, setShow] = useState();
    const [change, setChange] = useState();
    const formData = new FormData();
    // const userInfo = useOutletContext();

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
                    showCloseButton: true,
                    title: "Your uploaded picture",
                    imageUrl: e.target.result,
                    imageAlt: "The uploaded picture"
                });
            };
            reader.readAsDataURL(file);
        }
    }
    const videoConstraints = {
        width: 1400,
        height: 900,
        facingMode: "user"
    };

    const capture = useCallback(() => {
        setImageSrc(webcamRef.current.getScreenshot());
    }, [webcamRef]);

    const handleLocation = (val) => {
        setLocationView(1);
        try {
            // Get user's location
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    setPosition({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                });
            } else {
                console.log("Geolocation is not available in your browser.");
            }

            // Get user's photo
            if (imageSrc) {
                formData.append("volunteer_presence[participate_volunteer_id]", val);
                formData.append("volunteer_presence[request_type]", "geo_location");
                formData.append("volunteer_presence[location]", position.latitude, position.longitude);
                formData.append("volunteer_presence[upload_proof]", imageSrc);
                axios.post('/api/v1/volunteer_presences', formData)
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        console.log(err);
                    });

                Swal.fire({
                    showCloseButton: true,
                    title: "Your uploaded picture",
                    imageUrl: imageSrc,
                    imageAlt: "The uploaded picture"
                });

            }
        } catch (err) {
            console.error('Error:', err);
        }
    };

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
                        {tasks.length === 0 ?
                            <td className='text-2xl' colSpan={8}>No Data Found!!!</td> :
                            (tasks.map((val) => {
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
                                                    {
                                                        locationView ?
                                                            imageSrc ?
                                                                <img src={imageSrc}
                                                                    alt='' />
                                                                :
                                                                <div>
                                                                    <Webcam
                                                                        audio={false}
                                                                        height={720}
                                                                        screenshotFormat="image/jpeg"
                                                                        width={1280}
                                                                        ref={webcamRef}
                                                                        videoConstraints={videoConstraints}
                                                                    />
                                                                    <button onClick={capture}>Capture photo</button>
                                                                </div>
                                                            : <UploadProofButton
                                                                function={() => handleLocation(val.id)}
                                                                name='Location' />
                                                    }
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
                            }))
                        }
                    </tbody>
                </table>
            </div>
        </div> : <EventsLoader />
    )
}

export default UploadProof