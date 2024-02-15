import React from 'react'
import TdComponent from '../Helper Components/TdComponent'
import ThComponent from '../Helper Components/ThComponent'
import FilterDropDown from '../Helper Components/FilterDropDown'

function AdminRequests() {
    const tasks = [1, 2, 3, 4, 5]
    return (
        <div className=" rounded-md sm:rounded-lg border shadow-lg mt-10">
            <FilterDropDown items={[
                {
                    name: 'Pending',
                    no: 10,
                },
                {
                    name: 'Approved',
                    no: 20,
                },
                {
                    name: 'Rejected',
                    no: 30,
                },
            ]} />
            <div className=' overflow-scroll'>
                <table className="bg-[#ecf1e8] text-gray-900  text-center ">
                    <thead className=" text-gray-700 uppercase bg-[#c6cac3]">
                        <tr>
                            <ThComponent name='Event' />
                            <ThComponent name='User' />
                            <ThComponent name='Email' />
                            <ThComponent name='Phone Number' />
                            <th scope="col" className="text-lg px-4 py-3"></th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {tasks.map((val) => {
                            return (
                                <tr key={val.id}>
                                    <TdComponent things={val.event_name} />
                                    <TdComponent things={val.user} />
                                    <TdComponent things={val.email} />
                                    <TdComponent things={val.phone} />
                                    <TdComponent things={<button className="font-semibold text-gray-600 border border-black p-1 rounded-md hover:bg-[#34cc40] hover:text-white">Approve</button>} />
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminRequests