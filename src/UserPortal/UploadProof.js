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
import DropDown from '../Helper Components/DropDown';

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
    const [age, setAge] = useState('pending');
    const items = ['pending', 'uploaded'];

    const handleChange = (e) => {
        setAge(e.target.value);
    };

    const uploadMain = (val) => {
        setShow(val);
    }

    const handleUpload = async (val) => {
        const { value: file } = await Swal.fire({
            title: "Select image",
            input: "file",
            inputAttributes: {
                "accept": "image/*",
                "aria-label": "Upload your proof"
            },
            showCancelButton: true,
        });
        if (file) {
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
            formData.append("volunteer_presence[participate_volunteer_id]", val)
            formData.append("volunteer_presence[request_type]", "upload_proof")
            formData.append("volunteer_presence[upload_proof]", file)
            axios.post('api/v1/volunteer_presences', formData).then((res) => {
                console.log(res);
                setChange(res.data.status);
                Swal.fire({
                    title: "Uploaded!",
                    text: "Your proof is uploaded.",
                    icon: "success"
                });
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    const getUserPhoto = (val) => {
        try {
            if (imageFile) {
                formData.append("volunteer_presence[participate_volunteer_id]", val);
                formData.append("volunteer_presence[request_type]", "geo_location");
                formData.append("volunteer_presence[location]", position.latitude + "," + position.longitude);
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
    }, [age])

    return (
        tasks ?
            <div className='p-6'>
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-6">
                    <div className='bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md h-[82vh]'>
                        <div className="flex justify-between mb-4 items-start">
                            <DropDown handleChange={handleChange} items={items} />
                        </div>
                        <div className="animate-fade-left animate-delay-100 animate-once animate-ease-out overflow-auto h-[90%] px-1">
                            <table className="w-full min-w-[460px] z-0">
                                <thead className='uppercase'>
                                    <tr>
                                        <ThComponent
                                            moreClasses="rounded-tl-md rounded-bl-md"
                                            name='Event' />
                                        <ThComponent name='Date' />
                                        <ThComponent name='Status' />
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks.length === 0 ?
                                        <tr>
                                            <th className='text-[12px] uppercase tracking-wide font-medium text-gray-400 pt-[13rem] text-lg' colSpan={8}>No Data Found!</th>
                                        </tr> :
                                        (tasks.map((val) => {
                                            return (
                                                <>
                                                    {
                                                        age === 'pending' && !val.volunteer_presence ?
                                                            <tr key={val.id}>
                                                                <td className="py-3 px-4 border-b border-b-gray-50">
                                                                    <TdComponent things={val.task?.event_name} />
                                                                </td>
                                                                <td className="py-3 px-4 border-b border-b-gray-50">
                                                                    <TdComponent things={val.task?.date} />
                                                                </td>
                                                                {show === val.id ?
                                                                    change ?
                                                                        <td className='py-3 px-2 rounded border border-yellow-400 bg-yellow-500'>
                                                                            Requested
                                                                        </td>
                                                                        :
                                                                        <td className='py-3 px-2 border-b border-b-gray-50'>
                                                                            {
                                                                                locationView ?
                                                                                    imageSrc ?
                                                                                        <div className='py-3'>
                                                                                            <img src={imageSrc}
                                                                                                className='rounded-[2rem]'
                                                                                                alt='' />
                                                                                            <TdComponent things={
                                                                                                <UploadProofButton
                                                                                                    function={() => getUserPhoto(val.id)}
                                                                                                    name='Upload' />} />
                                                                                        </div>
                                                                                        :
                                                                                        <div className='py-3'>
                                                                                            <Webcam
                                                                                                audio={false}
                                                                                                width={280}
                                                                                                height={280}
                                                                                                screenshotFormat="image/jpeg"
                                                                                                ref={webcamRef}
                                                                                            />
                                                                                            <TdComponent things={
                                                                                                <UploadProofButton
                                                                                                    function={capture}
                                                                                                    name='Capture Photo' />} />
                                                                                        </div>

                                                                                    :
                                                                                    <TdComponent things={
                                                                                        <UploadProofButton
                                                                                            function={handleLocation}
                                                                                            name='Location' />} />
                                                                            }
                                                                            <TdComponent things={
                                                                                <UploadProofButton
                                                                                    function={() => handleUpload(val.id)}
                                                                                    name='Image/Video' />} />
                                                                        </td>
                                                                    :
                                                                    <td className="py-3 px-2 border-b border-b-gray-50">
                                                                        <TdComponent things={<button
                                                                            onClick={() => uploadMain(val.id)}
                                                                            className="font-semibold text-blue-800 border border-gray-300 p-1 rounded-md hover:bg-[#558ccb] hover:text-white">Upload</button>} />
                                                                    </td>
                                                                }
                                                            </tr> : ""
                                                    }
                                                    {
                                                        age === 'uploaded' && val.volunteer_presence ?
                                                            <tr key={val.id}>
                                                                <td className="py-3 px-4 border-b border-b-gray-50">
                                                                    <TdComponent things={val.task?.event_name} />
                                                                </td>
                                                                <td className="py-3 px-4 border-b border-b-gray-50">
                                                                    <TdComponent things={val.task?.date} />
                                                                </td>
                                                                <td className='py-3 border-b border-b-gray-50'>
                                                                    <TdComponent things={<div className="font-semibold border border-green-500 p-1 rounded-md bg-[#34cc40] text-white text-center">Uploaded</div>} />
                                                                </td>
                                                            </tr> : ""
                                                    }
                                                </>
                                            )
                                        }))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div> : <EventsLoader />
    )
}

export default UploadProof;
