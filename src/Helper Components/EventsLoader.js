import React from 'react'
import ThComponent from './ThComponent';
import TdComponent from './TdComponent';

function EventsLoader() {
    const tasks = [1, 2, 3, 4, 5, 6];
    return (
        <div className='animate-pulse p-6'>
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-6">
                <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md h-[82vh]">
                    <div className="flex justify-between mb-4 items-start">
                        <div className="font-medium bg-gray-200 text-white w-[6rem] h-[2rem]">
                        </div>
                    </div>
                    <div className=" h-[95%]">
                        <table className="w-full min-w-[460px] z-0">
                            <thead>
                                <tr>
                                    <th className={`text-[12px] uppercase tracking-wide text-transparent font-medium text-gray-100 py-3 px-4 bg-gray-100 text-left`}>
                                        a
                                    </th>
                                    <th className={`text-[12px] uppercase tracking-wide text-transparent font-medium text-gray-100 py-3 px-4 bg-gray-100 text-left`}>
                                        a
                                    </th>
                                    <th className={`text-[12px] uppercase tracking-wide font-medium text-transparent text-gray-100 py-3 px-4 bg-gray-100 text-left`}>
                                        a
                                    </th>
                                    <th className={`text-[12px] uppercase tracking-wide font-medium text-gray-100 text-transparent py-3 px-4 bg-gray-100 text-left`}>
                                        a
                                    </th>
                                    <th className={`text-[12px] uppercase tracking-wide font-medium text-transparent text-gray-100 py-3 px-4 bg-gray-100 text-left`}>
                                        a
                                    </th>
                                    <th className={`text-[12px] uppercase tracking-wide font-medium text-transparent text-gray-100 py-3 px-4 bg-gray-100 text-left`}>
                                        a
                                    </th>
                                    <th className={`text-[12px] uppercase tracking-wide font-medium text-gray-100 text-transparent py-3 px-4 bg-gray-100 text-left`}>
                                        a
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    tasks.map((val) => {
                                        return (
                                            <tr key={val} >
                                                <td className="py-3 px-4 border-b border-b-gray-50">
                                                    <TdComponent />
                                                </td>
                                                <td className="py-3 px-4 border-b border-b-gray-50">
                                                    <TdComponent />
                                                </td>
                                                <td className="py-3 px-4 border-b border-b-gray-50">
                                                    <TdComponent />
                                                </td>
                                                <td className="py-3 px-4 border-b border-b-gray-50">
                                                    <TdComponent />
                                                </td>
                                                <td className="py-3 px-4 border-b border-b-gray-50">
                                                    <TdComponent />
                                                </td>
                                                <td className="py-3 px-4 border-b border-b-gray-50">
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventsLoader