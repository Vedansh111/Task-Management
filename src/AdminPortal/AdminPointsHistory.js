import React from 'react'
import TdComponent from '../Helper Components/TdComponent'
import ThComponent from '../Helper Components/ThComponent'
import EventsLoader from '../Helper Components/EventsLoader'

function AdminPointsHistory(props) {
    const tasks = [1, 2, 3, 4, 5]
    return (
        tasks ? (
            <div className="w-[85%] rounded-md sm:rounded-lg mt-10 border shadow-lg">
                <div className='h-[70vh] overflow-scroll'>
                    <table className="bg-[#ecf1e8] w-full h-full text-gray-900 text-center ">
                        <thead className=" text-gray-700 uppercase bg-[#c6cac3]">
                            <tr>
                                <ThComponent name='User' />
                                <ThComponent name='Total Points' />
                                <ThComponent name='Total Redeemed' />
                            </tr>
                        </thead>
                        <tbody className=''>
                            {tasks.map((val) => {
                                return (
                                    <tr key={val.id}>
                                        <TdComponent things={val.user} />
                                        <TdComponent things={val.points} />
                                        <TdComponent things={val.redeemed} />
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        ) : <EventsLoader />
    )
}

export default AdminPointsHistory