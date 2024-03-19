import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TdComponent from '../Helper Components/TdComponent';
import ThComponent from '../Helper Components/ThComponent';
import EventsLoader from '../Helper Components/EventsLoader';
import Swal from 'sweetalert2';
// import DropDown from '../Helper Components/DropDown';

function EventQr() {
    const [tasks, setTasks] = useState([]);
    // const [position, setPosition] = useState({
    //     latitude: null,
    //     longitude: null,
    // });

    const viewPoster = (val) => {
        axios.post(`api/v1/participate_volunteers/${val}/generate_qr`).then((res) => {
            console.log(res);
            if (res.status) {
                axios.get('api/v1/participate_volunteers?request_type=approved').then((res) => {
                    console.log(res?.data?.participate_volunteer);
                    res?.data?.participate_volunteer.filter((value) => {
                        if (val === value.id) {
                            Swal.fire({
                                title: "QR Code",
                                imageWidth: '200px',
                                imageHeight: '200px',
                                imageUrl: value.qr_code_url,
                                imageAlt: "The Qr code"
                            });
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

        // if ("geolocation" in navigator) {
        //     navigator.geolocation.getCurrentPosition(function (position) {
        //         console.log(position);
        //         setPosition({
        //             latitude: position.coords.latitude,
        //             longitude: position.coords.longitude,
        //         });
        //     });
        // } else {
        //     console.log("Geolocation is not available in your browser.");
        // }
    }, [])

    return (
        tasks ?
            <div className='p-6'>
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-6">
                    <div className='bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md h-[82vh]'>
                        {/* <div className="flex justify-between mb-4 items-start">
                            <DropDown handleChange={handleChange} items={items} />
                        </div> */}
                        <div className="animate-fade-left animate-delay-100 animate-once animate-ease-out overflow-auto lg:h-[90%] md:h-full px-1">
                            <table className="w-full min-w-[460px] z-0">
                                <thead className='uppercase'>
                                    <tr>
                                        <ThComponent
                                            moreClasses="rounded-tl-md rounded-bl-md"
                                            name='Event' />
                                        <ThComponent name='Date' />
                                        <ThComponent name='Location' />
                                        <ThComponent name='Points' />
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
                                                        <TdComponent things={val.task?.event_location} />
                                                    </td>
                                                    <td className="py-3 px-4 border-b border-b-gray-50">
                                                        <TdComponent things={val.task?.points} />
                                                    </td>
                                                    <td className="py-3 px-4 border-b border-b-gray-50">
                                                        <TdComponent things={<button
                                                            onClick={() => viewPoster(val.id)}
                                                            className="font-semibold text-blue-800 border border-gray-300 p-1 rounded-md hover:bg-[#558ccb] hover:text-white">Generate QR</button>} />
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