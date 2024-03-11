import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import TdComponent from '../Helper Components/TdComponent';
import ThComponent from '../Helper Components/ThComponent';
import EventsLoader from '../Helper Components/EventsLoader';
import UploadProofButton from '../Helper Components/UploadProofButton';
import Swal from 'sweetalert2';
import Webcam from "react-webcam";
// import DropDown from '../Helper Components/DropDown';

function EventQr() {
    const [tasks, setTasks] = useState([]);
    const [position, setPosition] = useState({
        latitude: null,
        longitude: null,
    });
    const [qr, setQr] = useState(false);
    const webcamRef = React.useRef(null);
    const [locationView, setLocationView] = useState(0);
    const [imageSrc, setImageSrc] = useState();
    const [imageFile, setImageFile] = useState();
    const [show, setShow] = useState();
    const [change, setChange] = useState();
    const formData = new FormData();

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

    const viewPoster = (val) => {
        console.log(val);
        tasks.filter((value) => {
            if (value.id === val) {
                Swal.fire({
                    title: "Event Poster",
                    imageWidth: '95%',
                    imageHeight: 'auto',
                    imageUrl: value.event_poster_url,
                    imageAlt: "The event poster"
                });
            }
        })
    }

    const handleQR = (val) => {
        console.log(val);
        axios.post(`api/v1/participate_volunteers/${val}/generate_qr`).then((res) => {
            console.log(res);
            if (res.status) {
                Swal.fire({
                    title: "Generated!",
                    text: "Your QR code is gererated.",
                    icon: "success"
                });
                axios.get('api/v1/participate_volunteers?request_type=approved').then((res) => {
                    console.log(res?.data?.participate_volunteer);
                    res?.data?.participate_volunteer.filter((value) => {
                        console.log(value);
                        if (val === value.id) {
                            console.log(value.qr_code_url);
                            setQr(value.qr_code_url);
                        }
                    })
                })
            }
        }).catch((err) => {
            console.log(err, 'post');
        })
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

    return (
        tasks ?
            <div className='p-6'>
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-6">
                    <div className='bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md h-[82vh]'>
                        {/* <div className="flex justify-between mb-4 items-start">
                            <DropDown handleChange={handleChange} items={items} />
                        </div> */}
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
                                                <tr key={val.id}>
                                                    <td className="py-3 px-4 border-b border-b-gray-50">
                                                        <TdComponent things={val.task?.event_name} />
                                                    </td>
                                                    <td className="py-3 px-4 border-b border-b-gray-50">
                                                        <TdComponent things={val.task?.date} />
                                                    </td>
                                                    <td className="py-3 px-4 border-b border-b-gray-50">
                                                        <TdComponent things={<button
                                                            onClick={() => viewPoster(val.id)}
                                                            className="font-semibold text-blue-800 border border-gray-300 p-1 rounded-md hover:bg-[#558ccb] hover:text-white">View</button>} />
                                                    </td>
                                                </tr>
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

export default EventQr