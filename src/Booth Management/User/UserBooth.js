import React from 'react';
import EventsLoader from '../../Helper Components/EventsLoader';
import TdComponent from '../../Helper Components/TdComponent';
import ThComponent from '../../Helper Components/ThComponent';
import UploadProofButton from '../../Helper Components/UploadProofButton';

function UserBooth() {
    const tasks = [1, 2, 3];

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
                                            moreClasses="rounded-tl-md rounded-bl-md"
                                            name='Booth Name' />
                                        <ThComponent
                                            name='Date' />
                                        <ThComponent
                                            moreClasses="rounded-tr-md rounded-br-md"
                                            name='Time' />
                                        <ThComponent
                                            name='Location' />
                                        <ThComponent
                                            name='Booth No.' />
                                        <ThComponent
                                            name='QR Code' />
                                        <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-3 px-2 bg-gray-100 text-left "></th>
                                        {/* {age === "pending" ?
                                        <>
                                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-3 px-2 bg-gray-100 text-left "></th>
                                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-3 px-2 bg-gray-100 text-left "></th>
                                        </> : ''}

                                    {age === "approved" ?
                                        <>
                                            <ThComponent name='Status' />
                                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-3 px-2 bg-gray-100 text-left "></th>
                                        </> : ''} */}
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
                                                            <TdComponent things={val?.participate_volunteer?.task?.event_name} />
                                                        </td>
                                                        <td className="py-3 px-4 border-b border-b-gray-50">
                                                            <TdComponent things={val?.participate_volunteer?.user?.name} />
                                                        </td>
                                                        <td className="py-3 px-4 border-b border-b-gray-50">
                                                            <TdComponent things={val?.participate_volunteer?.user?.email} />
                                                        </td>
                                                        <td className="py-3 px-4 border-b border-b-gray-50">
                                                            <TdComponent things={val?.participate_volunteer?.user?.email} />
                                                        </td>
                                                        <td className="py-3 px-4 border-b border-b-gray-50">
                                                            <TdComponent things={val?.participate_volunteer?.user?.email} />
                                                        </td>
                                                        <td className="py-3 px-4 border-b border-b-gray-50">
                                                            <TdComponent things={val?.participate_volunteer?.user?.email} />
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