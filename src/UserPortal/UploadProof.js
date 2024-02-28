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
    const [tasks, setTasks] = useState([]);
    const [position, setPosition] = useState({
        latitude: null,
        longitude: null,
    });
    const webcamRef = React.useRef(null);
    const [locationView, setLocationView] = useState(0);
    const [imageSrc, setImageSrc] = useState();
    const [imageFile, setImageFile] = useState();
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

    const getUserPhoto = (val) => {
        try {
            if (imageFile) {
                formData.append("volunteer_presence[participate_volunteer_id]", val);
                formData.append("volunteer_presence[request_type]", "geo_location");
                formData.append("volunteer_presence[location]", position.latitude);
                formData.append("volunteer_presence[upload_proof]", imageFile);
                axios.post('/api/v1/volunteer_presences', formData)
                    .then((res) => {
                        console.log(res);
                        Swal.fire({
                            title: "Uploaded!",
                            text: "Your proof is uploaded.",
                            icon: "success"
                        });
                        setLocationView(0)
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        } catch (error) {
            console.error('Error occurred while shortening URL:', error);
        }
    };

    const capture = useCallback(async () => {
        setImageSrc(webcamRef.current.getScreenshot());
        const screenshot = webcamRef.current.getScreenshot();
        try {
            const blob = await fetch(screenshot).then(res => res.blob());
            const file = new File([blob], 'screenshot.jpg', { type: 'image/jpeg' });
            console.log(file);
            setImageFile(file);
        } catch (error) {
            console.error('Error occurred while capturing and sending screenshot:', error);
        }
    }, [webcamRef]);

    const handleLocation = () => {
        setLocationView(1);
        try {
            // Get user's location
            if (position.latitude && position.longitude) {
                axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${position.latitude},${position.longitude}&key=52e0489d27fa4b149f155d298a0e7bec`)
                    .then((res) => {
                        // console.log(res.data.results);
                        res?.data?.results.map((val) => {
                            return console.log(val.formatted);
                        })
                    })
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

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log(position);
                setPosition({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            });
        } else {
            console.log("Geolocation is not available in your browser.");
        }
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
                            <tr>
                                <th className='text-2xl' colSpan={8}>No Data Found!!!</th>
                            </tr> :
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
                                                                <div className='flex flex-col items-center'>
                                                                    <img src={imageSrc}
                                                                        className='rounded-[2rem]'
                                                                        alt='' />
                                                                    <UploadProofButton name='Upload'
                                                                        function={() => getUserPhoto(val.id)} />
                                                                </div>
                                                                :
                                                                <div className='flex flex-col items-center'>
                                                                    <Webcam
                                                                        audio={false}
                                                                        width={280}
                                                                        height={280}
                                                                        screenshotFormat="image/jpeg"
                                                                        ref={webcamRef}
                                                                    />
                                                                    <UploadProofButton
                                                                        name='Capture Photo'
                                                                        function={capture} />
                                                                </div>
                                                            : <UploadProofButton
                                                                function={handleLocation}
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

export default UploadProof;
