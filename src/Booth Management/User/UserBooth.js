import React, { useEffect, useState } from 'react';
import EventsLoader from '../../Helper Components/EventsLoader';
import TdComponent from '../../Helper Components/TdComponent';
import ThComponent from '../../Helper Components/ThComponent';
import UploadProofButton from '../../Helper Components/UploadProofButton';
import axios from 'axios';
import { Link, useOutletContext } from 'react-router-dom';
import Swal from 'sweetalert2';

function UserBooth() {
    const [tasks, setTasks] = useState(0);
    const userInfo = useOutletContext();

    const handleShow = () => {
        axios.get('api/v1/booths').then((res) => {
            setTasks(res.data.booths.filter((val) => {
                return val.user_id === userInfo[0].id
            }));
        })
    };

    const viewPoster = (val) => {
        Swal.fire({
            title: "QR Code",
            imageWidth: '200px',
            imageHeight: '200px',
            imageUrl: val,
            imageAlt: "The Qr code"
        });
    }

    useEffect(() => {
        handleShow();
    }, [])

    return (
        tasks ? (
            <div className='p-6'>
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-6">
                    <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md h-[82vh]">
                        <div className="flex justify-between mb-4 items-start">
                            {/* <DropDown handleChange={handleChange} items={items} /> */}
                        </div>
                        <div className="animate-fade-left animate-delay-100 animate-once animate-ease-out overflow-auto h-[90%] px-1">
                            <table className="w-full min-w-[460px] z-0 ">
                                <thead className='uppercase'>
                                    <tr>
                                        <ThComponent
                                            name='Booth No.' />
                                        <ThComponent
                                            moreClasses="rounded-tl-md rounded-bl-md"
                                            name='Booth Name' />
                                        <ThComponent
                                            name='Location' />
                                        <ThComponent
                                            name='QR Code' />
                                        <ThComponent />
                                        <ThComponent />
                                        <ThComponent />
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks.length === 0 ?
                                        <tr>
                                            <th className='text-[12px] uppercase tracking-wide font-medium text-gray-400 pt-[13rem] text-lg' colSpan={8}>No Data Found!</th>
                                        </tr> :
                                        (
                                            tasks.map((val) => {
                                                return (
                                                    <tr key={val.id} >
                                                        <td className="py-3 px-4 border-b border-b-gray-50">
                                                            <TdComponent things={val?.booth_number} />
                                                        </td>
                                                        <td className="py-3 px-4 border-b border-b-gray-50">
                                                            <TdComponent things={val?.booth_name} />
                                                        </td>
                                                        <td className="py-3 px-4 border-b border-b-gray-50">
                                                            <Link target="_blank"
                                                                to={`https://www.google.com/maps?q=${val.booth_lat}, ${val.booth_lon}`}
                                                                className='text-gray-600 text-sm font-medium ml-1 truncate underline'>
                                                                View
                                                            </Link>
                                                        </td>
                                                        <td className="py-3 px-4 border-b border-b-gray-50">
                                                            <TdComponent things={<button
                                                                onClick={() => viewPoster(val.qr_code)}
                                                                className="font-semibold text-blue-800 border border-gray-300 p-1 rounded-md hover:bg-[#558ccb] hover:text-white">View QR</button>} />
                                                        </td>
                                                        <td className="py-3 px-4 border-b border-b-gray-50">
                                                            <TdComponent things={
                                                                <UploadProofButton
                                                                    name='Upload Image' />} />
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

export default UserBooth