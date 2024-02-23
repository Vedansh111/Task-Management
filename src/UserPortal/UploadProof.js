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
    const [position, setPosition] = useState({ latitude: null, longitude: null });
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
                    showCloseButton: true,
                    title: "Your uploaded picture",
                    imageUrl: e.target.result,
                    imageAlt: "The uploaded picture"
                });
            };
            reader.readAsDataURL(file);
        }
    }

    const handleLocation = async (val) => {
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        };

        function success(pos) {
            const crd = pos.coords;

            console.log("Your current position is:");
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);
        }

        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }

        // Get user's location
        navigator.geolocation.getCurrentPosition(success, error, options);

        // Create a button for capturing the photo
        const captureButton = document.createElement('button');
        captureButton.textContent = 'Capture Photo';
        captureButton.style.position = 'fixed';
        captureButton.style.top = '50%';
        captureButton.style.left = '50%';
        captureButton.style.transform = 'translate(-50%, -50%)';
        document.body.appendChild(captureButton);

        // Open camera and take a photo when the button is clicked
        captureButton.addEventListener('click', async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                const video = document.createElement('video');
                document.body.appendChild(video);
                video.srcObject = stream;
                await video.play();

                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
                const photo = canvas.toDataURL('image/jpeg');

                // Close the camera stream
                stream.getTracks().forEach(track => track.stop());
                video.remove();
                canvas.remove();
                captureButton.remove();

                // Proceed with the photo upload
                const { value: file } = await Swal.fire({
                    title: "Your photo",
                    imageUrl: photo,
                    imageAlt: "Your photo",
                    showCancelButton: true,
                });

                if (file) {
                    formData.append("volunteer_presence[participate_volunteer_id]", val);
                    formData.append("volunteer_presence[request_type]", "geo_location");
                    formData.append("volunteer_presence[location]", position.latitude, position.longitude);
                    formData.append("volunteer_presence[upload_proof]", file);
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
                        imageUrl: photo,
                        imageAlt: "The uploaded picture"
                    });
                }
            } catch (err) {
                console.error('Error accessing camera:', err);
                // Handle error accessing camera
            }
        });
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
                            }))
                        }
                    </tbody>
                </table>
            </div>
        </div> : <EventsLoader />
    )
}

export default UploadProof